import { IonButton, IonContent, IonHeader, IonModal, IonTitle } from '@ionic/react';
import styled from 'styled-components';
import variables from '../../../variables';

export const ModalContentWrapper = styled.div`
	background-color: ${variables.menuBackgroundColor};
	height: 100%;
	color: black;
`;

export const CustomModal = styled(IonModal)`
	--max-height: 90vh;
	--margin: 0;
	--width: 90%;
	--border-radius: 16px;
`;

export const CustomModalContent = styled.div`
	--ion-background-color: ${variables.menuBackgroundColor};
	--overflow: auto;
	--max-height: 100%;

`

export const ModalHeader = styled(IonHeader)`
	background: rgba(255, 255, 255, 0.01);
	border-radius: 16px;
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
	border: 1px solid rgba(255, 255, 255, 0.3);
	color: ${variables.primaryColor};
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px 10px;
`;

export const ModalHeaderButton = styled(IonButton)`
	color: ${variables.primaryColor};
	--box-shadow: none;
	--background: none;
	border-radius: 16px;
    
`;

export const ModalHeaderConfirmButton = styled(ModalHeaderButton)`
	color: white;
	background-color: ${variables.primaryColor};
`;

export const ModalTitle = styled(IonTitle)`
	text-align: center;
`;


export const ModalBody = styled.div`
    padding: 5%;


`

export const ModalInputRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const ModalInputLabelGroup = styled.div`
    width: 50%;
    transition: color 200ms linear;
    &.disabled {
        color: ${variables.disabledColor};
    }
`;

export const ModalInputLabelMain = styled.h3`
    width: 100%;
	font-size: clamp(18px, 3vw, 36px);
	text-align: left;
`;

export const ModalInputLabelSecondary = styled.p`
	font-size: clamp(12px, 2vw, 24px);
    margin-right: 20%;
	text-align: right;
    white-space: nowrap;
`;
