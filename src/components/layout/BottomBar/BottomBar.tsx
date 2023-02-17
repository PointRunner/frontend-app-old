import RandomIconUrl from '../../../assets/images/UI/random.png';
import PinpointIconUrl from '../../../assets/images/UI/map-pin.png';
import BackIconUrl from '../../../assets/images/UI/back.png';

import { useEffect, useState } from 'react';
import {
	BottomBarButton,
	BottomBarButtonWrapper,
	BottomBarFirstRow,
	BottomBarWrapper,
} from './Styles.BottomBar';
import { useSetRecoilState } from 'recoil';
import { layoutDisplayMode } from '../../../utils/State';
import RandomPoint from './RandomPoint/RandomPoint';
import SelectPoint from './SelectPoint/SelectPoint';
import { displayMode } from '../LayoutController/LayoutController.d';

interface IBottomBarProps {
	menuDisplayMode: displayMode;
}

const BottomBar = (props: IBottomBarProps) => {
	const setLayoutDisplayMode = useSetRecoilState(layoutDisplayMode);
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

	const handleTopButtonClick = (buttonElementId: string): void => {
		/** 
            Handle any click on a top button (one of the two main ones). 
            @param buttonElementId - ID of the button element that was clicked.
        */

		const displayStates: { [key: string]: displayMode } = {
			'select-point': 'select',
			'random-point': 'random',
		};

		if (currentlySelectedButton === document.getElementById(buttonElementId)) {
			setCurrentlySelectedButton(null);
			setLayoutDisplayMode('default');
			toggleBottomBar(false);
		} else {
			setCurrentlySelectedButton(
				document.getElementById(buttonElementId)! as HTMLButtonElement
			);
			setLayoutDisplayMode(displayStates[buttonElementId]);
			toggleBottomBar(true);
		}
	};

	useEffect(() => {
		/** 
			Change the action icons to either their original image or the back icon.
		*/
		const originalButtonIcons: { [key: string]: string } = {
			'select-point': PinpointIconUrl,
			'random-point': RandomIconUrl,
		};
		for (const originalButtonId in originalButtonIcons) {
			const buttonImageElement = document.getElementById(originalButtonId)!
				.children[0] as unknown as HTMLImageElement;
			buttonImageElement.src = originalButtonIcons[originalButtonId];
		}
		if (currentlySelectedButton) {
			(currentlySelectedButton.children[0] as unknown as HTMLImageElement).src = BackIconUrl;
		}
	}, [currentlySelectedButton]);

	return (
		<BottomBarWrapper className={isExpanded ? 'expanded' : ''}>
			<BottomBarFirstRow>
				<BottomBarButtonWrapper>
					<BottomBarButton
						id="select-point"
						onClick={() => handleTopButtonClick('select-point')}
					>
						<img src={PinpointIconUrl} alt="Select Point" />
					</BottomBarButton>
				</BottomBarButtonWrapper>
				<BottomBarButtonWrapper>
					<BottomBarButton
						id="random-point"
						onClick={() => handleTopButtonClick('random-point')}
					>
						<img src={RandomIconUrl} alt="Random Point" />
					</BottomBarButton>
				</BottomBarButtonWrapper>
			</BottomBarFirstRow>
			{(() => {
				switch (props.menuDisplayMode) {
					case 'random':
						return <RandomPoint />;
					case 'select':
						return <SelectPoint />;
				}
			})()}
		</BottomBarWrapper>
	);
};

export default BottomBar;
