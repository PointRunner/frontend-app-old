import { BottomBarIconButton } from '../Styles.BottomBar';
import RandomIconUrl from '../../../../assets/images/UI/random.png';
import PinpointIconUrl from '../../../../assets/images/UI/map-pin.png';
import {
	BottomBarButtonWrapper,
	BottomBarCenterTextButton,
	BottomBarDefaultButtons,
} from './Styles.Default';
import { useRecoilValue } from 'recoil';
import { runningFunctions } from '../../../../utils/State';

const Default = (props: {
	buttonClickHandler: (buttonElementId: string, callback?: () => void) => void;
	isPointSet: boolean;
}) => {

	const globalRunningFunctions = useRecoilValue(runningFunctions);

	return (
		<BottomBarDefaultButtons>
			<BottomBarButtonWrapper size="2">
				<BottomBarIconButton
					id="select-point"
					onClick={() => props.buttonClickHandler('select-point')}
				>
					<img src={PinpointIconUrl} alt="Select Point" />
				</BottomBarIconButton>
			</BottomBarButtonWrapper>
			<BottomBarButtonWrapper size="8">
				<BottomBarCenterTextButton
					id="start-running"
					onClick={() => props.buttonClickHandler('start-running', globalRunningFunctions.start)}
					disabled={!props.isPointSet}
				>
					Start Running!
				</BottomBarCenterTextButton>
			</BottomBarButtonWrapper>
			<BottomBarButtonWrapper size="2">
				<BottomBarIconButton
					id="random-point"
					onClick={() => props.buttonClickHandler('random-point')}
				>
					<img src={RandomIconUrl} alt="Random Point" />
				</BottomBarIconButton>
			</BottomBarButtonWrapper>
		</BottomBarDefaultButtons>
	);
};

export default Default;
