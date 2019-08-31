import React, { useState, useEffect } from 'react';

import firebase from '../../DataBase/firebase';
import ShopTabs from './ShopTabs';
import ShopProducts from './ShopProducts';

import '../../scss/abstracts/_mixins.scss';

const Shop = () => {
	const [products, setProducts] = useState([]);
	const [initialProducts, setInitialProducts] = useState(products);

	useEffect(() => {
		firebase
			.firestore()
			.collection('produkty')
			.onSnapshot(snapshot => {
				const newProducts = snapshot.docs.map(doc => ({
					...doc.data(),
				}));
				setProducts(newProducts);
				setInitialProducts(newProducts);
			});
	}, []);

	const filteredProducts = (tabCategory, tabActive) => {
		const newArray = [...initialProducts];
		let filteredArray = [];

		if (!tabActive) {
			switch (tabCategory) {
				case 'Wszystko':
					setProducts(newArray);
					break;
				case tabCategory:
					filteredArray = newArray.filter(product => product.category === tabCategory);
					setProducts(filteredArray);
					break;
				default:
					break;
			}
		}
	};

	return (
		<section className='shop' id='shop'>
			<h2 className='shop__title'>sklep</h2>
			<hr className='title-underline' />
			<ShopTabs filteredProducts={filteredProducts} />
			<ShopProducts products={products} />
		</section>
	);
};

export default Shop;
