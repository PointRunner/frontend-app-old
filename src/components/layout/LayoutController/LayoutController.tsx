import { useRecoilValue } from 'recoil';
import { layoutDisplayMode } from '../../../utils/State';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import MapController from '../../control/MapController';
import BottomBar from '../BottomBar/BottomBar';
import MapWrapper from '../MapWrapper/MapWrapper';
import TopBar from '../TopBar/TopBar';
import styled from 'styled-components';

const StyleTransitionContainer = styled.div`
	.layout-element-top-enter {
		opacity: 0.01;
		transform: translate(0, 100px);
	}

	.layout-element-top-enter-active {
		opacity: 1;
		transform: translate(0, 0);
		transition: all 300ms ease;
	}

	.layout-element-top-exit {
		opacity: 0.01;
		transform: translate(0, 0);
		transition: all 300ms ease;
	}
	.layout-element-top-exit-active {
		opacity: 0.01;
		transform: translate(0, 100px);
		transition: all 300ms ease;
	}
`;

const LayoutController = () => {
	const layoutDisplayModeState = useRecoilValue(layoutDisplayMode);
	return (
		<>
			<TransitionGroup component={StyleTransitionContainer}>
				<CSSTransition
					in={layoutDisplayModeState !== 'running'}
					timeout={500}
					classNames="layout-element-top"
				>
					<TopBar />
				</CSSTransition>
			</TransitionGroup>
			<MapController>
				<MapWrapper />
			</MapController>
			<BottomBar menuDisplayMode={layoutDisplayModeState} />
		</>
	);
};

export default LayoutController;
