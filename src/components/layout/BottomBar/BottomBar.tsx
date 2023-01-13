import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';

const BottomBar: React.FC = () => {
	return (
		<IonGrid>
			<IonRow>
				<IonCol size="1" style={{ backgroundColor: 'green', width: '100%' }}>a</IonCol>
				<IonCol size="10" style={{ backgroundColor: 'red', width: '100%' }}>b</IonCol>
				<IonCol size="1" style={{ backgroundColor: 'green', width: '100%' }}>c</IonCol>
			</IonRow>
		</IonGrid>
	);
};

export default BottomBar;
