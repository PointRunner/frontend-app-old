import { IonContent } from '@ionic/react';
import styled from 'styled-components';
import variables from '../variables';

export const BaseButton = styled.button`
padding: 6px;
background: linear-gradient(
    to bottom,
    ${variables.primaryColor},
    ${variables.primaryColorDarker}
);
transition: all 350ms ease;
font-size: ${variables.sizes.fontMedium};

&:disabled {
    background: ${variables.disabledColor};
    color: ${variables.darkColor};
}

&:enabled:hover, &:enabled:active, &:enabled:focus {
    scale: 110%;
    background-color: ${variables.primaryColorDarker};
`;


export const BaseContent = styled(IonContent)`
    --ion-background-color: linear-gradient(to bottom, ${variables.menuBackgroundColor} 90%, ${variables.menuBackgroundColorDarker})

`
