import { IonCol, IonRow } from "@ionic/react";
import styled from "styled-components";
import variables from "../../../../variables";
import { BottomBarTextButton } from "../Styles.BottomBar";

export const BottomBarDefaultButtons = styled(IonRow)`
    display: flex;
	align-items: center;
	justify-content: space-between;
`

export const BottomBarButtonWrapper = styled(IonCol)`
	color: ${variables.primaryColor};
	text-align: center;
`;


export const BottomBarCenterTextButton = styled(BottomBarTextButton)`
	width: 80%;
`