import styled from 'styled-components';
import { BaseButton } from '../../../theme/Styles.Base';
import variables from '../../../variables';

export const BottomBarWrapper = styled.div`
	background-color: ${variables.menuBackgroundColor};
	width: 100%;
	position: fixed;
	bottom: 0;

	padding: 5%;

	border-top: solid 2px ${variables.primaryColorDarker};
	transition: all 500ms linear;

	&.expanded > div {
		align-items: start;
	}
`;

export const BottomBarFirstRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;



export const BottomBarIconButton = styled(BaseButton)`
	aspect-ratio: 1;
	width: clamp(48px, 12vw, 56px);
	border-radius: 100%;
`;


export const BottomBarTextButton = styled(BaseButton)`
	border-radius: 20px;
	padding: 15px;
	width: 40%;
`
