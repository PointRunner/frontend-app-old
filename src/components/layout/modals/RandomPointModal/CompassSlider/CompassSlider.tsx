import CircularSliderWithChildren from 'react-circular-slider-svg';
import variables from '../../../../../variables';
import {
	Compass,
	CompassFlipButton,
	CompassGroupWrapper,
	CompassLabelsWrapper,
} from './Styles.CompassSlider';

import FlipButtonUrl from '../../../../../assets/images/UI/two-sided-arrow.svg';
import CompassImageUrl from '../../../../../assets/images/UI/compass.png';

const CompassSlider = (props: {
	flipped: boolean;
	toggleFlipped: () => void;
	limits: number[];
	values: number[];
	onChange: (values: number[]) => void;
}) => {
	return (
		<CompassGroupWrapper>
			<Compass
				coerceToInt
				angleType={{ direction: 'cw', axis: '+y' }}
				minValue={props.limits[0]}
				maxValue={props.limits[1]}
				handleSize={16}
				handleColor={variables.primaryColorLighter}
				arcColor={
					props.flipped
						? variables.menuBackgroundColorDarker
						: variables.primaryColorLighter
				}
				arcBackgroundColor={
					props.flipped
						? variables.primaryColorLighter
						: variables.menuBackgroundColorDarker
				}
				handle1={{
					value: props.values[0],
					onChange: (v) => props.onChange([v, props.values[1]]),
				}}
				handle2={{
					value: props.values[1],
					onChange: (v) => props.onChange([props.values[0], v]),
				}}
			>
				<CompassFlipButton onClick={props.toggleFlipped}>
					<div>
						<img src={FlipButtonUrl} alt="Flip Direction" />
					</div>
				</CompassFlipButton>
			</Compass>
			<CompassLabelsWrapper>
				{props.flipped ? `${props.values[1]}° - ${props.values[0]}°` : `${props.values[0]}° - ${props.values[1]}°`}
			</CompassLabelsWrapper>
		</CompassGroupWrapper>
	);
};

export default CompassSlider;
