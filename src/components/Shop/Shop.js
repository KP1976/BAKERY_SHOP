import React from 'react';

import ShopTabs from './ShopTabs';
// import ShopProducts from './ShopProducts';

import { FirebaseProvider } from '../../DataBase/firebase';
import { TabsProvider } from './context/tabsContext';

import '../../scss/abstracts/_mixins.scss';

const Shop = () => {
	return (
		<FirebaseProvider>
			<section className='shop' id='shop'>
				<h2 className='shop__title'>sklep</h2>
				<hr className='title-underline' />
				<TabsProvider>
					<ShopTabs />
					{/* <ShopProducts /> */}
				</TabsProvider>
			</section>
		</FirebaseProvider>
	);
};

export default Shop;
// import React, { useState, useEffect } from 'react';

// import firebase from '../../DataBase/firebase';
// import ShopTabs from './ShopTabs';
// import ShopProducts from './ShopProducts';

// import '../../scss/abstracts/_mixins.scss';

// const Shop = () => {
// 	const [productsFromDataBase, setProductsFromDataBase] = useState([]);
// 	const [products, setProducts] = useState([]);

// 	useEffect(() => {
// 		firebase
// 			.firestore()
// 			.collection('produkty')
// 			.onSnapshot(snapshot => {
// 				const newProducts = snapshot.docs.map(doc => ({
// 					...doc.data(),
// 				}));
// 				setProductsFromDataBase(newProducts);
// 				setProducts(newProducts);
// 			});
// 	}, []);

// 	const showProductsDependsOnTabs = tabCategory => {
// 		const newArray = [...productsFromDataBase];
// 		setProducts(newArray);

// 		switch (tabCategory) {
// 			case 'Wszystko': {
// 				setProducts(newArray);
// 				break;
// 			}
// 			case tabCategory: {
// 				const tab = newArray.filter(product => product.category === tabCategory);
// 				setProducts(tab);
// 				break;
// 			}
// 			default:
// 				break;
// 		}
// 	};

// 	return (
// 		<section className='shop' id='shop'>
// 			<h2 className='shop__title'>sklep</h2>
// 			<hr className='title-underline' />
// 			<ShopTabs showProductsDependsOnTabs={showProductsDependsOnTabs} />
// 			<ShopProducts products={products} />
// 		</section>
// 	);
// };

// export default Shop;
