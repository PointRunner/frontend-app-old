import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import RunningUpdater from '../components/control/RunningUpdater';

import LayoutController from '../components/layout/LayoutController/LayoutController';

const Home: React.FC = () => {
	return (
		<IonPage>
			<IonContent>
				<RunningUpdater />
				<LayoutController />
			</IonContent>
		</IonPage>
	);
};

export default Home;
