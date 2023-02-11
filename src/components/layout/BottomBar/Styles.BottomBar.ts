import styled from "styled-components";
import variables from "../../../variables";

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

        &>div {
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
	background: linear-gradient(to bottom, ${variables.primaryColor}, ${variables.primaryColorDarker});
	border-radius: 100%;
	transition: all 150ms linear;
	&:hover {
		scale: 110%;
		background-color: ${variables.primaryColorDarker};
	}
`;


export const BottomBarInputs = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    margin-top: 5vh;
    
`

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
`

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
`

export const BottomBarMenuButtons = styled(BottomBarFirstRow)`
    justify-content: end;
`

export const BottomBarMenuButton = styled(BottomBarButton)`
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
`
