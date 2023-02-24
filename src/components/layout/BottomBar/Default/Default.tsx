import { BottomBarIconButton } from '../Styles.BottomBar';
import RandomIconUrl from '../../../../assets/images/UI/random.png';
import PinpointIconUrl from '../../../../assets/images/UI/map-pin.png';
import { BottomBarButtonWrapper, BottomBarDefaultButtons } from './Styles.Default';


const Default = (props: {handleTopButtonClick: (arg0: string) => void}) => {
	return (
		<BottomBarDefaultButtons>
			<BottomBarButtonWrapper>
				<BottomBarIconButton
					id="select-point"
					onClick={() => props.handleTopButtonClick('select-point')}
				>
					<img src={PinpointIconUrl} alt="Select Point" />
				</BottomBarIconButton>
			</BottomBarButtonWrapper>
			<BottomBarButtonWrapper>
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
