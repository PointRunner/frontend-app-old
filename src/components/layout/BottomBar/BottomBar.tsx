import RandomIconUrl from '../../../assets/images/UI/random.png';
import PinpointIconUrl from '../../../assets/images/UI/map-pin.png';
import BackIconUrl from '../../../assets/images/UI/back.png';

import { useEffect, useState } from 'react';
import {
	BottomBarWrapper,
	BottomBarFirstRow,
	BottomBarButtonWrapper,
	BottomBarButton,
	BottomBarInputs,
	BottomBarInput,
	BottomBarInputWrapper,
	BottomBarMenuButtons,
	BottomBarMenuButton,
} from './Styles.BottomBar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { generateRouteFunction, routeGenerationParams } from '../../../utils/State';
import { IRouteGenerationParams } from '../../../utils/MapUtils.d';

const BottomBar = () => {
	const [routeParams, setRouteParams] =
		useRecoilState<IRouteGenerationParams>(routeGenerationParams);
	const generateRouteFunc = useRecoilValue(generateRouteFunction);

	const [errorMessage, setErrorMessage] = useState<String>('');
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [currentlySelectedButton, setCurrentlySelectedButton] =
		useState<HTMLButtonElement | null>(null);

	const toggleBottomBar = (forcedValue: boolean | undefined = undefined): void => {
		/** 
            Toggle the bottom bar expansion, or set it to a forced value.
            @param forcedValue - Value to use if need to override toggle.
        */
		if (forcedValue) setIsExpanded(forcedValue);
		else setIsExpanded(!isExpanded);
	};

	const handleTopButtonClick = (buttonElementId: string, nextFuction: () => any): void => {
		/** 
            Handle any click on a top button (one of the two main ones). 
            @param buttonElementId - ID of the button element that was clicked.
            @param nextFunction - Next function to run (original onClick target function).
        */
		if (currentlySelectedButton) setCurrentlySelectedButton(null);
		else
			setCurrentlySelectedButton(
				document.getElementById(buttonElementId)! as HTMLButtonElement
			);
		nextFuction();
	};

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
		const inputFieldIds = {
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
		if (inputFieldIds['max-distance'].value < inputFieldIds['min-distance'].value) {
			valid = false;
			showInputError(
				inputFieldIds['max-distance'],
				'Maximum distance must be higher than the minimum!'
			);
		}
		if (inputFieldIds['max-heading'].value < inputFieldIds['min-heading'].value) {
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
	};

	useEffect(() => {
		/** 
			Change the action icons to either their original image or the back icon.
		*/
		const originalButtonIcons: { [key: string]: string } = {
			'select-point': PinpointIconUrl,
			'random-point': RandomIconUrl,
		};
		if (currentlySelectedButton) {
			(currentlySelectedButton.children[0] as unknown as HTMLImageElement).src = BackIconUrl;
		} else {
			for (const originalButtonId in originalButtonIcons) {
				const buttonImageElement = document.getElementById(originalButtonId)!
					.children[0] as unknown as HTMLImageElement;
				buttonImageElement.src = originalButtonIcons[originalButtonId];
			}
		}
	}, [currentlySelectedButton]);

	return (
		<BottomBarWrapper className={isExpanded ? 'expanded' : ''}>
			<BottomBarFirstRow>
				<BottomBarButtonWrapper>
					<BottomBarButton
						id="select-point"
						onClick={() =>
							handleTopButtonClick('select-point', () => toggleBottomBar())
						}
					>
						<img src={PinpointIconUrl} alt="Select Point" />
					</BottomBarButton>
				</BottomBarButtonWrapper>
				<BottomBarButtonWrapper>
					<BottomBarButton
						id="random-point"
						onClick={() =>
							handleTopButtonClick('random-point', () => toggleBottomBar())
						}
					>
						<img src={RandomIconUrl} alt="Random Point" />
					</BottomBarButton>
				</BottomBarButtonWrapper>
			</BottomBarFirstRow>
			<BottomBarInputs>
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
		</BottomBarWrapper>
	);
};

export default BottomBar;
