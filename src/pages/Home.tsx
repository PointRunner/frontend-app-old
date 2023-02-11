import React from 'react';
import TopBar from '../components/layout/TopBar/TopBar';
import MapWrapper from '../components/layout/MapWrapper/MapWrapper';
import BottomBar from '../components/layout/BottomBar/BottomBar';
import MapController from '../components/control/MapController';

const Home: React.FC = () => {
	return (
		<>
			<TopBar />
			<MapController>
				<MapWrapper />
			</MapController>
			<BottomBar />
		</>
	);
};

export default Home;
