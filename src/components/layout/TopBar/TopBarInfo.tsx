import { IonCol, IonGrid, IonRow } from '@ionic/react';
import styled from 'styled-components';

interface TopBarInfoProps {
	textColor?: string;
	backgroundColor?: string;
}

const TopBarInfoText = styled.div<TopBarInfoProps>`
	text-align: center;
	font-size: 3vw;
	color: ${(props) => props.textColor || 'black'};
`;

const TopBarInfoLarge = styled(TopBarInfoText)`
	${TopBarInfoText};
	font-size: 7vw;
`;

const TopBarWrapper = styled.div<TopBarInfoProps>`
    margin: auto;
	width: 90%;
	background-color: ${(props) => props.backgroundColor || 'white'};
	border-bottom-left-radius: 300px 300px;
    border-bottom-right-radius: 300px 300px;
    padding: 0 6% 2.5% 6%;
`;

const TopBarInfo = (props: TopBarInfoProps) => {
	return (
		<TopBarWrapper backgroundColor={props.backgroundColor}>
			<IonGrid>
				<IonRow style={{ marginBottom: '3%' }}>
					<IonCol>
						<TopBarInfoLarge textColor={props.textColor}>00:15:12</TopBarInfoLarge>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						<TopBarInfoText  textColor={props.textColor}>5.25km</TopBarInfoText>
					</IonCol>
					<IonCol>
						<TopBarInfoText  textColor={props.textColor}>8.2km/h</TopBarInfoText>
					</IonCol>
				</IonRow>
			</IonGrid>
		</TopBarWrapper>
	);
};

export default TopBarInfo;
