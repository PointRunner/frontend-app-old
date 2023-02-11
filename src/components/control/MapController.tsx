import React, { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CoordAndFeature } from '../../utils/MapUtils.d';
import { generatePointToRun } from '../../utils/MapUtils';
import {
	maxDistanceParam,
	minDistanceParam,
	maxHeadingParam,
	minHeadingParam,
	generateRouteFunction,
	userLocationState,
} from '../../utils/State';

const MapController = (props: { children: JSX.Element | JSX.Element[] }) => {
	const maxDistance = useRecoilValue(maxDistanceParam);
	const minDistance = useRecoilValue(minDistanceParam);
	const maxHeading = useRecoilValue(maxHeadingParam);
	const minHeading = useRecoilValue(minHeadingParam);
	const userLocation = useRecoilValue(userLocationState);

	const generateRandomRoute = useCallback(async () => {
		console.log("Generating random route!")
		/*
		Generate a random route when user clicks - uses RecoilState variables.
		*/
		if (userLocation) {
			const results: CoordAndFeature = await generatePointToRun(
				userLocation,
				minDistance,
				maxDistance,
				minHeading,
				maxHeading
			);
			console.log(results);
		}
	}, [maxDistance, maxHeading, minDistance, minHeading, userLocation]);
	const setGenerateRouteFunc = useSetRecoilState(generateRouteFunction);
	useEffect(() => setGenerateRouteFunc(() => generateRandomRoute), [generateRandomRoute, setGenerateRouteFunc]);

	return <>{props.children}</>;
};

export default MapController;
