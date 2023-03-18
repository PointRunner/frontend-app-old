import { IonBackButton, IonContent, IonPage } from '@ionic/react';

const Profile: React.FC = () => {
	return (
		<IonPage>
			<IonContent>
				<div>
					Profile <IonBackButton />
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Profile;
