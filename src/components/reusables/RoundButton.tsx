import styled from 'styled-components';
import variables from '../../variables';

interface RoundButtonProps {
	backgroundColor?: string;
	onClick?: React.MouseEventHandler;
	color?: string;
}

interface RoundButtonImageProps {
	iconUrl: string;
}

interface RoundButtonWrapperProps {
	textPosition?: 'top' | 'bottom' | 'left' | 'right';
}

interface RoundButtonTextProps {
	backgroundColor?: string;
	text?: string;
}

const RoundButtonElement = styled.button<RoundButtonProps>`
backgroundColor: ${(props) => props.backgroundColor || variables.primaryColor};
color: ${(props) => props.color || variables.darkColor};
border-radius: 100%;
width: 100%;

`;

const textPositionFlexMapping = {
	top: 'column-reverse',
	bottom: 'column',
	left: 'row-reverse',
	right: 'row',
};

const RoundButtonWrapper = styled.div<RoundButtonWrapperProps>`
	display: flex;
	flex-direction: ${(props) => textPositionFlexMapping[props.textPosition || 'bottom']};
	width: 100%;
`;

const RoundButtonText = styled.p<RoundButtonTextProps>`
	color: ${(props) => props.backgroundColor};
`;

const RoundButtonImage = styled.img`
	width: 100%;
`;

const RoundButton = (
	props: RoundButtonProps & RoundButtonTextProps & RoundButtonWrapperProps & RoundButtonImageProps
) => {
	const RoundButtonComponent = (
		<RoundButtonElement className="round-button" onClick={props.onClick}>
			<RoundButtonImage src={props.iconUrl} alt={props.iconUrl} />
		</RoundButtonElement>
	);

	if (!props.text) {
		return RoundButtonComponent;
	}
	return (
		<>
			<RoundButtonWrapper className="round-button-wrapper">
				{RoundButtonComponent}
				<RoundButtonText>{props.text}</RoundButtonText>
			</RoundButtonWrapper>
		</>
	);
};

export default RoundButton;
