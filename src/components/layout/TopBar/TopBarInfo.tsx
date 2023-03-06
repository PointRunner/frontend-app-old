import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IRunningStats } from '../../../utils/interfaces/interfaces.d';
import variables from '../../../variables';

interface TopBarInfoVisualProps {
	textColor?: string;
	backgroundColor?: string;
}

interface TopBarInfoProps extends TopBarInfoVisualProps {
	runningStats: IRunningStats;
}

const TopBarInfoText = styled.div<TopBarInfoVisualProps>`
	text-align: center;
	font-size: clamp(12px, 3vw, 24px);
	color: ${(props) => props.textColor || 'black'};
`;

const TopBarInfoLarge = styled(TopBarInfoText)`
	font-size: 200%;
`;

const TopBarInfoTextSmall = styled(TopBarInfoText)`
	font-size: 75%;
`

const TopBarWrapper = styled.div<TopBarInfoVisualProps>`
	margin: auto;
	width: 90%;
	background: ${(props) => props.backgroundColor || variables.menuBackgroundColor};
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
			const hours = Math.floor(seconds / 3600)
				.toString()
				.padStart(2, '0');
			seconds %= 3600;
			const minutes = Math.floor(seconds / 60)
				.toString()
				.padStart(2, '0');
			seconds %= 60;
			const finalSeconds = seconds.toString().padStart(2, '0');
			const clockFormattedTime = `${hours}:${minutes}:${finalSeconds}`;
			setFormattedTime(clockFormattedTime);
		};
		formatSecondsToClock();
	}, [props.runningStats.secondsElapsed]);

	return (
		<TopBarWrapper backgroundColor={props.backgroundColor}>
			<IonGrid>
				<IonRow style={{ marginBottom: '3%' }}>
					<IonCol>
						<TopBarInfoLarge textColor={props.textColor}>
							{(props.runningStats.distanceTravelled / 1000).toFixed(2)}km
						</TopBarInfoLarge>
						<TopBarInfoTextSmall textColor={props.textColor}>
							{props.runningStats.speed.toFixed(1)}km/h
						</TopBarInfoTextSmall>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						<TopBarInfoText textColor={props.textColor}>{formattedTime}</TopBarInfoText>
					</IonCol>
					<IonCol>
						<TopBarInfoText textColor={props.textColor}>
							{(props.runningStats.distanceLeft / 1000).toFixed(2)}km Left
						</TopBarInfoText>
					</IonCol>
				</IonRow>
			</IonGrid>
		</TopBarWrapper>
	);
};

export default TopBarInfo;
