import { IonBackButton, IonButtons, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ProfileBase from '../components/profile/ProfileBase';
import { BaseContent } from '../theme/Styles.Base';

const Profile: React.FC = () => {
	return (
		<IonPage>
			<IonHeader translucent={true}>
				<IonToolbar>
					<IonTitle>
						My Profile
					</IonTitle>
					<IonButtons slot="start">
						<IonBackButton defaultHref='/index' text='Map' color='primary'/>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<BaseContent>
				<ProfileBase />
			</BaseContent>
		</IonPage>
	);
};

export default Profile;
