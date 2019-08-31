import React, { useState, useEffect } from 'react';

import firebase from '../DataBase/firebase';
import ShopTabs from './ShopTabs';
import ShopProducts from './ShopProducts';

import '../scss/abstracts/_mixins.scss';

const Shop = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		firebase
			.firestore()
			.collection('produkty')
			.onSnapshot(snapshot => {
				const newProducts = snapshot.docs.map(doc => ({
					...doc.data(),
				}));
				setProducts(newProducts);
				localStorage.setItem('products', JSON.stringify(newProducts));
			});
	}, []);

	const filteredProducts = (tabCategory, tabActive) => {
		const newArray = JSON.parse(localStorage.getItem('products'));
		let filteredArray = [];

		if (!tabActive) {
			switch (tabCategory) {
				case 'Wszystko':
					setProducts(newArray);
					break;
				case 'Babeczki':
					filteredArray = newArray.filter(product => product.category === tabCategory);
					setProducts(filteredArray);
					break;
				case 'Ciasta':
					filteredArray = newArray.filter(product => product.category === tabCategory);
					setProducts(filteredArray);
					break;
				case 'Słodycze':
					filteredArray = newArray.filter(product => product.category === tabCategory);
					setProducts(filteredArray);
					break;
				case 'Donaty':
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
