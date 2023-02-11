import React, { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IRandomGenerationResults } from '../../utils/MapUtils.d';
import { generatePointToRun } from '../../utils/MapUtils';
import { generateRouteFunction, userLocationState, routeGenerationParams } from '../../utils/State';

const MapController = (props: { children: JSX.Element | JSX.Element[] }) => {
	const routeGenerationParmas = useRecoilValue(routeGenerationParams);
	const userLocation = useRecoilValue(userLocationState);

	const generateRandomRoute = useCallback(async () => {
		console.log('Generating random route!');
		/*
		Generate a random route when user clicks - uses RecoilState variables.
		*/
		if (userLocation) {
			const results: IRandomGenerationResults = await generatePointToRun(
				userLocation,
				routeGenerationParmas.minDistance,
				routeGenerationParmas.maxDistance,
				routeGenerationParmas.minHeading,
				routeGenerationParmas.maxHeading
			);
			console.log(results);
		}
	}, [
		routeGenerationParmas.maxDistance,
		routeGenerationParmas.maxHeading,
		routeGenerationParmas.minDistance,
		routeGenerationParmas.minHeading,
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
