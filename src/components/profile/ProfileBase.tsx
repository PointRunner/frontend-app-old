import { IonIcon, IonImg } from '@ionic/react';
import { useState } from 'react';

import { chevronDown, chevronUp } from 'ionicons/icons';

import { Collapse } from 'react-collapse';

import ProfilePictureUrl from '../../assets/images/UI/ProfilePicture-modified.png';
import ChallengeIconUrl from '../../assets/images/UI/challenge.svg';
import AddFriendIconUrl from '../../assets/images/UI/add-friend.svg';
import {
	ProfileSubtext,
	ProfileName,
	ProfileContentWrapper,
	ProfileTopButton,
	ProfileTopIconsWrapper,
	ProfilePicture,
	ProfileNameWrapper,
	ProfileStatsWrapper,
	ProfileMainStats,
	ProfileBio,
	FriendsListSectionTitle,
	FriendsListItem,
	FriendsList,
} from './Styles.ProfileBase';

const ProfileBase = () => {
	const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
	return (
		<>
			<ProfileContentWrapper>
				<ProfileTopIconsWrapper>
					<ProfileTopButton>
						<IonImg src={ChallengeIconUrl} alt="challenge" />
					</ProfileTopButton>
					<ProfilePicture>
						<IonImg alt="profile" src={ProfilePictureUrl} />
					</ProfilePicture>
					<ProfileTopButton>
						<IonImg src={AddFriendIconUrl} alt="challenge" />
					</ProfileTopButton>
				</ProfileTopIconsWrapper>
				<ProfileNameWrapper>
					<ProfileName>ShadowMuffin</ProfileName>
					<ProfileSubtext>20</ProfileSubtext>
				</ProfileNameWrapper>
				<ProfileBio>This is my bio, I hope you like it :)</ProfileBio>
				<ProfileStatsWrapper>
					<ProfileMainStats>
						<thead>
							<tr>
								<th>
									<h3>18 months</h3>
									<h6>Member for</h6>
								</th>
								<th>
									<h3>9540</h3>
									<h6>Points</h6>
								</th>
								<th>
									<h3>35th</h3>
									<h6>Global Rank</h6>
								</th>
							</tr>
						</thead>
					</ProfileMainStats>
					<ProfileTopButton
						onClick={() =>
							setIsStatsOpen((old) => {
								return !old;
							})
						}
					>
						<IonIcon
							style={{ color: 'black' }}
							icon={isStatsOpen ? chevronUp : chevronDown}
							size={'small'}
						/>
					</ProfileTopButton>
					<Collapse isOpened={isStatsOpen}>
						<div>
							<div>
								<h2>Number Of Runs</h2>
								<p>50</p>
							</div>
							<div>
								<h2>Total Kilometers</h2>
								<p>922.3</p>
							</div>
                            <div>
								<h2>Average Pace</h2>
								<p>5'52 min/km</p>
							</div>
							<div>
								<h2>Longest Run</h2>
								<p>15.5 km</p>
							</div>
						</div>
					</Collapse>
				</ProfileStatsWrapper>

				<div>
					<FriendsListSectionTitle>Friends</FriendsListSectionTitle>
					<FriendsList>
						<FriendsListItem>
							<img alt="profile" src={ProfilePictureUrl} />
						</FriendsListItem>
						<FriendsListItem>
							<img alt="profile" src={ProfilePictureUrl} />
						</FriendsListItem>
						<FriendsListItem>
							<img alt="profile" src={ProfilePictureUrl} />
						</FriendsListItem>
						<FriendsListItem>
							<img alt="profile" src={ProfilePictureUrl} />
						</FriendsListItem>
						<FriendsListItem>
							<img alt="profile" src={ProfilePictureUrl} />
						</FriendsListItem>
					</FriendsList>
				</div>
			</ProfileContentWrapper>
		</>
	);
};

export default ProfileBase;
