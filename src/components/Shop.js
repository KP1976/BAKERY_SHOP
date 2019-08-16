import React, { useState, useEffect } from 'react';

import firebase from './DataBase/firebase';

import citrusCupcakeSmall from '../img/citrus_cupcake_small.jpg';
import cheeseCakeSmall from '../img/cheese_cake_small.jpg';
import fruitCupcakeSmall from '../img/fruit_cupcake_small.jpg';
import citricCandySmall from '../img/citric_candy_small.jpg';
import meringueSmall from '../img/meringue_small.jpg';
import raspberryCandySmall from '../img/raspberry_candy_small.jpg';
import cakeSmall from '../img/cake_small.jpg';
import opiumCakeSmall from '../img/opium_cake_small.jpg';
import donutSmall from '../img/donut1_small.jpg';

import '../scss/abstracts/_mixins.scss';

const useProducts = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		firebase
			.firestore()
			.collection('produkty')
			.onSnapshot(snapshot => {
				const newProduct = snapshot.docs.map(doc => ({
					...doc.data(),
				}));

				setProducts(newProduct);
			});
	}, []);
	return products;
};

const Shop = () => {
	const searchTabs = ['Babeczki', 'Ciasta', 'Słodycze', 'Donaty'];

	const products = useProducts();

	const images = [
		citrusCupcakeSmall,
		cheeseCakeSmall,
		fruitCupcakeSmall,
		citricCandySmall,
		meringueSmall,
		raspberryCandySmall,
		cakeSmall,
		opiumCakeSmall,
		donutSmall,
	];

	console.log('public url: ', process.env.PUBLIC_URL);

	return (
		<section className='shop' id='shop'>
			<h2 className='shop__title'>sklep</h2>
			<hr className='title-underline' />
			<ul className='search-tabs'>
				<li className='search-tabs__item selected'>Wszystko</li>
				{searchTabs.map(tab => {
					return (
						<li key={tab} className='search-tabs__item'>
							{tab}
						</li>
					);
				})}
			</ul>

			<div className='shop__products'>
				{products.map((product, index) => (
					<figure className='product' data-category={product.category} key={product.name}>
						<img className='product__image' src={images[index]} alt={product.image.alt} />
						<span className='product__amount'>0</span>
						<div className='product__shop-cart-box'>
							<i className='material-icons'>shopping_cart</i>
							<span className='plus-sign'>+</span>
						</div>
						<div className='product__description-box'>
							<span className='product__name'>{product.name}</span>
							<span className='product__price'>{product.price}</span>
						</div>
					</figure>
				))}
			</div>
		</section>
	);
};

export default Shop;
