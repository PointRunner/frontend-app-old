import { useState, useEffect, useRef, LegacyRef, useCallback } from 'react';
import { Geolocation, Position } from '@capacitor/geolocation';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import {Draw} from 'ol/interaction'
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON'
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

const MapWrapper: React.FC = () => {
	const [userLocation, setUserLocation] = useState<Coordinate>();

	const mapElement: LegacyRef<HTMLDivElement> = useRef<HTMLDivElement>(null);
	const mapRef = useRef<Map | null>();
	const featuresLayerSourceRef = useRef<VectorSource<Geometry>>();
	const userLocationRef = useRef<Feature | null>();
	const nextPointLocationRef = useRef<Feature | null>();

	const updateMapIcon = useCallback(
		(
			coordinates: Coordinate | undefined,
			ref: React.MutableRefObject<Feature<Geometry> | null | undefined>,
			pinStyle: Style
		) => {
			/*
		Update an existing icon on the map, and create a new one if one doesn't already exist.

		@param coordinates - Updated coordinate to be used.
		@param ref - Reference to the location on the map.
		@param pinStyle - The correct style (image) to use for the pin (if a new pin is created). 
		*/
			if (!mapRef.current || !coordinates) return;
			if (!ref.current) {
				ref.current = new Feature({
					geometry: new Point(coordinates),
				});
				ref.current.setStyle(pinStyle);
				featuresLayerSourceRef.current?.addFeature(ref.current);
			} else {
				ref.current.setGeometry(new Point(coordinates));
			}
			console.log("Features: ", featuresLayerSourceRef.current?.getFeatures());
		},
		[featuresLayerSourceRef]
	);

	useEffect(() => {
		/*
			Re-center the map according to the location of the user whenever it changes.
		*/
		mapRef.current?.getView().setCenter(userLocation);
		updateMapIcon(userLocation, userLocationRef, userMapPin);
	}, [featuresLayerSourceRef, updateMapIcon, userLocation]);

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
			updateMapIcon(event.coordinate, nextPointLocationRef, nextLocationMapPin);
		},
		[updateMapIcon]
	);

	useEffect(() => {
		if (mapElement.current && !mapRef.current) {
			const featureLayersSource = new VectorSource({
				format: new GeoJSON({
					dataProjection: 'EPSG:3857'
				})
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
