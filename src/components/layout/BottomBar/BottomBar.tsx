
import { useState } from 'react';
import {
	BottomBarWrapper,
} from './Styles.BottomBar';
import { useSetRecoilState } from 'recoil';
import { layoutDisplayMode } from '../../../utils/State';
import RandomPoint from './RandomPoint/RandomPoint';
import SelectPoint from './SelectPoint/SelectPoint';
import { displayMode } from '../LayoutController/LayoutController.d';
import Default from './Default/Default';

interface IBottomBarProps {
	menuDisplayMode: displayMode;
}

const BottomBar = (props: IBottomBarProps) => {
	const setLayoutDisplayMode = useSetRecoilState(layoutDisplayMode);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [currentlySelectedButton, setCurrentlySelectedButton] =
		useState<HTMLButtonElement | null>(null);

	
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
			setIsExpanded(false);
		} else {
			setIsExpanded(true);
			setCurrentlySelectedButton(
				document.getElementById(buttonElementId)! as HTMLButtonElement
			);
			setLayoutDisplayMode(displayStates[buttonElementId]);
		}
	};








	return (
		<BottomBarWrapper className={isExpanded ? 'expanded' : ''}>
			{(() => {
				switch (props.menuDisplayMode) {
					case 'random':
						return <RandomPoint />;
					case 'select':
						return <SelectPoint />;
					case 'default':
						return <Default handleTopButtonClick={handleTopButtonClick} />;
				}
			})()}			
		</BottomBarWrapper>
	);
};

export default BottomBar;
