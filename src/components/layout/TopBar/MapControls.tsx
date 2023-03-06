import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { locateOutline } from "ionicons/icons";
import variables from "../../../variables";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { centerViewFunction as centerViewFunctionState} from "../../../utils/State";

const CustomFab = styled(IonFabButton)`
	
	--background: ${variables.menuBackgroundColor};
	--background-activated: ${variables.menuBackgroundColorDarker};
	--background-hover: ${variables.menuBackgroundColorDarker};
	--color: black;
	--outline: none;
	--box-shadow: none;
	
`

const CustomFabGroup = styled(IonFab)`
	margin-top: 10vh;
	z-index: 2;
`



const MapControls = () => {
	const centerViewFunction = useRecoilValue(centerViewFunctionState);
    return (
        <CustomFabGroup slot="fixed" vertical="top" horizontal="start">
			<CustomFab style={{margin: "10% 0"}} onClick={centerViewFunction}>
				<IonIcon icon={locateOutline}  />
			</CustomFab>
		</CustomFabGroup>
    )
}

export default MapControls;