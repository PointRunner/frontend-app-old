import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import LeaderboardsIconUrl from '../../../assets/images/UI/Leaderboards.svg';
import ProfileIconUrl from '../../../assets/images/UI/ProfilePicture-modified.png';
import TopBarInfo from './TopBarInfo';
import MapControls from './MapControls';

const TopBar: React.FC = () => {
	return (
		<IonGrid style={{ padding: '0' }}>
			<IonRow>
				<IonCol size="2">
				</IonCol>
				<IonCol size="8" style={{ padding: '0' }}>
					<TopBarInfo />
				</IonCol>
				<IonCol size="2">
				</IonCol>
			</IonRow>
			<MapControls />
		</IonGrid>
	);
};

export default TopBar;
