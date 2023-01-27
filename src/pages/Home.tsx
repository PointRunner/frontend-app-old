import React from 'react';
import TopBar from '../components/layout/TopBar/TopBar';
import Map from '../components/layout/MapWrapper/MapWrapper'
import BottomBar from '../components/layout/BottomBar/BottomBar';

const Home: React.FC = () => {
	return (
		<>
			<TopBar />
			<Map />
			<BottomBar />
		</>
	);
};

export default Home;
