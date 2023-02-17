import { useSetRecoilState } from "recoil";
import { layoutDisplayMode } from "../../../../utils/State";

const SelectPoint = () => {
    const setLayoutDisplayMode = useSetRecoilState(layoutDisplayMode);
    return (
        <div>
            <h1>Select a point by clicking on the map</h1>
            <button onClick={() => setLayoutDisplayMode('random')}>Go back</button>
        </div>
    )
}

export default SelectPoint;