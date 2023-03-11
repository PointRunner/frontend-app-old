
import { useState } from 'react';
import {
	BottomBarWrapper,
} from './Styles.BottomBar';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { layoutDisplayModeState, nextPointAndRouteState } from '../../../utils/State';
import SelectPoint from './SelectPoint/SelectPoint';
import { displayMode } from '../LayoutController/LayoutController.d';
import Default from './Default/Default';
import Running from './Running/Running';

interface IBottomBarProps {
	menuDisplayMode: displayMode;
}

const BottomBar = (props: IBottomBarProps) => {
	const setLayoutDisplayMode = useSetRecoilState(layoutDisplayModeState);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const nextPoint = useRecoilValue(nextPointAndRouteState);
	const [currentlySelectedButton, setCurrentlySelectedButton] =
		useState<HTMLButtonElement | null>(null);

	
		const buttonClickHandler = (buttonElementId: string, callback?: () => void): void => {
		/** 
            Handle any click on a top button (one of the two main ones). 
            @param buttonElementId - ID of the button element that was clicked.
			@param callback - optional function to run after the button has been clicked
        */

		const displayStates: { [key: string]: displayMode } = {
			'select-point': 'select',
			'random-point': 'random',
			'start-running': 'running',
		};
		if (currentlySelectedButton?.id === buttonElementId) {
			setCurrentlySelectedButton(null);
			setLayoutDisplayMode('default');
			setIsExpanded(false);
		} else {
			setIsExpanded(true);
			setCurrentlySelectedButton(
				document.getElementById(buttonElementId)! as HTMLButtonElement
			);
			setLayoutDisplayMode(displayStates[buttonElementId]);
		}
		if (!!callback) callback(); 
	};


	return (
		<BottomBarWrapper className={isExpanded ? 'expanded' : ''}>
			{(() => {
				switch (props.menuDisplayMode) {

					case 'select':
						return <SelectPoint />;
					case 'running':
						return <Running buttonClickHandler={buttonClickHandler}/>;
					case 'default':
						return <Default isPointSet={!!nextPoint} buttonClickHandler={buttonClickHandler} />;
				}
			})()}			
		</BottomBarWrapper>
	);
};

export default BottomBar;
