import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IRunningStats } from '../../../utils/interfaces/interfaces.d';

interface TopBarInfoVisualProps {
	textColor?: string;
	backgroundColor?: string;
}

interface TopBarInfoProps extends TopBarInfoVisualProps {
	runningStats: IRunningStats
}



const TopBarInfoText = styled.div<TopBarInfoVisualProps>`
	text-align: center;
	font-size: 3vw;
	color: ${(props) => props.textColor || 'black'};
`;

const TopBarInfoLarge = styled(TopBarInfoText)`
	${TopBarInfoText};
	font-size: 7vw;
`;

const TopBarWrapper = styled.div<TopBarInfoVisualProps>`
    margin: auto;
	width: 90%;
	background-color: ${(props) => props.backgroundColor || 'white'};
	border-bottom-left-radius: 300px 300px;
    border-bottom-right-radius: 300px 300px;
    padding: 0 6% 2.5% 6%;
`;

const TopBarInfo = (props: TopBarInfoProps) => {

	const [formattedTime, setFormattedTime] = useState<string>('00:00:00');

	useEffect(() => {
		const formatSecondsToClock = () => {
			/**
			 * Format the seconds elapsed into a nicer-looking clock.
			 */
			let seconds = props.runningStats.secondsElapsed;
			const hours = (seconds % 3600).toString().padStart(2, '0');
			seconds /= seconds % 3600 * 3600;
			const minutes = (seconds % 60).toString().padStart(2, '0');
			seconds /= seconds % 60 * 60;
			const finalSeconds = seconds.toString().padStart(2, '0');
			const clockFormattedTime = `${hours}:${minutes}:${finalSeconds}`
			setFormattedTime(clockFormattedTime);
		}
		formatSecondsToClock();
	}, [props.runningStats.secondsElapsed])
	
	return (
		<TopBarWrapper backgroundColor={props.backgroundColor}>
			<IonGrid>
				<IonRow style={{ marginBottom: '3%' }}>
					<IonCol>
						<TopBarInfoLarge textColor={props.textColor}>{formattedTime}</TopBarInfoLarge>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						<TopBarInfoText  textColor={props.textColor}>{props.runningStats.distanceLeft}km Left</TopBarInfoText>
					</IonCol>
					<IonCol>
						<TopBarInfoText  textColor={props.textColor}>{props.runningStats.distanceTravelled}km Passed</TopBarInfoText>
					</IonCol>
					<IonCol>
						<TopBarInfoText  textColor={props.textColor}>{props.runningStats.speed}km/h</TopBarInfoText>
					</IonCol>
				</IonRow>
			</IonGrid>
		</TopBarWrapper>
	);
};

export default TopBarInfo;
