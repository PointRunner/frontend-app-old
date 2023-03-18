import { IonIcon } from '@ionic/react';
import { locateOutline } from 'ionicons/icons';

import { useRecoilValue } from 'recoil';
import { centerViewFunction as centerViewFunctionState } from '../../../utils/State';
import { CustomFabGroup, CustomFab } from './Styles.TopBar';

const MapControls = () => {
	const centerViewFunction = useRecoilValue(centerViewFunctionState);
	return (
		<CustomFabGroup
			style={{ marginTop: '10vh' }}
			slot="fixed"
			vertical="top"
			horizontal="start"
		>
			<CustomFab style={{ margin: '10% 0' }} onClick={centerViewFunction}>
				<IonIcon icon={locateOutline} />
			</CustomFab>
		</CustomFabGroup>
	);
};

export default MapControls;
