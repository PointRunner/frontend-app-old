import { BottomBarIconButton } from '../Styles.BottomBar';
import RandomIconUrl from '../../../../assets/images/UI/random.png';
import PinpointIconUrl from '../../../../assets/images/UI/map-pin.png';
import { BottomBarButtonWrapper, BottomBarCenterTextButton, BottomBarDefaultButtons } from './Styles.Default';

const Default = (props: { handleTopButtonClick: (arg0: string) => void , isPointSet: boolean}) => {
	return (
		<BottomBarDefaultButtons>
			<BottomBarButtonWrapper size="2">
				<BottomBarIconButton 
					id="select-point"
					onClick={() => props.handleTopButtonClick('select-point')}
				>
					<img src={PinpointIconUrl} alt="Select Point" />
				</BottomBarIconButton>
			</BottomBarButtonWrapper>
			<BottomBarButtonWrapper size="8">
				<BottomBarCenterTextButton
					id="start-running"
					onClick={() => props.handleTopButtonClick('start-running')}
					disabled={!props.isPointSet}
				>
					Start Running!
				</BottomBarCenterTextButton>
			</BottomBarButtonWrapper>
			<BottomBarButtonWrapper size="2">
				<BottomBarIconButton
					id="random-point"
					onClick={() => props.handleTopButtonClick('random-point')}
				>
					<img src={RandomIconUrl} alt="Random Point" />
				</BottomBarIconButton>
			</BottomBarButtonWrapper>
		</BottomBarDefaultButtons>
	);
};

export default Default;
