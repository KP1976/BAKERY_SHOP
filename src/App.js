import React, { Fragment } from 'react';
import NavBar from './components/Navigation/Navbar';
import Header from './components/Header';
import AboutUs from './components/AboutUs';

const App = () => {
	return (
		<Fragment>
			<nav>
				<NavBar />
			</nav>
			<Header />
			<AboutUs />
		</Fragment>
	);
};

export default App;
