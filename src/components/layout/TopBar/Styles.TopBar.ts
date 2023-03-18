import { IonFabButton, IonFab } from "@ionic/react"
import styled from "styled-components"
import variables from "../../../variables"

export const TopBarWrapper = styled.div`
	position: fixed;
	width: 100%;
	top: 0;
	padding: 0 12vw;

`

export const CustomFab = styled(IonFabButton)`
	
	--background: ${variables.menuBackgroundColor};
	--background-activated: ${variables.menuBackgroundColorDarker};
	--background-hover: ${variables.menuBackgroundColorDarker};
	--color: black;
	--outline: none;
	--box-shadow: none;
	
`

export const CustomFabGroup = styled(IonFab)`
	
	z-index: 2;
`