import { useEffect, useRef, useCallback, RefObject } from 'react';
import { Geolocation, Position } from '@capacitor/geolocation';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import Polyline from 'ol/format/Polyline';
import { fromLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import { Geometry, LineString, MultiPoint, Point } from 'ol/geom';
import styled from 'styled-components';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Feature from 'ol/Feature';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import Stroke from 'ol/style/Stroke';

import UserLocationIcon from '../../../assets/images/UI/userLocationIcon.png';
import NextPointLocationIcon from '../../../assets/images/UI/nextPointIcon.png';
import {
	CoordAndFeature,
	IRandomGenerationResults,
	IRouteGeometry,
	IRouteItem,
} from '../../../utils/MapUtils.d';
import { getNearestFromApi, getRouteFromApi } from '../../../utils/MapUtils';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
	centerViewFunction,
	generatedPointAndRoute as generatedRouteState,
	layoutDisplayMode,
	userLocationState,
} from '../../../utils/State';

const MapWrapperDiv = styled.div`
	position: absolute;
	z-index: -1;
	width: 100%;
	height: 100%;
	top: 0;
	bottom: 0;
`;

const userMapPin = new Style({
	image: new Icon({
		anchor: [0.5, 68],
		anchorXUnits: 'fraction',
		anchorYUnits: 'pixels',
		src: UserLocationIcon,
	}),
});

const nextLocationMapPin = new Style({
	image: new Icon({
		anchor: [0.5, 68],
		anchorXUnits: 'fraction',
		anchorYUnits: 'pixels',
		src: NextPointLocationIcon,
	}),
});

const routeStyle = new Style({
	stroke: new Stroke({
		width: 5,
	}),
});

const MapWrapper: React.FC = () => {
	const [userLocation, setUserLocation] = useRecoilState<Coordinate>(userLocationState);
	const generatedPointAndRoute =
		useRecoilValue<IRandomGenerationResults | undefined>(generatedRouteState);
	const setCenterViewFunction = useSetRecoilState(centerViewFunction);
	const [layoutDisplayModeState, setLayoutDisplayMode] = useRecoilState(layoutDisplayMode);
	const mapElement: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
	const mapRef = useRef<Map | null>();
	const featuresLayerSourceRef = useRef<VectorSource<Geometry>>();
	const userLocationRef = useRef<CoordAndFeature | null>();
	const nextPointLocationRef = useRef<CoordAndFeature | null>();
	const routeFeatureRef = useRef<Feature | null>();

	const drawRoute = (foundRoute: IRouteGeometry) => {
		/*
			Draw a route on the map after a route has been found by the API

			@param foundRoute - Route that has been found, already in EPSG:3857
		*/
		const routePolyline = new Polyline({ factor: 1e5 }).readGeometry(foundRoute, {
			dataProjection: 'EPSG:4326',
			featureProjection: 'EPSG:3857',
		});
		const routeFeature = new Feature({ type: 'route', geometry: routePolyline });
		routeFeature.setStyle(routeStyle);
		featuresLayerSourceRef.current?.addFeature(routeFeature);
		routeFeatureRef.current = routeFeature;
	};

	const clearPreviousRoute = () => {
		/* Remove the previous route from the map if it exists */
		if (routeFeatureRef.current)
			featuresLayerSourceRef.current?.removeFeature(routeFeatureRef.current);
	};

	const updateLocationRef = useCallback(
		(
			coordinates: Coordinate | undefined,
			ref: React.MutableRefObject<CoordAndFeature | null | undefined>,
			pinStyle: Style
		) => {
			/*
		Update an existing location ref, and create a new one if one doesn't already exist.

		@param coordinates - Updated coordinate to be used.
		@param ref - Reference to the location.
		@param pinStyle - The correct style (image) to use for the pin (if a new pin is created). 
		*/
			if (!mapRef.current || !coordinates) return;
			if (!ref.current) {
				const feature = new Feature({
					geometry: new Point(coordinates),
				});
				feature.setStyle(pinStyle);
				featuresLayerSourceRef.current?.addFeature(feature);
				ref.current = { feature: feature, coordinates: coordinates };
			} else {
				ref.current.coordinates = coordinates;
				ref.current.feature.setGeometry(new Point(coordinates));
			}
		},
		[featuresLayerSourceRef]
	);

	const fitMapViewToPoints = (point1: Coordinate, point2: Coordinate) => {
		/**
		 * Fit the view to the two points (randomly generated or selected).
		 *
		 * @param point1 - First point
		 * @param point2 - Second point
		 */
		console.log(new MultiPoint([point1, point2]))
		console.log(mapRef.current?.getSize())
		mapRef.current?.getView().fit(new MultiPoint([point1, point2]), {
			size: mapRef.current?.getSize() || [window.outerWidth, window.outerHeight],
			padding: [200, 40, 200, 40],
			duration: 500
		});
	};

	useEffect(() => {
		const displayGeneratedRouteAndPoint = () => {
			/**
			 * Update the map to show the randomly-generated route and point from state.
			 */
			if (generatedPointAndRoute) {
				clearPreviousRoute();
				drawRoute(generatedPointAndRoute.route!.geometry);
				updateLocationRef(
					generatedPointAndRoute.point.coordinates,
					nextPointLocationRef,
					nextLocationMapPin
				);
				fitMapViewToPoints(userLocation, generatedPointAndRoute.point.coordinates);
			}
		};
		displayGeneratedRouteAndPoint();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [generatedPointAndRoute, updateLocationRef]);

	useEffect(() => {
		/*
			Re-center the map according to the location of the user whenever it changes.
		*/
		mapRef.current?.getView().setCenter(userLocation);
		updateLocationRef(userLocation, userLocationRef, userMapPin);
	}, [featuresLayerSourceRef, updateLocationRef, userLocation]);

	Geolocation.watchPosition({ enableHighAccuracy: false }, (newLocation: Position | null) => {
		if (newLocation) {
			setTimeout(() => setUserLocation(
				fromLonLat([newLocation.coords.longitude, newLocation.coords.latitude])
			), 1000);
		}
	});

	const handleMapClick = useCallback(
		(event: MapBrowserEvent<UIEvent>) => {
			/*
			Handle the user clicking on the map (placing a destination icon).

			@param event - Browser click event.
			*/
			if (!mapRef.current) return;
			getNearestFromApi(event.coordinate).then((nearestPoint: Coordinate) => {
				updateLocationRef(nearestPoint, nextPointLocationRef, nextLocationMapPin);
				getRouteFromApi(userLocationRef.current!.coordinates, nearestPoint).then(
					(foundRoute: IRouteItem) => {
						clearPreviousRoute();
						drawRoute(foundRoute.geometry);
						fitMapViewToPoints(
							userLocationRef.current?.coordinates,
							nextPointLocationRef.current?.coordinates
						);
						setLayoutDisplayMode('default');
					}
				);
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[updateLocationRef]
	);

	const centerViewOnCurrentLocation = useCallback(() => {
		/**
		 * Set the view to center on the user location.
		 */
		mapRef.current?.getView().fit(new Point(userLocation), {
			duration: 500,
		});
	}, [userLocation]);

	useEffect(() => {
		if (mapElement.current && !mapRef.current) {
			const featureLayersSource = new VectorSource();
			const initalFeaturesLayer = new VectorLayer({
				source: featureLayersSource,
			});
			initalFeaturesLayer.set('name', 'features');
			mapRef.current = new Map({
				target: mapElement.current,
				layers: [
					new TileLayer({
						source: new XYZ({
							url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
						}),
					}),
					initalFeaturesLayer,
				],
				view: new View({
					center: [0, 0],
					zoom: 18,
				}),
			});
			featuresLayerSourceRef.current = featureLayersSource;
			setCenterViewFunction(() => centerViewOnCurrentLocation());
		}
	}, [centerViewOnCurrentLocation, setCenterViewFunction]);

	useEffect(() => {
		const setMapOnClick = () => {
			/**
			 * Set the ability of the user to pick a point on the map, according to the state of the layout.
			 */
			if (layoutDisplayModeState === 'select') {
				mapRef.current?.on('click', handleMapClick);
			} else mapRef.current?.un('click', handleMapClick);
		};
		setMapOnClick();
	}, [handleMapClick, layoutDisplayModeState]);

	return (
		<>
			<MapWrapperDiv ref={mapElement} className="map-container"></MapWrapperDiv>
		</>
	);
};

export default MapWrapper;
