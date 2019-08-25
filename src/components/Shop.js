import React, { useState, useEffect } from 'react';

import firebase from '../DataBase/firebase';
import ShopTab from './ShopTab';
import ShopProduct from './ShopProduct';

import '../scss/abstracts/_mixins.scss';

const Shop = () => {
	const [products, setProducts] = useState([]);
	const [tabs, setActiveTab] = useState([
		{ name: 'Wszystko', active: true },
		{ name: 'Babeczki', active: false },
		{ name: 'Ciasta', active: false },
		{ name: 'Słodycze', active: false },
		{ name: 'Donaty', active: false },
	]);

	useEffect(() => {
		firebase
			.firestore()
			.collection('produkty')
			.onSnapshot(snapshot => {
				const newProducts = snapshot.docs.map(doc => ({
					...doc.data(),
				}));

				setProducts(newProducts);
			});
	}, []);

	const onClickTabItem = index => () => {
		const newArray = [...tabs];

		newArray.map((tab, _index) => {
			const newTab = tab;

			newTab.active = index === _index ? (newTab.active = true) : (newTab.active = false);

			return newTab;
		});

		setActiveTab(newArray);
	};

	return (
		<section className='shop' id='shop'>
			<h2 className='shop__title'>sklep</h2>
			<hr className='title-underline' />
			<ul className='search-tabs'>
				{tabs.map((tab, index) => (
					<ShopTab key={tab.name} tabName={tab.name} activeTab={tab.active} onClickTabItem={onClickTabItem(index)} />
				))}
			</ul>

			<div className='shop__products'>
				{products.map((product, index) => (
					<ShopProduct
						key={product.name}
						imageIndex={index}
						name={product.name}
						category={product.category}
						price={product.price}
						imageAlt={product.image.alt}
					/>
				))}
			</div>
		</section>
	);
};

export default Shop;
