import { Coordinate } from 'ol/coordinate';
import transformTranslate from '@turf/transform-translate';
import { point } from '@turf/helpers';
import midpoint from '@turf/midpoint'
import { fromLonLat, toLonLat } from 'ol/proj';
import {
	INearestResponse,
	IRouteResponse,
	IRouteItem,
	IPointAndRoute,
} from './MapUtils.d';
import { GeoJSONPoint } from 'ol/format/GeoJSON';

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
				return resp.json();
			})
			.then((data: IRouteResponse) => {
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

        @param coords - Initial coordinate EPSG:3857

        @returns Promise<Coordinate> - Nearest coordinate on a street EPSG:3857
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
): Promise<IPointAndRoute> => {
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
	let foundPoint = undefined;
	let generatedRoute;
	do {
		const rawGeneratedPoint = generateRandomPoint(
			userLocationGeoJson,
			minDistance,
			maxDistance,
			minHeading,
			maxHeading
		);
		try {
			foundPoint = await getNearestFromApi(
				fromLonLat(rawGeneratedPoint.geometry.coordinates)
			);
			generatedRoute = await getRouteFromApi(currentLocation, foundPoint);
			console.log(generatedRoute.distance)
			if (generatedRoute.distance <= maxDistance * 1000 && generatedRoute.distance >= minDistance * 1000)
				isRouteFound = true;
		} catch (err) {
			console.error(err);
		}
	} while (!isRouteFound);
	return { route: generatedRoute, point: foundPoint };
};

export const getMidpoint = (start: Coordinate, end: Coordinate): Coordinate => {
	/**
	 * Get the midpoint between two points on a map.
	 * 
	 * @param start - 1st point
	 * @param end   - 2nd point
	 * 
	 * @returns Coordinate - The found midpoint
	 */
	const [startLonLat, endLonLat] = [point(toLonLat(start)), point(toLonLat(end))];
	const midpointLonLat = midpoint(startLonLat, endLonLat);
	return fromLonLat(midpointLonLat.geometry.coordinates);
}

export const getRouteDistance = async (point1: Coordinate, point2: Coordinate): Promise<number> => {
	/**
	 * Get the road distance (not line) between two points.
	 * 
	 * @param point1 - 1st point EPSG:3857
	 * @param point2 - 2nd point EPSG:3857
	 * 
	 * @returns number - Distance in meters
	 */
	const route = await getRouteFromApi(point1, point2);
	return route.distance;
}

const randomFloat = (min: number, max: number): number => {
	/** 
    * Generate a random float number between two boundaries.
	*
    * @param min
    * @param max
    * @returns a random number.
	*
    */
	return Math.random() * (max - min) + min;
};
