import React from 'react';
import RunningUpdater from '../components/control/RunningUpdater';

import LayoutController from '../components/layout/LayoutController/LayoutController';

const Home: React.FC = () => {
	return <>
	<RunningUpdater />
	<LayoutController />;
	</>
};

export default Home;
