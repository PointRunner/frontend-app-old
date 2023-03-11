import { BottomBarIconButton } from '../Styles.BottomBar';
import RandomIconUrl from '../../../../assets/images/UI/random.png';
import PinpointIconUrl from '../../../../assets/images/UI/map-pin.png';
import {
	BottomBarButtonWrapper,
	BottomBarCenterTextButton,
	BottomBarDefaultButtons,
} from './Styles.Default';
import { useRecoilValue } from 'recoil';
import { runningFunctions } from '../../../../utils/State';
import ModalBase from '../../modals/ModalBase';
import RandomPointModal from '../../modals/RandomPointModal/RandomPointModal';
import { useRef } from 'react';

const Default = (props: {
	buttonClickHandler: (buttonElementId: string, callback?: () => void) => void;
	isPointSet: boolean;
}) => {
	const globalRunningFunctions = useRecoilValue(runningFunctions);

	const modalRef = useRef<HTMLIonModalElement>(null);

	const closeModal = () => {
		modalRef.current?.dismiss();
	}

	return (
		<>
			<BottomBarDefaultButtons>
				<BottomBarButtonWrapper size="2">
					<BottomBarIconButton
						id="select-point"
						onClick={() => props.buttonClickHandler('select-point')}
					>
						<img src={PinpointIconUrl} alt="Select Point" />
					</BottomBarIconButton>
				</BottomBarButtonWrapper>
				<BottomBarButtonWrapper size="8">
					<BottomBarCenterTextButton
						id="start-running"
						onClick={() =>
							props.buttonClickHandler('start-running', globalRunningFunctions.start)
						}
						disabled={!props.isPointSet}
					>
						Start Running!
					</BottomBarCenterTextButton>
				</BottomBarButtonWrapper>
				<BottomBarButtonWrapper size="2">
					<BottomBarIconButton
						id="random-point"
						onClick={() => {}}
					>
						<img src={RandomIconUrl} alt="Random Point" />
					</BottomBarIconButton>
				</BottomBarButtonWrapper>
			</BottomBarDefaultButtons>
			<ModalBase modalRef={modalRef} title="Random" modalOpenerButtonId='random-point'>
				<RandomPointModal closingFunction={closeModal} />
			</ModalBase>
		</>
	);
};

export default Default;
