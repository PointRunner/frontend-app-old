import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { layoutDisplayMode } from '../../../utils/State';
import MapController from '../../control/MapController';
import BottomBar from '../BottomBar/BottomBar';
import MapWrapper from '../MapWrapper/MapWrapper';
import TopBar from '../TopBar/TopBar';

const LayoutController = () => {
    const layoutDisplayModeState = useRecoilValue(layoutDisplayMode);
	useEffect(() => console.log(layoutDisplayModeState), [layoutDisplayModeState])
	return (
		<>
            {layoutDisplayModeState !== 'select' ? (<TopBar />) : ("")}
			<MapController>
				<MapWrapper />
			</MapController>
			<BottomBar menuDisplayMode={layoutDisplayModeState} />
		</>
	);
};

export default LayoutController;
