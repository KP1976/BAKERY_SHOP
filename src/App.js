import React, { Fragment } from 'react';
import NavBar from './components/Navigation/Navbar';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import Shop from './components/Shop';

import './scss/main.scss';

const App = () => {
	return (
		<Fragment>
			<nav>
				<NavBar />
			</nav>
			<Header />
			<AboutUs />
			<Shop />
		</Fragment>
	);
};

export default App;
