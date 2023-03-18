import { IonAvatar } from '@ionic/react';
import React from 'react';
import LeaderboardsIconUrl from '../../../assets/images/UI/Leaderboards.svg';
import ProfileIconUrl from '../../../assets/images/UI/ProfilePicture-modified.png';
import TopBarInfo from './TopBarInfo';
import MapControls from './MapControls';
import { useRecoilValue } from 'recoil';
import { RunningStatsState } from '../../../utils/State';
import TopBarInfoPlaceholder from './TopBarInfoPlaceholder';
import { IRunningStats } from '../../../utils/interfaces/interfaces.d';
import { CustomFab, CustomFabGroup, TopBarWrapper } from './Styles.TopBar';
import { pageSwitchAnimations } from '../../../utils/animations/Animations';

const TopBar: React.FC = () => {
	const runningStats = useRecoilValue(RunningStatsState);
	return (
		<>
			<CustomFabGroup slot="fixed" vertical="top" horizontal="start">
				<CustomFab
					size="small"
					routerLink="/social"
					routerAnimation={(baseEl, opts) =>
						pageSwitchAnimations(baseEl, { ...opts, animationDirection: 'left' })
					}
				>
					<IonAvatar>
						<img src={LeaderboardsIconUrl} alt="Leaderboards" />
					</IonAvatar>
				</CustomFab>
			</CustomFabGroup>
			<TopBarWrapper>
				{(() => {
					if (runningStats.isRunning) {
						return <TopBarInfo runningStats={runningStats as IRunningStats} />;
					} else {
						return <TopBarInfoPlaceholder />;
					}
				})()}
			</TopBarWrapper>
			<CustomFabGroup slot="fixed" vertical="top" horizontal="end">
				<CustomFab
					size="small"
					routerLink="/profile"
					routerAnimation={(baseEl, opts) =>
						pageSwitchAnimations(baseEl, { ...opts, animationDirection: 'right' })
					}
				>
					<IonAvatar>
						<img src={ProfileIconUrl} alt="Profile" />
					</IonAvatar>
				</CustomFab>
			</CustomFabGroup>

			<MapControls />
		</>
	);
};

export default TopBar;
