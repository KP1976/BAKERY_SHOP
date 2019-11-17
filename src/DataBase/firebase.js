import React, { createContext, useState, useEffect } from 'react';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';

import 'firebase/firestore';

const config = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
	projectId: 'bakery-shop-5457e',
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const FirebaseContext = createContext();

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

export const FirebaseProvider = ({ children }) => {
	const [productsFromDataBase, setProductsFromDataBase] = useState([]);

	useEffect(() => {
		firebase
			.firestore()
			.collection('produkty')
			.onSnapshot(snapshot => {
				const newProducts = snapshot.docs.map(doc => ({
					...doc.data(),
				}));
				setProductsFromDataBase(newProducts);
			});
	}, []);

	return (
		<FirebaseContext.Provider
			value={[productsFromDataBase, setProductsFromDataBase]}>
			{children}
		</FirebaseContext.Provider>
	);
};

FirebaseProvider.propTypes = {
	children: PropTypes.object.isRequired,
};
