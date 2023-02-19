import { IonFabButton, IonIcon, IonRow } from "@ionic/react";
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


const MapControls = () => {
	const centerViewFunction = useRecoilValue(centerViewFunctionState);
    return (
        <IonRow>
			<CustomFab style={{margin: "5% 0 0 2%"}} onClick={() => console.log(centerViewFunction)}>
				<IonIcon icon={locateOutline}  />
			</CustomFab>
		</IonRow>
    )
}

export default MapControls;