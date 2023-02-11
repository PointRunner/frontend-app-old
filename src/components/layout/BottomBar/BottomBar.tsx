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
import {
	generateRouteFunction,
	maxDistanceParam,
	maxHeadingParam,
	minDistanceParam,
	minHeadingParam,
} from '../../../utils/State';

const BottomBar = () => {
	const [maxDistance, setMaxDistance] = useRecoilState(maxDistanceParam);
	const [minDistance, setMinDistance] = useRecoilState(minDistanceParam);
	const [maxHeading, setMaxHeading] = useRecoilState(maxHeadingParam);
	const [minHeading, setMinHeading] = useRecoilState(minHeadingParam);
	const generateRouteFunc = useRecoilValue(generateRouteFunction);

	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [currentlySelectedButton, setCurrentlySelectedButton] =
		useState<HTMLButtonElement | null>(null);

	const toggleBottomBar = (forcedValue: boolean | undefined = undefined): void => {
		/*
            Toggle the bottom bar expansion, or set it to a forced value.
            @param forcedValue - Value to use if need to override toggle.
        */
		if (forcedValue) setIsExpanded(forcedValue);
		else setIsExpanded(!isExpanded);
	};

	const handleTopButtonClick = (buttonElementId: string, nextFuction: () => any): void => {
		/*
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

	useEffect(() => {
		/*
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
							value={minDistance}
							onChange={(e) => setMinDistance(parseFloat(e.target.value))}
							type="number"
						/>
						<label>KM</label>
					</div>
				</BottomBarInputWrapper>
				<BottomBarInputWrapper>
					<label>Maximum Distance</label>
					<div>
						<BottomBarInput
							value={maxDistance}
							onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
							type="number"
						/>
						<label>KM</label>
					</div>
				</BottomBarInputWrapper>
				<BottomBarInputWrapper>
					<label>Minimum Heading</label>
					<div>
						<BottomBarInput
							value={minHeading}
							onChange={(e) => setMinHeading(parseInt(e.target.value))}
							type="number"
							min="0"
							max="359"
						/>
						<label>Deg</label>
					</div>
				</BottomBarInputWrapper>
				<BottomBarInputWrapper>
					<label>Maximum Heading</label>
					<div>
						<BottomBarInput
							value={maxHeading}
							onChange={(e) => setMaxHeading(parseInt(e.target.value))}
							type="number"
							min="0"
							max="359"
						/>
						<label>Deg</label>
					</div>
				</BottomBarInputWrapper>
			</BottomBarInputs>
			<BottomBarMenuButtons>
				<BottomBarMenuButton onClick={generateRouteFunc}>
					Generate
				</BottomBarMenuButton>
			</BottomBarMenuButtons>
		</BottomBarWrapper>
	);
};

export default BottomBar;
