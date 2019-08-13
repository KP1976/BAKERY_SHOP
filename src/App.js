import React, { Fragment } from 'react';
import * as firebase from 'firebase/app';

// import "firebase/auth";
import 'firebase/firestore';

import NavBar from './components/Navigation/Navbar';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import Shop from './components/Shop';

import './scss/main.scss';

firebase.initializeApp({
	apiKey: 'AIzaSyDGAyftLCspEF-3gm0RJ1-3QlqIx6Dfg4o',
	authDomain: 'bakery-shop-5457e.firebaseapp.com',
	databaseURL: 'https://bakery-shop-5457e.firebaseio.com',
	projectId: 'bakery-shop-5457e',
	storageBucket: 'bakery-shop-5457e.appspot.com',
	messagingSenderId: '1009026750919',
	appId: '1:1009026750919:web:798e2def54d149d2'
});

const db = firebase.firestore();

const addAllProductsToDOM = async () => {
	const produkty = await db.collection('produkty').get();
	produkty.forEach(produkt => console.log(produkt.data()));
};

addAllProductsToDOM();

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
