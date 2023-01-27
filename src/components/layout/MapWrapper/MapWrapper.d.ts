
export interface INearestResponse {
	code: string;
	waypoints?: {
		hint?: string;
		distance: number;
		name?: string;
		location?: number[];
	}[];
}

export interface IRouteResponse {
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

export interface IRouteGeometry {
	type: string;
	coordinates: Coordinate[];
}

export interface CoordAndFeature {
	coordinates: Coordinate;
	feature: Feature;
}