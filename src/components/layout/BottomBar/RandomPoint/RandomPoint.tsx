import { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { IRouteGenerationParams } from '../../../../utils/MapUtils.d';
import { generateRouteFunction, routeGenerationParams } from '../../../../utils/State';
import {
	BottomBarInput,
	BottomBarInputs,
	BottomBarInputWrapper,
	BottomBarMenuButton,
	BottomBarMenuButtons,
	ErrorMessage,
} from './Styles.RandomPoint';

const RandomPoint = () => {
    
	const generateRouteFunc = useRecoilValue(generateRouteFunction);
	const [errorMessage, setErrorMessage] = useState<String>('');
	const [routeParams, setRouteParams] =
		useRecoilState<IRouteGenerationParams>(routeGenerationParams);

    const updateRouteGenerationParams = (
		key: keyof IRouteGenerationParams,
		newValue: number | boolean
	) => {
		/**
		 * Update the recoil.js state regarding the route generation params.
		 *
		 * @param key - Name of the parameter to update
		 * @param newValue - New value to set for that key.
		 */

		setRouteParams((prevState) => {
			return { ...prevState, [key]: newValue };
		});
	};

	const handleGenerateRoute = () => {
		/**
		 * Validate user input - if all good start route generation.
		 */
		cleanErrors();
		if (validateInput()) generateRouteFunc();
	};

	const validateInput = (): boolean => {
		/**
		 * Validate input before generating a route.
		 *
		 * @returns boolean - result.
		 */
		let valid = true;
		const inputFieldIds: { [key: string]: HTMLInputElement } = {
			'min-distance': document.getElementById('min-distance')! as HTMLInputElement,
			'max-distance': document.getElementById('max-distance')! as HTMLInputElement,
			'min-heading': document.getElementById('min-heading')! as HTMLInputElement,
			'max-heading': document.getElementById('max-heading')! as HTMLInputElement,
		};

		for (const inputField of Object.values(inputFieldIds)) {
			if (!inputField.value) {
				valid = false;
				showInputError(inputField);
			}
			if (!valid) return false;
		}
		if (
			parseFloat(inputFieldIds['max-distance'].value) <
			parseFloat(inputFieldIds['min-distance'].value)
		) {
			valid = false;
			showInputError(
				inputFieldIds['max-distance'],
				'Maximum distance must be higher than the minimum!'
			);
		}
		if (
			parseInt(inputFieldIds['max-heading'].value) <
			parseInt(inputFieldIds['min-heading'].value)
		) {
			valid = false;
			showInputError(
				inputFieldIds['max-heading'],
				'Maximum heading must be higher than the minimum!'
			);
		}

		return valid;
	};

	const cleanErrors = () => {
		setErrorMessage('');
		for (const elem of document.getElementsByClassName('error')) {
			elem.classList.remove('error');
		}
	};

	const showInputError = (elem: HTMLElement, message?: string) => {
		/**
		 * Display a UI error message when user input is wrong.
		 *
		 * @param elem - ID of the element to show an error for.
		 * @param message - Optional message to show under the inputs.
		 */
		if (message) setErrorMessage(message);
		elem.classList.add('error');
	};
	return (
		<>
			<BottomBarInputs>
				<ErrorMessage style={{ display: errorMessage ? 'inherit' : 'hidden' }}>
					{errorMessage}
				</ErrorMessage>
				<BottomBarInputWrapper className="first">
					<label>Minimum Distance</label>
					<div>
						<BottomBarInput
							value={routeParams.minDistance}
							onChange={(e) =>
								updateRouteGenerationParams(
									'minDistance',
									parseFloat(e.target.value)
								)
							}
							type="number"
							id="min-distance"
						/>
						<label>KM</label>
					</div>
				</BottomBarInputWrapper>
				<BottomBarInputWrapper>
					<label>Maximum Distance</label>
					<div>
						<BottomBarInput
							value={routeParams.maxDistance}
							onChange={(e) =>
								updateRouteGenerationParams(
									'maxDistance',
									parseFloat(e.target.value)
								)
							}
							type="number"
							id="max-distance"
						/>
						<label>KM</label>
					</div>
				</BottomBarInputWrapper>
				<BottomBarInputWrapper>
					<label>Minimum Heading</label>
					<div>
						<BottomBarInput
							value={routeParams.minHeading}
							onChange={(e) =>
								updateRouteGenerationParams('minHeading', parseInt(e.target.value))
							}
							type="number"
							max="359"
							id="min-heading"
						/>
						<label>Deg</label>
					</div>
				</BottomBarInputWrapper>
				<BottomBarInputWrapper>
					<label>Maximum Heading</label>
					<div>
						<BottomBarInput
							value={routeParams.maxHeading}
							onChange={(e) =>
								updateRouteGenerationParams('maxHeading', parseInt(e.target.value))
							}
							type="number"
							max="359"
							id="max-heading"
						/>
						<label>Deg</label>
					</div>
				</BottomBarInputWrapper>
			</BottomBarInputs>
			<BottomBarMenuButtons>
				<BottomBarMenuButton onClick={handleGenerateRoute}>Generate</BottomBarMenuButton>
			</BottomBarMenuButtons>
		</>
	);
};

export default RandomPoint;
