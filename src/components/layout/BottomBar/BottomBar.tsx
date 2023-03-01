
import { useEffect, useState } from 'react';
import {
	BottomBarWrapper,
} from './Styles.BottomBar';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { layoutDisplayModeState, nextPointAndRouteState, RunningStatsState } from '../../../utils/State';
import RandomPoint from './RandomPoint/RandomPoint';
import SelectPoint from './SelectPoint/SelectPoint';
import { displayMode } from '../LayoutController/LayoutController.d';
import Default from './Default/Default';
import Running from './Running/Running';

interface IBottomBarProps {
	menuDisplayMode: displayMode;
}

const BottomBar = (props: IBottomBarProps) => {
	const [layoutDisplayMode, setLayoutDisplayMode] = useRecoilState(layoutDisplayModeState);
	const setRunningStats = useSetRecoilState(RunningStatsState);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const nextPoint = useRecoilValue(nextPointAndRouteState);
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
			'start-running': 'running',
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


	useEffect(() => {
		setRunningStats((old) => {return {...old, isRunning: layoutDisplayMode === "running"}})
	}, [layoutDisplayMode, setRunningStats])



	return (
		<BottomBarWrapper className={isExpanded ? 'expanded' : ''}>
			{(() => {
				switch (props.menuDisplayMode) {
					case 'random':
						return <RandomPoint />;
					case 'select':
						return <SelectPoint />;
					case 'running':
						return <Running  handleTopButtonClick={handleTopButtonClick}/>;
					case 'default':
						return <Default isPointSet={!!nextPoint} handleTopButtonClick={handleTopButtonClick} />;
				}
			})()}			
		</BottomBarWrapper>
	);
};

export default BottomBar;
