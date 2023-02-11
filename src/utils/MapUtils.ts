import { Coordinate } from 'ol/coordinate';
import transformTranslate from '@turf/transform-translate';
import { point } from '@turf/helpers';
import { fromLonLat, toLonLat } from 'ol/proj';
import { INearestResponse, IRouteResponse, IRouteItem, CoordAndFeature } from './MapUtils.d';
import { GeoJSONPoint } from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';

export const getRouteFromApi = (start: Coordinate, end: Coordinate): Promise<IRouteItem> => {
	/*
        Get an optimal route from the OSRM API.
        @param start - Start EPSG:3857 coordinate.
        @param end - End EPSG:3857 coordinate.

        @returns Promise<IRouteItem> - Found route from the API.
    */
	return new Promise((resolve, reject) => {
		const points = [toLonLat(start), toLonLat(end)];
		fetch(`http://router.project-osrm.org/route/v1/foot/${points.join(';')}`)
			.then((resp: Response) => {
				console.log(resp);
				return resp.json();
			})
			.then((data: IRouteResponse) => {
				console.log(data);
				if (data.code !== 'Ok') reject(data.code);
				else {
					resolve(data.routes![0]);
				}
			})
			.catch(() => reject('Unknown error'));
	});
};

export const getNearestFromApi = (coords: Coordinate): Promise<Coordinate> => {
	/*
        Get the nearest point on a street network for a given coordinate.

        @param coords - Initial coordinate

        @returns Promise<Coordinate> - Nearest coordinate on a street.
    */
	return new Promise((resolve, reject) => {
		const longLat = toLonLat(coords);
		fetch(`http://router.project-osrm.org/nearest/v1/foot/${longLat.join()}`)
			.then((resp: Response) => {
				return resp.json();
			})
			.then((data: INearestResponse) => {
				if (data.code !== 'Ok') reject();
				else {
					const transformedResponseCoords = fromLonLat(data.waypoints![0].location!);
					resolve(transformedResponseCoords);
				}
			})
			.catch(() => reject());
	});
};

const generateRandomPoint = (
	currentLocation: GeoJSONPoint,
	minDistance: number,
	maxDistance: number,
	minHeading: number,
	maxHeading: number
) => {
	/*
    Generate a new random point based on parameters.
    @param currentLocation - Current user location.
    @param minDistance - Minimum distance from current user location.
    @param maxDistance - Maximum distance from current user location.
    @param minHeading - Minimum heading in degress (0-359).
    @param maxHeading - Maximum heading in degress (0-359).

    @returns GeoJSONPoint - found point
    */
	const currentLocationPoint = point(currentLocation.coordinates);
	const distance = randomFloat(minDistance, maxDistance);
	const heading = randomFloat(minHeading, maxHeading);
	return transformTranslate(currentLocationPoint, distance, heading, {
		units: 'kilometers',
	});
};

export const generatePointToRun = async (
	currentLocation: Coordinate,
	minDistance: number,
	maxDistance: number,
	minHeading: number,
	maxHeading: number
): Promise<CoordAndFeature> => {
	/*
        Handle user asking for a random point - generate points until a valid one is found.

        @param currentLocation - Current user location (EPSG:3857).
        @param minDistance - Minimum distance from current user location.
        @param maxDistance - Maximum distance from current user location.
        @param minHeading - Minimum heading in degress (0-359).
        @param maxHeading - Maximum heading in degress (0-359).

        @returns CoordAndFeature - found point feature (EPSG:3857).

    */
	const userLocationGeoJson: { type: 'Point'; coordinates: number[] } = {
		type: 'Point',
		coordinates: toLonLat(currentLocation),
	};
	let isRouteFound = false;
	let generatedPoint = undefined;
	do {
		console.log('Generating a point');
		generatedPoint = generateRandomPoint(
			userLocationGeoJson,
			minDistance,
			maxDistance,
			minHeading,
			maxHeading
		);
		try {console.log(await getRouteFromApi(currentLocation, generatedPoint.geometry.coordinates)); isRouteFound = true;}
		catch (err) {console.error(err)}
	} while (!isRouteFound);
	const mercatorCoords = fromLonLat(generatedPoint.geometry.coordinates);
	const feature = new Feature({ geometry: new Point(mercatorCoords) });
	return { feature: feature, coordinates: mercatorCoords };
};

const randomFloat = (min: number, max: number): number => {
	/*
    Generate a random float number between two boundaries.

    @param min
    @param max
    @returns a random number.

    */
	return Math.random() * (max - min) + min;
};
