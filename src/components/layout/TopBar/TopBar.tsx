import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import RoundButton from '../../reusables/RoundButton';
import LeaderboardsIconUrl from '../../../assets/images/UI/Leaderboards.png'

const TopBar: React.FC = () => {
	return (
		<IonGrid>
			<IonRow>
				<IonCol size="1"><RoundButton iconUrl={LeaderboardsIconUrl}/></IonCol>
				<IonCol size="10" style={{ backgroundColor: 'red', width: '100%' }}>b</IonCol>
				<IonCol size="1" style={{ backgroundColor: 'green', width: '100%' }}>c</IonCol>
			</IonRow>
		</IonGrid>
	);
};

export default TopBar;
