import { Coordinate } from 'ol/coordinate';
import { point } from '@turf/helpers';
import midpoint from '@turf/midpoint';
import { fromLonLat, toLonLat } from 'ol/proj';
import {
	IRouteResponse,
	IRouteItem,
	IPointAndRoute,
	IIsochroneResponse,
	EPSG3857,
	LonLat,
} from './MapUtils.d';

const getIsochroneFromApi = (
	currentLocation: EPSG3857,
	maxDistance: number,
	minDistance: number
): Promise<LonLat[]> => {
	/**
	 * Get the isochrone (min-max range for random generation) for the random generation.
	 *
	 * @param currentLocation - Current user location (EPSG:3857)
	 * @param maxDistance - Maximum distance (km)
	 * @param minDistance - Minimum distance (km)
	 *
	 * @returns List of possible coordinates to pick from (LonLat).
	 */
	return new Promise((resolve, reject) => {
		const chosenRandomDistance = Math.random() * (maxDistance - minDistance + 1) + minDistance;
		currentLocation = toLonLat(currentLocation);
		const locationLonLat = { lon: currentLocation[0], lat: currentLocation[1] };
		fetch(`https://valhalla1.openstreetmap.de/isochrone?json={"locations":[${JSON.stringify(
			locationLonLat
		)}],"costing":"pedestrian","contours":[{"distance":${chosenRandomDistance},"color":"ff0000"}]}
		`)
			.then((res) => {
				if (res.status === 200) return res.json();
				reject(
					res.json().then((json) => {
						return json.error;
					})
				);
			})
			.then((data: IIsochroneResponse) => {
				resolve(data.features[0].geometry.coordinates);
			});
	});
};

export const getRouteFromApi = (start: EPSG3857, end: EPSG3857): Promise<IRouteItem> => {
	/** 
        Get an optimal route from the OSRM API.
        @param start - Start EPSG:3857 coordinate.
        @param end - End EPSG:3857 coordinate.

        @returns Promise<IRouteItem> - Found route from the API.
    */
	start = toLonLat(start);
	end = toLonLat(end);
	const [startObject, endObject] = [{lon: start[0], lat: start[1], type: 'break'}, {lon: end[0], lat: end[1], type: 'break'}]
	return new Promise((resolve, reject) => {
		fetch(
			`https://valhalla1.openstreetmap.de/route?json={"locations":${JSON.stringify([startObject, endObject])},"costing":"pedestrian"}`
		).then((res) => {
			if (res.status === 200) return res.json();
			reject(
				res.json().then((json) => {
					return json.error;
				})
			);
		})
		.then((data: IRouteResponse) => {
			resolve({
				distance: data.trip.summary.length,
				duration: data.trip.summary.time,
				routeShape: data.trip.legs[0].shape
			})
		});
	});
};


export const handleRandomPointRequest = async (
	currentLocation: EPSG3857,
	minDistance: number,
	maxDistance: number,
	minHeading: number,
	maxHeading: number
): Promise<IPointAndRoute> => {
	/*
        Handle user asking for a random point - Generate one from an isochrone.

        @param currentLocation - Current user location (EPSG:3857).
        @param minDistance - Minimum distance from current user location.
        @param maxDistance - Maximum distance from current user location.
        @param minHeading - Minimum heading in degress (0-359).
        @param maxHeading - Maximum heading in degress (0-359).

        @returns CoordAndFeature - found point feature (EPSG:3857).

    */
	const possiblePoints = await getIsochroneFromApi(currentLocation, maxDistance, minDistance);
	possiblePoints.forEach((point: LonLat, i: number, arr: Coordinate[]) => {
		arr[i] = fromLonLat(point);
	});
	let bestPoint: { angleDifference: number; point: EPSG3857 } | undefined = undefined;
	const chosenHeading = Math.random() * (maxHeading - minHeading + 1) + minHeading;
	for (const possiblePoint of possiblePoints) {
		const currentAngleDifference = Math.abs(
			getAngleBetweenPoints(currentLocation, possiblePoint) - chosenHeading
		);
		console.log(`wanted angle for ${possiblePoint} - ${chosenHeading}deg - angle is ${getAngleBetweenPoints(currentLocation, possiblePoint)}`)
		if (!bestPoint || currentAngleDifference < bestPoint.angleDifference) {
			bestPoint = { angleDifference: currentAngleDifference, point: possiblePoint };
		}
	}
	console.log(`Selected point angle ${getAngleBetweenPoints(currentLocation, bestPoint!.point)}`)
	const createdRoute = await getRouteFromApi(currentLocation, bestPoint!.point)
	return {point: bestPoint!.point, route: createdRoute}
	
};

export const getMidpoint = (start: EPSG3857, end: EPSG3857): EPSG3857 => {
	/**
	 * Get the midpoint between two points on a map.
	 *
	 * @param start - 1st point EPSG3857
	 * @param end   - 2nd point EPSG3857
	 *
	 * @returns Coordinate - The found midpoint EPSG3857
	 */
	const [startLonLat, endLonLat] = [point(toLonLat(start)), point(toLonLat(end))];
	const midpointLonLat = midpoint(startLonLat, endLonLat);
	return fromLonLat(midpointLonLat.geometry.coordinates);
};

export const getRouteDistance = async (point1: EPSG3857, point2: EPSG3857): Promise<number> => {
	/**
	 * Get the road distance (not line) between two points.
	 *
	 * @param point1 - 1st point EPSG:3857
	 * @param point2 - 2nd point EPSG:3857
	 *
	 * @returns number - Distance in kilometers
	 */
	const route = await getRouteFromApi(point1, point2);
	return route.distance;
};

const getAngleBetweenPoints = (point1: EPSG3857, point2: EPSG3857): number => {
	/**
	 * Get the angle (in degrees) between two points - Compass heading (0 degress is vertical)
	 * @param point1 - 1st point EPSG:3857
	 * @param point2 - 2nd point EPSG:3857
	 *
	 * @returns number - Angle in degress
	 */
	const dx = point1[0] - point2[0]
	const dy = point1[1] - point2[1];
	let radiansAngle;
	if (dy || dx)
		radiansAngle = Math.atan2(dy, dx);
	else radiansAngle = 0;
	if (radiansAngle < 0) radiansAngle += 2*Math.PI;
	return 360 - ((radiansAngle + 0.5*Math.PI) * 180 / Math.PI)
};

export const getLineDistance = (point1: EPSG3857, point2: EPSG3857): number => {
	/**
	 * Get the line between two points.
	 *
	 * @param point1 - 1st point EPSG:3857
	 * @param point2 - 2nd point EPSG:3857
	 *
	 * @returns number - Distance in meters
	 */
	return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2));
};
