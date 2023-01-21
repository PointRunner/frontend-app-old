import { useState, useEffect, useRef, LegacyRef, useCallback } from 'react';
import { Geolocation, Position } from '@capacitor/geolocation';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON';
import Polyline from 'ol/format/Polyline';
import { transform } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import { Geometry, Point } from 'ol/geom';
import styled from 'styled-components';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

import UserLocationIcon from '../../../assets/images/UI/userLocationIcon.png';
import NextPointLocationIcon from '../../../assets/images/UI/nextPointIcon.png';
import Feature from 'ol/Feature';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import Stroke from 'ol/style/Stroke';

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

interface INearestResponse {
	code: string;
	waypoints?: {
		hint?: string;
		distance: number;
		name?: string;
		location?: number[];
	}[];
}

interface IRouteResponse {
	code: string;
	routes?: {
		distance: number;
		duration: number;
		geometry: {
			type: 'string';
			coordinates: Coordinate[];
		};
	}[];
}

interface IRouteGeometry {
	type: string;
	coordinates: Coordinate[];
}

interface CoordAndFeature {
	coordinates: Coordinate;
	feature: Feature;
}

const MapWrapper: React.FC = () => {
	const [userLocation, setUserLocation] = useState<Coordinate>();

	const mapElement: LegacyRef<HTMLDivElement> = useRef<HTMLDivElement>(null);
	const mapRef = useRef<Map | null>();
	const featuresLayerSourceRef = useRef<VectorSource<Geometry>>();
	const userLocationRef = useRef<CoordAndFeature | null>();
	const nextPointLocationRef = useRef<CoordAndFeature | null>();
	const routeFeatureRef = useRef<Feature | null>();

	const getNearestFromApi = (coords: Coordinate): Promise<Coordinate> => {
		/*
			Get the nearest point on a street network for a given coordinate.

			@param coords - Initial coordinate

			@returns Promise<Coordinate> - Nearest coordinate on a street.
		*/
		return new Promise((resolve, reject) => {
			const longLat = transform(coords, 'EPSG:3857', 'EPSG:4326');
			fetch(`http://router.project-osrm.org/nearest/v1/walking/${longLat.join()}`)
				.then((resp: Response) => {
					return resp.json();
				})
				.then((data: INearestResponse) => {
					if (data.code !== 'Ok') reject();
					else {
						const transformedResponseCoords = transform(
							data.waypoints![0].location!,
							'EPSG:4326',
							'EPSG:3857'
						);
						resolve(transformedResponseCoords);
					}
				})
				.catch(() => reject());
		});
	};

	const getRouteFromApi = (start: Coordinate, end: Coordinate): Promise<IRouteGeometry> => {
		/*
			Get an optimal route from the OSRM API.
			@param start - Start EPSG:3857 coordinate.
			@param end - End EPSG:3857 coordinate.

			@returns Promise<IRouteGeometry> - Polyline-ready object with the correct route.
		*/
		const points = [
			transform(start, 'EPSG:3857', 'EPSG:4326'),
			transform(end, 'EPSG:3857', 'EPSG:4326'),
		];
		return new Promise((resolve, reject) => {
			fetch(`http://router.project-osrm.org/route/v1/walking/${points.join(';')}`)
				.then((resp: Response) => {
					return resp.json();
				})
				.then((data: IRouteResponse) => {
					console.log(data)
					if (data.code !== 'Ok') reject();
					else {
						
						resolve(data.routes![0].geometry);
					}
				})
				.catch(() => reject());
		});
	};

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
	}

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

	useEffect(() => {
		/*
			Re-center the map according to the location of the user whenever it changes.
		*/
		mapRef.current?.getView().setCenter(userLocation);
		updateLocationRef(userLocation, userLocationRef, userMapPin);
	}, [featuresLayerSourceRef, updateLocationRef, userLocation]);

	Geolocation.watchPosition({ enableHighAccuracy: true }, (newLocation: Position | null) => {
		if (newLocation) {
			const transformedPosition = transform(
				[newLocation.coords.longitude, newLocation.coords.latitude],
				'EPSG:4326',
				'EPSG:3857'
			);
			setUserLocation(transformedPosition);
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
				getRouteFromApi(userLocationRef.current!.coordinates, nearestPoint).then((foundRoute: IRouteGeometry) => {
					clearPreviousRoute();
					drawRoute(foundRoute)
				}
				);
			});
		},
		[updateLocationRef]
	);

	useEffect(() => {
		if (mapElement.current && !mapRef.current) {
			const featureLayersSource = new VectorSource({
				format: new GeoJSON({
					dataProjection: 'EPSG:3857',
				}),
			});
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
					projection: 'EPSG:3857',
					center: [0, 0],
					zoom: 18,
				}),
				controls: [],
			});
			mapRef.current.on('click', handleMapClick);
			featuresLayerSourceRef.current = featureLayersSource;
		}
	}, [handleMapClick]);

	return <MapWrapperDiv ref={mapElement} className="map-container"></MapWrapperDiv>;
};

export default MapWrapper;
