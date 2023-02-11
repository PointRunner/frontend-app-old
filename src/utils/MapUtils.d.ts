export interface INearestResponse {
	code: string;
	waypoints?: {
		hint?: string;
		distance: number;
		name?: string;
		location?: number[];
	}[];
}

export interface IRouteItem {
	distance: number;
	duration: number;
	geometry: {
		type: 'string';
		coordinates: Coordinate[];
	};
}
export interface IRouteResponse {
	code: string;
	routes?: IRouteItem[];
}

export interface IRouteGeometry {
	type: string;
	coordinates: Coordinate[];
}

export interface CoordAndFeature {
	coordinates: Coordinate;
	feature: Feature;
}


export interface IRouteGenerationParams {
	minDistance: number;
	maxDistance: number;
	minHeading: number;
	maxHeading: number;
	showRoute: boolean;
	
}

export interface IRandomGenerationResults {
	point: CoordAndFeature,
	route?: IRouteItem
}
