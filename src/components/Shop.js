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

import citrusCupcake from '../img/citrus_cupcake.jpg';
import cheeseCake from '../img/cheese_cake.jpg';
import fruitCupcake from '../img/fruit_cupcake.jpg';
import citricCandy from '../img/citric_candy.jpg';
import meringue from '../img/meringue.jpg';
import raspberryCandy from '../img/raspberry_candy.jpg';
import cake from '../img/cake.jpg';
import opiumCake from '../img/opium_cake.jpg';
import donut from '../img/donut1.jpg';

import '../scss/abstracts/_mixins.scss';

const Shop = () => {
	const searchTabs = ['Babeczki', 'Ciasta', 'Słodycze', 'Donaty'];

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

	const images = {
		small: [
			citrusCupcakeSmall,
			cheeseCakeSmall,
			fruitCupcakeSmall,
			citricCandySmall,
			meringueSmall,
			raspberryCandySmall,
			cakeSmall,
			opiumCakeSmall,
			donutSmall,
		],
		large: [citrusCupcake, cheeseCake, fruitCupcake, citricCandy, meringue, raspberryCandy, cake, opiumCake, donut],
	};

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
						<img
							className='product__image'
							srcSet={`${images.small[index]} 500w, ${images.large[index]} 1000w`}
							sizes='(max-width: 576px) 500px, (max-width: 992px) 1000px'
							src={images.small[index]}
							alt={product.image.alt}
						/>
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
