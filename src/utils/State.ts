import { Coordinate } from 'ol/coordinate';
import { atom, RecoilState } from 'recoil';
import { IPointAndRoute, IRouteGenerationParams } from './MapUtils.d';
import { displayMode } from '../components/layout/LayoutController/LayoutController.d';
import { ERRORS, IRunningStats } from './interfaces/interfaces';

const defaultRouteGenerationParams: IRouteGenerationParams = {
	routeGenerationMode: 'distance',
	distanceValues: [1, 10],
	timeValues: [1, 100],
	headingValues: [0, 359],
	showRoute: true,
	directionFlipped: false,
	keepGenerating: true,
};

export const initialRunningStats: IRunningStats = {
	isRunning: false,
	distanceLeft: 0,
	distanceTravelled: 0,
	scoreAccumulated: 0,
	secondsElapsed: 0,
	speed: 0,
	passedPoints: 0
};

export const routeGenerationParamsState = atom<IRouteGenerationParams>({
	key: 'routeGenerationParamsState',
	default: defaultRouteGenerationParams,
});

export const userLocationState: RecoilState<Coordinate> = atom({
	key: 'userLocationState',
	default: [0, 0],
});

export const previousUserLocationState: RecoilState<Coordinate> = atom({
	key: 'previousUserLocationState',
	default: [0, 0],
});

export const RunningStatsState = atom<IRunningStats>({
	key: 'runningStatsState',
	default: initialRunningStats,
});

export const PreviousRunningStatsState = atom<IRunningStats>({
	key: 'previousRunningStatsState',
	default: initialRunningStats,
});

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

export const layoutDisplayModeState = atom<displayMode>({
	key: 'layoutDisplayModeState',
	default: 'default',
});

export const centerViewFunction: RecoilState<() => void> = atom({
	key: 'centerViewFunction',
	default: () => {
		console.error('no center function defined!');
	},
});

export const runningFunctions: RecoilState<{ start: () => void; stop: () => void }> = atom({
	key: 'startRunningFunction',
	default: {
		start: () => {
			console.error('no center function defined!');
		},
		stop: () => {
			console.error('no center function defined!');
		},
	},
});

export const currentErrors = atom<ERRORS[]>({
	key: 'currentErrors',
	default: [] as ERRORS[],
});
