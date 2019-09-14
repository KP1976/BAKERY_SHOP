import React, { createContext } from 'react';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';

const config = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
	projectId: 'bakery-shop-5457e',
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const FireBaseContext = createContext(null);

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

export const FirebaseProvider = ({ children }) => {
	return <FireBaseContext.Provider value={firebase}>{children}</FireBaseContext.Provider>;
};

FirebaseProvider.propTypes = {
	children: PropTypes.object.isRequired,
};

// export { FireBaseContext };

// export default ({ children }) => {
// 	if( !firebase.apps.length) {
// 		firebase.initializeApp(config)
// 	}

// 	return (
// 		<FireBaseContext.Provider value={ firebase }>
// 			{ children }
// 		</FireBaseContext.Provider>
// 	)
// }

// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const config = {
// 	apiKey: process.env.REACT_APP_FIREBASE_KEY,
// 	authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
// 	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
// 	projectId: 'bakery-shop-5457e',
// 	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
// 	appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

// firebase.initializeApp(config);

// export default firebase;
