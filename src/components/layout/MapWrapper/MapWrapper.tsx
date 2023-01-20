import { useState, useEffect, useRef, LegacyRef } from 'react';
import { Geolocation, Position } from '@capacitor/geolocation';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { transform } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import { Geometry } from 'ol/geom';
import styled from 'styled-components';

const MapWrapperDiv = styled.div`
	position: absolute;
	z-index: -1;
	width: 100%;
	height: 100%;
	top: 0;
	bottom: 0;
`;

const MapWrapper = () => {
	const [featuresLayer, setFeaturesLayer] = useState<VectorLayer<VectorSource<Geometry>>>();
	const [selectedCoord, setSelectedCoord] = useState<Coordinate>();
	const [userLocation, setUserLocation] = useState<Coordinate>();

	const mapElement: LegacyRef<HTMLDivElement> = useRef<HTMLDivElement>(null);
	const mapRef = useRef<Map | null>();

	useEffect(() => {
		mapRef.current?.getView().animate({ zoom: 18 }, { center: userLocation }, { duration: 1000 });
		console.log('NEW POS', mapRef.current?.getView().getCenter());
	}, [userLocation]);

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

	useEffect(() => {
		if (mapElement.current && !mapRef.current) {
			const initalFeaturesLayer = new VectorLayer({
				source: new VectorSource(),
			});

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
			setFeaturesLayer(initalFeaturesLayer);
		}
	}, []);



	const handleMapClick = (event: { pixel: any }) => {
		if (mapRef.current) {
			const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);
			const transformedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326');
			setSelectedCoord(transformedCoord);
			console.log(transformedCoord);
		}
	};

	return <MapWrapperDiv ref={mapElement} className="map-container"></MapWrapperDiv>;
};

export default MapWrapper;
