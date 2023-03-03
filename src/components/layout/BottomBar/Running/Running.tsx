import { useRecoilValue } from 'recoil';
import { runningFunctions } from '../../../../utils/State';
import {
	BottomBarButtonWrapper,
	BottomBarCenterTextButton,
	BottomBarDefaultButtons,
} from '../Default/Styles.Default';

const Running = (props: { buttonClickHandler: (buttonElementId: string, callback?: () => void) => void }) => {

	const globalRunningFunctions = useRecoilValue(runningFunctions);

	return (
		<BottomBarDefaultButtons>
			<BottomBarButtonWrapper>
				<BottomBarCenterTextButton
					onClick={() => props.buttonClickHandler('start-running', globalRunningFunctions.stop)}
					id="start-running"
				>
					Stop Running
				</BottomBarCenterTextButton>
			</BottomBarButtonWrapper>
		</BottomBarDefaultButtons>
	);
};

export default Running;
