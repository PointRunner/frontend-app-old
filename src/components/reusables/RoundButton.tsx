import styled from 'styled-components';
import variables from '../../variables';

interface RoundButtonProps {
	/* Background color for the button - defaults to primary */
	backgroundColor?: string;
	/* onClick function */
	onClick?: React.MouseEventHandler;
	/* specific color for icons inside of the button  */
	color?: string;
}

interface RoundButtonImageProps {
	/* URL for the icon to be used */
	iconUrl: string;
}

interface RoundButtonWrapperProps {
	/* Position of optional text relative to the button */
	textPosition?: 'top' | 'bottom' | 'left' | 'right';
}

interface RoundButtonTextProps {
	/* Color of the text */
	textColor?: string;
	/* Optional text to be written next to the button */
	text?: string;
}

const RoundButtonElement = styled.button<RoundButtonProps>`
	background-color: ${(props) => props.backgroundColor || variables.primaryColor};
	color: ${(props) => props.color || variables.darkColor};
	border-radius: 100%;
	width: 50%;
	min-width: 10vw;
	margin: auto;
	aspect-ratio: 1;
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
	align-items: center;
`;

const RoundButtonText = styled.p<RoundButtonTextProps>`
	color: ${(props) => props.textColor || variables.primaryColor};
	font-size: 4vw;
	margin: 0;
`;

const RoundButtonImage = styled.img`
	width: 80%;
	aspect-ratio: 1;

`;

/*
	Standard round button for main actions - this includes both topbar corner buttons and bottom corner buttons

*/

const RoundButton = (
	props: RoundButtonProps & RoundButtonTextProps & RoundButtonWrapperProps & RoundButtonImageProps
) => {
	const RoundButtonComponent = (
		<RoundButtonElement
			backgroundColor={props.backgroundColor}
			color={props.color}
			className="round-button"
			onClick={props.onClick}
		>
			<RoundButtonImage src={props.iconUrl} alt={props.iconUrl} />
		</RoundButtonElement>
	);

	if (!props.text) {
		return <div style={{textAlign: 'center', margin: '20%'}}>{RoundButtonComponent}</div>;
	}
	return (
		<>
			<RoundButtonWrapper textPosition={props.textPosition} className="round-button-wrapper">
				{RoundButtonComponent}
				<RoundButtonText textColor={props.textColor || props.backgroundColor}>
					{props.text}
				</RoundButtonText>
			</RoundButtonWrapper>
		</>
	);
};

export default RoundButton;
