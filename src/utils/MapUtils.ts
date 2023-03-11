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
	routeGenerationMode,
	IRouteGenerationParams,
} from './MapUtils.d';

const getIsochroneFromApi = (
	currentLocation: EPSG3857,
	routeGenerationMode: routeGenerationMode,
	distanceValues: number[],
	timeValues: number[]
): Promise<LonLat[]> => {
	/**
	 * Get the isochrone (min-max range for random generation) for the random generation.
	 *
	 * @param currentLocation - Current user location (EPSG:3857)
	 * @param routeGenerationMode - Distance or Time
	 * @param distanceValues - Min and max distance (km)
	 * @param timeValues - Min and max time (minutes)
	 *
	 * @returns List of possible coordinates to pick from (LonLat).
	 */
	return new Promise((resolve, reject) => {
		const chosenValues = { distance: distanceValues, time: timeValues }[routeGenerationMode];
		const chosenRandomValue =
			Math.random() * (chosenValues[1] - chosenValues[0] + 1) + chosenValues[0];
		console.log(`Chosen ${routeGenerationMode} value - ${chosenRandomValue}`);
		currentLocation = toLonLat(currentLocation);
		const locationLonLat = { lon: currentLocation[0], lat: currentLocation[1] };
		fetch(`https://valhalla1.openstreetmap.de/isochrone?json={"locations":[${JSON.stringify(
			locationLonLat
		)}],"costing":"pedestrian","contours":[{"${routeGenerationMode}":${chosenRandomValue},"color":"ff0000"}]}
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
	const [startObject, endObject] = [
		{ lon: start[0], lat: start[1], type: 'break' },
		{ lon: end[0], lat: end[1], type: 'break' },
	];
	return new Promise((resolve, reject) => {
		fetch(
			`https://valhalla1.openstreetmap.de/route?json={"locations":${JSON.stringify([
				startObject,
				endObject,
			])},"costing":"pedestrian"}`
		)
			.then((res) => {
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
					routeShape: data.trip.legs[0].shape,
				});
			});
	});
};

export const handleRandomPointRequest = async (
	currentLocation: EPSG3857,
	routeGenerationParams: IRouteGenerationParams
): Promise<IPointAndRoute> => {
	/**
        Handle user asking for a random point - Generate one from an isochrone.

        @param currentLocation - Current user location (EPSG:3857).
        @param routeGenerationParams - Parameters for generating routes from the user.

        @returns CoordAndFeature - found point feature (EPSG:3857).

    */

	console.log('User parameters', routeGenerationParams);

	const possiblePoints = await getIsochroneFromApi(
		currentLocation,
		routeGenerationParams.routeGenerationMode,
		routeGenerationParams.distanceValues,
		routeGenerationParams.timeValues
	);
	possiblePoints.forEach((point: LonLat, i: number, arr: Coordinate[]) => {
		arr[i] = fromLonLat(point);
	});
	let bestPoint: { angleDifference: number; point: EPSG3857 } | undefined = undefined;
	const chosenHeading = createRandomHeading(
		routeGenerationParams.headingValues,
		routeGenerationParams.directionFlipped
	);
	console.log(`Chosen heading - ${chosenHeading}`);
	for (const possiblePoint of possiblePoints) {
		const currentAngleDifference = Math.abs(
			getAngleBetweenPoints(currentLocation, possiblePoint) - chosenHeading
		);
		if (!bestPoint || currentAngleDifference < bestPoint.angleDifference) {
			bestPoint = { angleDifference: currentAngleDifference, point: possiblePoint };
		}
	}
	console.log(
		`Selected point: ${bestPoint!.point}\n\nangle ${getAngleBetweenPoints(
			currentLocation,
			bestPoint!.point
		)}`
	);
	const createdRoute = await getRouteFromApi(currentLocation, bestPoint!.point);
	console.log(`Created route length - ${createdRoute.distance}`);
	return { point: bestPoint!.point, route: createdRoute };
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
	const dx = point1[0] - point2[0];
	const dy = point1[1] - point2[1];
	let radiansAngle;
	if (dy || dx) radiansAngle = Math.atan2(dy, dx);
	else radiansAngle = 0;
	if (radiansAngle < 0) radiansAngle += 2 * Math.PI;
	return 360 - ((radiansAngle + 0.5 * Math.PI) * 180) / Math.PI;
};

const createRandomHeading = (headingValues: number[], flipped: boolean): number => {
	/**
	 * Create a random heading out of the user's parameters.
	 *
	 * @param headingValues - min and max headings
	 * @param flipped - Whether or not the range is flipped (e.g. 300deg-20deg opposed to 20deg-300deg)
	 *
	 * @returns A random heading.
	 */
	if (!flipped) {
		return Math.random() * (headingValues[1] - headingValues[0] + 1) + headingValues[0];
	}
	const selectedHeadingRange = [
		[headingValues[1], 359.9],
		[0, headingValues[0]],
	][Math.round(Math.random())];
	return (
		Math.random() * (selectedHeadingRange[1] - selectedHeadingRange[0] + 1) +
		selectedHeadingRange[0]
	);
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
