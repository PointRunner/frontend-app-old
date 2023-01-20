import React from 'react';
import BottomBar from '../components/layout/BottomBar/BottomBar';
import TopBar from '../components/layout/TopBar/TopBar';
import Map from '../components/layout/MapWrapper/MapWrapper'

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
