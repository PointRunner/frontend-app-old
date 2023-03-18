import { IonBackButton, IonPage } from '@ionic/react';
import { BaseContent } from '../theme/Styles.Base';

const Social: React.FC = () => {
	return (
		<IonPage>
			<BaseContent>
				<div>
					Social <IonBackButton />
				</div>
			</BaseContent>
		</IonPage>
	);
};

export default Social;
