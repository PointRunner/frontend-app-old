import styled from "styled-components";
import variables from "../../../variables";

export const BottomBarWrapper = styled.div`
	background-color: ${variables.menuBackgroundColor};
	width: 100%;
	max-height: 10vh;
	position: fixed;
	bottom: 0;

	padding: 2% 5%;
	transition: max-height 200ms ease-in;
	overflow: hidden;

    border-top: solid 2px ${variables.primaryColorDarker};

	&.expanded {
		padding: 5%;
		max-height: 50vh;

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
	padding: 6%;
	aspect-ratio: 1;
	width: 48px;
	background-color: ${variables.primaryColor};
	border-radius: 100%;
	transition: all 150ms linear;
	&:hover {
		width: 56px;
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
    & > label {
        color: ${variables.primaryColor};
        font-size: clamp(16px, 3vw, 32px);
    }
`

export const BottomBarInput = styled.input`
    background-color: ${variables.menuBackgroundColorDarker};
    border-radius: 20px;
    width: 20%;
    border: solid 2px ${variables.primaryColor};
    padding: 15px;
    color: black;
    margin-right: -20%;
    text-align: center;
    font-size: clamp(16px, 3vw, 32px);



`
