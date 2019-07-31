import React from 'react';
import NavBar from './components/Navigation/Navbar';
import navStyles from './components/Navigation/nav.module.scss';

const App = () => {
	return (
		<nav className={navStyles.nav}>
			<NavBar />
		</nav>
	);
};

export default App;
