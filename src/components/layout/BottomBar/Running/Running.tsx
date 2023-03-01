import {
	BottomBarButtonWrapper,
	BottomBarCenterTextButton,
	BottomBarDefaultButtons,
} from '../Default/Styles.Default';

const Running = (props: {handleTopButtonClick: (arg0: string) => void}) => {


	return (
		<BottomBarDefaultButtons>
			<BottomBarButtonWrapper>
				<BottomBarCenterTextButton onClick={() => props.handleTopButtonClick('start-running')} id="start-running">
					Stop Running
				</BottomBarCenterTextButton>
			</BottomBarButtonWrapper>
		</BottomBarDefaultButtons>
	);
};

export default Running;
