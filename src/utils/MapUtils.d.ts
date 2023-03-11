import { Coordinate } from "ol/coordinate";

export type EPSG3857 = Coordinate;
export type LonLat = Coordinate;

export type routeGenerationMode = 'distance' | 'time'

export interface INearestResponse {
	code: string;
	waypoints?: {
		hint?: string;
		distance: number;
		name?: string;
		location?: number[];
	}[];
}

export interface IIsochroneResponse {
	features: {
		properties: {
			[key: string]: number | string
		},
		geometry: {
			coordinates: LonLat[],
			type: string
		}
		type: string
	}[],
	type: string
}

export interface IRouteItem {
	distance: number;
	duration: number;
	routeShape: IRouteGeometry;
}
export interface IRouteResponse {
	trip: {
		summary: {
			time: number,
			length: number
		},
		legs: {
			shape: string
		}[]
	}
}

export type IRouteGeometry = string | LonLat[];

export interface CoordAndFeature {
	coordinates: Coordinate;
	feature: Feature;
}


export interface IRouteGenerationParams {
	routeGenerationMode: routeGenerationMode;
	directionFlipped: boolean;
	distanceValues: number[];
	timeValues: number[];
	headingValues: number[];
	showRoute: boolean;
	keepGenerating: boolean;
	
}

export interface IPointAndRoute {
	point: EPSG3857,
	route?: IRouteItem
}
