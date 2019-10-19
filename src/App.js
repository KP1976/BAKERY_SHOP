import React, { Fragment } from 'react';

// Komponenty
import NavBar from './components/Navigation/Navbar';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import Shop from './components/Shop/Shop';
import Footer from './components/Footer';

import { CartProvider } from './components/Navigation/context/cartContext';

import './scss/main.scss';

const App = () => {
	return (
		<Fragment>
			<CartProvider>
				<nav>
					<NavBar />
				</nav>
				<Header />
				<AboutUs />
				<Shop />
				<Footer />
			</CartProvider>
		</Fragment>
	);
};

export default App;
