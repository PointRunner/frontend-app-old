import { IonBackButton, IonContent, IonPage } from '@ionic/react';

const Social: React.FC = () => {
	return (
		<IonPage>
			<IonContent>
				<div>
					Social <IonBackButton />
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Social;
