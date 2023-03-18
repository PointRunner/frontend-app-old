import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IPointAndRoute } from '../../utils/MapUtils.d';
import { handleRandomPointRequest } from '../../utils/MapUtils';
import {
	generateRouteFunction,
	userLocationState,
	routeGenerationParamsState,
	nextPointAndRouteState,
} from '../../utils/State';
import { useCallback, useEffect } from 'react';

const MapController = (props: { children: JSX.Element | JSX.Element[] }) => {
	const userLocation = useRecoilValue(userLocationState);
	const setNextPointAndRoute = useSetRecoilState(nextPointAndRouteState);

	const routeGenerationParams = useRecoilValue(routeGenerationParamsState);
	const generateRandomRoute = useCallback(() => {
		console.log('Generating random route!');
		/*
		Generate a random route when user clicks - uses RecoilState variables.
		*/
		if (userLocation) {
			handleRandomPointRequest(userLocation, routeGenerationParams).then(
				(results: IPointAndRoute) => setNextPointAndRoute(results)
			);
		}
	}, [routeGenerationParams, setNextPointAndRoute, userLocation]);
	const setGenerateRouteFunc = useSetRecoilState(generateRouteFunction);
	useEffect(
		() => setGenerateRouteFunc(() => generateRandomRoute),
		[generateRandomRoute, setGenerateRouteFunc]
	);

	return <>{props.children}</>;
};

export default MapController;
