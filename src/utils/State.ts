import { Coordinate } from 'ol/coordinate';
import { atom, RecoilState } from 'recoil';
import { IRandomGenerationResults, IRouteGenerationParams } from './MapUtils.d';

const defaultRouteGenerationParams = {
	minDistance: 1,
	maxDistance: 5,
	minHeading: 0,
	maxHeading: 359,
	showRoute: true,
};

export const routeGenerationParams = atom<IRouteGenerationParams>({
	key: 'routeGenerationParams',
	default: defaultRouteGenerationParams,
});

export const userLocationState: RecoilState<Coordinate> = atom({
	key: 'userLocationState',
	default: [0, 0],
});
export const generateRouteFunction: RecoilState<() => void> = atom({
	key: 'generateRouteFunction',
	default: () => {
		console.error('no generation function defined!');
	},
});

export const generatedPointAndRoute = atom<IRandomGenerationResults | undefined>({
	key: 'generatedPointAndRoute',
	default: undefined,
});
