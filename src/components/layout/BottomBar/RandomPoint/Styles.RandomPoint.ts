import styled from "styled-components";
import variables from "../../../../variables";
import { BottomBarFirstRow, BottomBarIconButton } from "../Styles.BottomBar";

export const ErrorMessage = styled.p`
	width: 100%;
	text-align: center;
	display: block;
	color: red;
	font-weight: bold;
    margin-top: 0;
`;

export const BottomBarInputs = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0;
	margin-top: 3vh;
`;

export const BottomBarInputWrapper = styled.div`
	display: flex;
	padding: 0;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 5%;

	& > div {
		display: flex;
		justify-content: end;
		align-items: center;
	}

	& label {
		color: ${variables.primaryColor};
		font-size: clamp(16px, 3vw, 32px);
	}
    
`;

export const BottomBarInput = styled.input`
	background-color: ${variables.menuBackgroundColorDarker};
	border-radius: 80px;
	width: 62%;
	border: solid 2px ${variables.primaryColor};
	padding: 15px;
	color: black;
	text-align: center;
	margin-right: 15px;
	font-size: clamp(16px, 3vw, 32px);

    &.error {
        border-color: red;
    }
`;

export const BottomBarMenuButtons = styled(BottomBarFirstRow)`
	justify-content: space-between;
`;

export const BottomBarMenuButton = styled(BottomBarIconButton)`
	color: black;
	padding: 15px 5px;
	border-radius: 80px;
	aspect-ratio: initial;
	width: clamp(64px, 45%, 600px);
	height: 5%;
	font-size: clamp(16px, 3vw, 32px);
	&:hover {
		scale: 1.05;
	}
`;