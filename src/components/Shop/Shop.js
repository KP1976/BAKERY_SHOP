import React, { useState, useEffect } from 'react';

import firebase from '../../DataBase/firebase';
import ShopTabs from './ShopTabs';
import ShopProducts from './ShopProducts';

import { ProductCategoryTabsProvider } from '../../contexts/productCategoryTabsContext';
import { ProductsProvider } from '../../contexts/productsContext';

import '../../scss/abstracts/_mixins.scss';

const Shop = () => {
	const [initialProducts, setInitialProducts] = useState([]);
	const initialTabs = [
		{ category: 'Wszystko', active: true },
		{ category: 'Babeczki', active: false },
		{ category: 'Ciasta', active: false },
		{ category: 'Słodycze', active: false },
		{ category: 'Donaty', active: false },
	];

	useEffect(() => {
		firebase
			.firestore()
			.collection('produkty')
			.onSnapshot(snapshot => {
				const newProducts = snapshot.docs.map(doc => ({
					...doc.data(),
				}));
				setInitialProducts(newProducts);
			});
	}, []);

	return (
		<ProductsProvider value={initialProducts}>
			<ProductCategoryTabsProvider value={initialTabs}>
				<section className='shop' id='shop'>
					<h2 className='shop__title'>sklep</h2>
					<hr className='title-underline' />
					<ShopTabs />
					<ShopProducts />
				</section>
			</ProductCategoryTabsProvider>
		</ProductsProvider>
	);
};

export default Shop;

// const Shop = () => {
// 	const [products, setProducts] = useState([]);
// 	const [initialProducts, setInitialProducts] = useState(products);
// 	const initialTabs = [
// 		{ category: 'Wszystko', active: true },
// 		{ category: 'Babeczki', active: false },
// 		{ category: 'Ciasta', active: false },
// 		{ category: 'Słodycze', active: false },
// 		{ category: 'Donaty', active: false },
// 	];

// 	useEffect(() => {
// 		firebase
// 			.firestore()
// 			.collection('produkty')
// 			.onSnapshot(snapshot => {
// 				const newProducts = snapshot.docs.map(doc => ({
// 					...doc.data(),
// 				}));
// 				setProducts(newProducts);
// 				setInitialProducts(newProducts);
// 			});
// 	}, []);

// 	const filteredProducts = (tabCategory, tabActive) => {
// 		const newArray = [...initialProducts];
// 		let filteredArray = [];

// 		if (!tabActive) {
// 			switch (tabCategory) {
// 				case 'Wszystko':
// 					setProducts(newArray);
// 					break;
// 				case tabCategory:
// 					filteredArray = newArray.filter(product => product.category === tabCategory);
// 					setProducts(filteredArray);
// 					break;
// 				default:
// 					break;
// 			}
// 		}
// 	};

// 	return (
// 		<ProductsProvider value={initialProducts}>
// 			<ProductCategoryTabsProvider value={initialTabs}>
// 				<section className='shop' id='shop'>
// 					<h2 className='shop__title'>sklep</h2>
// 					<hr className='title-underline' />
// 					<ShopTabs filteredProducts={filteredProducts} />
// 					<ShopProducts products={products} />
// 				</section>
// 			</ProductCategoryTabsProvider>
// 		</ProductsProvider>
// 	);
// };

// export default Shop;
