import React, { Fragment } from 'react';

// Komponenty
import NavBar from './components/Navigation/Navbar';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import Shop from './components/Shop/Shop';
import Footer from './components/Footer';

import { FirebaseProvider } from './DataBase/firebase';
import { ProductsProvider } from './components/Shop/context/productsContext';
import { TabsProvider } from './components/Shop/context/tabsContext';
import { CartProvider } from './components/Navigation/context/cartContext';

import './scss/main.scss';

const App = () => {
	return (
		<Fragment>
			<FirebaseProvider>
				<ProductsProvider>
					<TabsProvider>
						<CartProvider>
							<nav>
								<NavBar />
							</nav>
							<Header />
							<AboutUs />
							<Shop />
							<Footer />
						</CartProvider>
					</TabsProvider>
				</ProductsProvider>
			</FirebaseProvider>
		</Fragment>
	);
};

export default App;
