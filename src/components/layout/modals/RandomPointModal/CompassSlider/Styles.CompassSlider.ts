import { CircularSliderWithChildren } from './CircleSlider/CircleSlider';
import styled from 'styled-components';
import { BaseButton } from '../../../../../theme/Styles.Base';
import variables from '../../../../../variables';

export const CompassGroupWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Compass = styled(CircularSliderWithChildren)`
	& circle {
		fill: ${variables.primaryColor} !important;
	}
`;

export const CompassLabelsWrapper = styled.div`
	font-size: clamp(14px, 2.5vw, 38px);
`;

export const CompassFlipButton = styled(BaseButton)`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50px;
	& div {
		transform: rotate(-45deg);
		width: 50%;
	}
`;
