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
&:hover, &:active {
    scale: 110%;
    background-color: ${variables.primaryColorDarker};
`;
