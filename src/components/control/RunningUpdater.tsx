import { useCallback, useEffect, useRef } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getRouteDistance } from '../../utils/MapUtils';
import {
	userLocationState,
	RunningStatsState,
	nextPointAndRouteState,
	currentErrors,
	previousUserLocationState,
	runningFunctions,
} from '../../utils/State';
import { ERRORS, IRunningStatsInitializationData } from '../../utils/interfaces/interfaces.d';
import { fromLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import { IPointAndRoute } from '../../utils/MapUtils.d';

const POLLING_RATE_MS = 1000;

const RunningUpdater = () => {
	const [userLocation, setUserLocation] = useRecoilState(userLocationState);
	const setRunningFunctions = useSetRecoilState(runningFunctions);
	const [previousUserLocation, setPreviousUserLocation] =
		useRecoilState(previousUserLocationState);
	const nextPointAndRoute = useRecoilValue(nextPointAndRouteState);
	const [runningStats, setRunningStats] = useRecoilState(RunningStatsState);

	const setCurrentErrors = useSetRecoilState(currentErrors);

	const userLocationRef = useRef<Coordinate>();
	const nextPointAndRouteRef = useRef<IPointAndRoute>();

	const calculateScoreFromDistance = (distance: number): number => {
		/**
		 * Calculate score received according to the distance travelled.
		 *
		 * @param distance - Distance travelled in meters.
		 *
		 * @returns number - Calculated score.
		 */
		return distance;
	};

	const calculateSpeedFromDistance = (distance: number): number => {
		/**
		 * Calculate current speed according to the distance travelled.
		 *
		 * @param distance - Distance travelled in meters.
		 *
		 * @returns number - Calculated speed (km/h).
		 */
		return ((distance / (POLLING_RATE_MS / 1000)) * 3600) / 1000;
	};

	const updateRunningStats = useCallback(async () => {
		/**
		 * Update the running stats according to the
		 */
		if (nextPointAndRouteRef.current && userLocationRef.current) {
			const newDistance = await getRouteDistance(
				userLocationRef.current,
				nextPointAndRouteRef.current.point
			);
			const addedTravelledDistance = await getRouteDistance(
				userLocation,
				previousUserLocation
			);
			let newScore = 0;
			const distanceDelta = newDistance - runningStats.distanceLeft;
			if (distanceDelta > 0) {
				newScore += calculateScoreFromDistance(distanceDelta);
			}
			setRunningStats((old) => {
				return {
					...old,
					distanceTravelled: old.distanceTravelled + addedTravelledDistance,
					scoreAccumulated: old.scoreAccumulated + newScore,
					distanceLeft: newDistance,
					speed:
						(old.speed * old.secondsElapsed +
							calculateSpeedFromDistance(distanceDelta)) /
						(old.secondsElapsed + POLLING_RATE_MS / 1000),
					secondsElapsed: old.secondsElapsed + POLLING_RATE_MS / 1000,
				};
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [nextPointAndRoute, userLocation]);

	useEffect(() => {
		if (runningStats.isRunning) {
			updateRunningStats();
		}
	}, [userLocation, nextPointAndRoute, updateRunningStats, runningStats.isRunning]);

	const verifyLocationPermissions = async (): Promise<boolean> => {
		/**
		 * Verify the user has enabled location permissions.
		 *
		 * @returns boloean - whether or not permissions are granted.
		 */
		const hasPermissions = await Geolocation.checkPermissions();
		if (hasPermissions.coarseLocation !== 'granted') {
			const requestedPermissions = await Geolocation.requestPermissions({
				permissions: ['coarseLocation', 'location'],
			});
			if (requestedPermissions.coarseLocation !== 'granted') {
				setCurrentErrors((oldErrors) => {
					if (!oldErrors.includes(ERRORS.LOCATION_DISABLED)) {
						return oldErrors.concat([ERRORS.LOCATION_DISABLED]);
					}
					return oldErrors;
				});
				return false;
			}
		}
		return true;
	};

	const updateUserLocation = () => {
		/**
		 * Poll the user location and update the state for it - EPSG:3857.
		 */
		verifyLocationPermissions().then((res: boolean) => {
			if (!res) return;
			Geolocation.getCurrentPosition({
				enableHighAccuracy: true,
				maximumAge: POLLING_RATE_MS - 100,
			}).then((currentPositionLonLat) => {
				const currentPosition = fromLonLat([
					currentPositionLonLat.coords.longitude,
					currentPositionLonLat.coords.latitude,
				]);
				if (previousUserLocation[0] === 0 && previousUserLocation[1] === 0) {
					setPreviousUserLocation(currentPosition);
				} else {
					setPreviousUserLocation(userLocation);
				}
				setUserLocation(currentPosition);
			});
		});
	};

	const startRunning = () => {
		/**
		 * Initialize the runningStats state according to the route chosen
		 */
		console.log('STARTING');
		setRunningStats((old) => {
			return { ...old, isRunning: true };
		});

	};

	const initializeRunningStats = useCallback(() => {
		if (!nextPointAndRouteRef.current || !userLocationRef.current) return;
		getRouteDistance(userLocationRef.current, nextPointAndRouteRef.current.point).then(
			(initialDistance) => {
				const initialRunningStatsUpdate: IRunningStatsInitializationData = {
					distanceLeft: initialDistance,
					speed: 0,
				};
				setRunningStats((old) => {return {...old, ...initialRunningStatsUpdate}});
			}
		);
	}, [setRunningStats]);

	const stopRunning = () => {
		/**
		 * Set the runningStats state after a run has been stopped
		 */
		console.log('STOPPING');
		const runningStatsUpdate: IRunningStatsInitializationData = {
			distanceLeft: 0,
			speed: 0,
			isRunning: false,
		};
		setRunningStats((old) => {
			return { ...old, ...runningStatsUpdate };
		});
	};

	useEffect(() => console.log("current", runningStats), [runningStats]);

	useEffect(() => {
		userLocationRef.current = userLocation;
		nextPointAndRouteRef.current = nextPointAndRoute;
	}, [userLocation, nextPointAndRoute]);

	useEffect(() => {
		initializeRunningStats();
	}, [initializeRunningStats, nextPointAndRoute]);

	useEffect(() => {
		const interval = setInterval(updateUserLocation, POLLING_RATE_MS);
		setRunningFunctions({ start: startRunning, stop: stopRunning });

		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <></>;
};

export default RunningUpdater;
