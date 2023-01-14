import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import RoundButton from '../../reusables/RoundButton';
import LeaderboardsIconUrl from '../../../assets/images/UI/Leaderboards.svg';
import ProfileIconUrl from '../../../assets/images/UI/ProfilePicture-modified.png';
import TopBarInfo from './TopBarInfo';

const TopBar: React.FC = () => {
	return (
		<IonGrid style={{ padding: '0' }}>
			<IonRow>
				<IonCol size="2">
					<RoundButton iconUrl={LeaderboardsIconUrl} backgroundColor="white" />
				</IonCol>
				<IonCol size="8" style={{ padding: '0' }}>
					<TopBarInfo />
				</IonCol>
				<IonCol size="2">
					<RoundButton iconUrl={ProfileIconUrl} backgroundColor="white" />
				</IonCol>
			</IonRow>
		</IonGrid>
	);
};

export default TopBar;
