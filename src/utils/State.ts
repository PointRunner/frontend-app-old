import { Coordinate } from 'ol/coordinate';
import { atom, RecoilState } from 'recoil';

export const maxDistanceParam: RecoilState<number> = atom({ key: 'maxDistanceParam', default: 5 });
export const minDistanceParam: RecoilState<number> = atom({ key: 'minDistanceParam', default: 1 });
export const maxHeadingParam: RecoilState<number> = atom({ key: 'maxHeadingParam', default: 359 });
export const minHeadingParam: RecoilState<number> = atom({ key: 'minHeadingParam', default: 0 });
export const showRouteParam: RecoilState<boolean> = atom({ key: 'showRouteParam', default: false });
export const userLocationState: RecoilState<Coordinate> = atom({ key: 'userLocationState', default: [0, 0] });
export const generateRouteFunction: RecoilState<() => void> = atom({
	key: 'generateRouteFunction',
	default: () => {console.error('no generation function defined!')},
});
