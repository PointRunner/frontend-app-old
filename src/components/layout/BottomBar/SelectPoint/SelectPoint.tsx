import { useSetRecoilState } from "recoil";
import { layoutDisplayModeState } from "../../../../utils/State";
import { BottomBarTextButton } from "../Styles.BottomBar";
import { SelectPointText } from "./Styles.SelectPoint";

const SelectPoint = () => {
    const setLayoutDisplayMode = useSetRecoilState(layoutDisplayModeState);
    return (
        <div>
            <SelectPointText>Select a point by clicking on the map</SelectPointText>
            <BottomBarTextButton onClick={() => setLayoutDisplayMode('default')}>Back</BottomBarTextButton>
        </div>
    )
}

export default SelectPoint;