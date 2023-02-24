import { Coordinate } from 'ol/coordinate';
import { atom, RecoilState } from 'recoil';
import { IPointAndRoute, IRouteGenerationParams } from './MapUtils.d';
import { displayMode } from '../components/layout/LayoutController/LayoutController.d';
import { IRunningStats } from './interfaces/interfaces';

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


export const RunningStatsState = atom<IRunningStats | {isRunning: boolean}>({
	key: 'runningStatsState',
	default: {isRunning: false}
})


export const generateRouteFunction: RecoilState<() => void> = atom({
	key: 'generateRouteFunction',
	default: () => {
		console.error('no generation function defined!');
	},
});

export const nextPointAndRouteState = atom<IPointAndRoute | undefined>({
	key: 'nextPointAndRoute',
	default: undefined,
});

export const layoutDisplayMode = atom<displayMode>({
	key: 'layoutDisplayMode',
	default: 'default',
});


export const centerViewFunction: RecoilState<() => void> = atom({
	key: 'centerViewFunction',
	default: () => {
		console.error('no center function defined!');
	},
});