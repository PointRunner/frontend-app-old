import React, { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IPointAndRoute } from '../../utils/MapUtils.d';
import { handleRandomPointRequest } from '../../utils/MapUtils';
import {
	generateRouteFunction,
	userLocationState,
	routeGenerationParams,
	nextPointAndRouteState,
} from '../../utils/State';

const MapController = (props: { children: JSX.Element | JSX.Element[] }) => {
	const routeGenerationParmas = useRecoilValue(routeGenerationParams);
	const userLocation = useRecoilValue(userLocationState);
	const setNextPointAndRoute = useSetRecoilState(nextPointAndRouteState);

	const generateRandomRoute = useCallback(async () => {
		console.log('Generating random route!');
		/*
		Generate a random route when user clicks - uses RecoilState variables.
		*/
		if (userLocation) {
			const results: IPointAndRoute = await handleRandomPointRequest(
				userLocation,
				routeGenerationParmas.minDistance!,
				routeGenerationParmas.maxDistance!,
				routeGenerationParmas.minHeading!,
				routeGenerationParmas.maxHeading!
			);
			setNextPointAndRoute(results);
		}
	}, [
		routeGenerationParmas.maxDistance,
		routeGenerationParmas.maxHeading,
		routeGenerationParmas.minDistance,
		routeGenerationParmas.minHeading,
		setNextPointAndRoute,
		userLocation,
	]);
	const setGenerateRouteFunc = useSetRecoilState(generateRouteFunction);
	useEffect(
		() => setGenerateRouteFunc(() => generateRandomRoute),
		[generateRandomRoute, setGenerateRouteFunc]
	);

	return <>{props.children}</>;
};

export default MapController;
