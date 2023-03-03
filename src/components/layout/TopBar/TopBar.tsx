import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import LeaderboardsIconUrl from '../../../assets/images/UI/Leaderboards.svg';
import ProfileIconUrl from '../../../assets/images/UI/ProfilePicture-modified.png';
import TopBarInfo from './TopBarInfo';
import MapControls from './MapControls';
import { useRecoilValue } from 'recoil';
import { RunningStatsState } from '../../../utils/State';
import TopBarInfoPlaceholder from './TopBarInfoPlaceholder';
import { IRunningStats } from '../../../utils/interfaces/interfaces.d';

const TopBar: React.FC = () => {
	const runningStats = useRecoilValue(RunningStatsState);

	return (
		<IonGrid style={{ padding: '0' }}>
			<IonRow>
				<IonCol size="1"></IonCol>
				<IonCol size="10" style={{ padding: '0' }}>
					{(() => {
						if (runningStats.isRunning) {
							return <TopBarInfo runningStats={runningStats as IRunningStats}/>;
						}

						else {
							return <TopBarInfoPlaceholder />
						}
					})()}
				</IonCol>
				<IonCol size="1"></IonCol>
			</IonRow>
			<MapControls />
		</IonGrid>
	);
};

export default TopBar;
