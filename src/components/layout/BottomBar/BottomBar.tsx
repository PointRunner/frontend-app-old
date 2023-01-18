import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import styled from 'styled-components';

const BottomBarWrapper = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 10vh;
`;

const BottomBar: React.FC = () => {
	return (
		<BottomBarWrapper>
			<IonGrid>
				<IonRow>
					<IonCol size="1" style={{ backgroundColor: 'green', width: '100%' }}>
						a
					</IonCol>
					<IonCol size="10" style={{ backgroundColor: 'red', width: '100%' }}>
						b
					</IonCol>
					<IonCol size="1" style={{ backgroundColor: 'green', width: '100%' }}>
						c
					</IonCol>
				</IonRow>
			</IonGrid>
		</BottomBarWrapper>
	);
};

export default BottomBar;
