import styled from 'styled-components';
import variables from '../../../variables';

export const BottomBarWrapper = styled.div`
	background-color: ${variables.menuBackgroundColor};
	width: 100%;
	max-height: 10vh;
	position: fixed;
	bottom: 0;

	padding: 2% 5%;
	transition: all 200ms ease-in;
	overflow: hidden;

	border-top: solid 2px ${variables.primaryColorDarker};

	&.expanded {
		padding: 5%;
		max-height: 100vh;

		& > div {
			align-items: start;
		}
	}
`;

export const BottomBarFirstRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const BottomBarButtonWrapper = styled.div`
	color: ${variables.primaryColor};
`;

export const BottomBarButton = styled.button`
	padding: 6px;
	aspect-ratio: 1;
	width: clamp(48px, 12vw, 56px);
	background: linear-gradient(
		to bottom,
		${variables.primaryColor},
		${variables.primaryColorDarker}
	);
	border-radius: 100%;
	transition: all 150ms linear;
	&:hover {
		scale: 110%;
		background-color: ${variables.primaryColorDarker};
	}
`;


