import React, { useState, useEffect } from 'react';

import firebase from './DataBase/firebase';

import '../scss/abstracts/_mixins.scss';

const Shop = () => {
	const searchTabs = ['Babeczki', 'Ciasta', 'Słodycze', 'Donaty'];

	const [products, setProducts] = useState([]);

	const importAll = r => r.keys().map(r);
	const smallSizeImages = importAll(require.context('../img/products/small', false, /\.(png|jpe?g|svg)$/));
	const normalSizeImages = importAll(require.context('../img/products/normal', false, /\.(png|jpe?g|svg)$/));

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
							srcSet={`${smallSizeImages[index]} 500w, ${normalSizeImages[index]} 1000w`}
							sizes='(max-width: 576px) 500px, (max-width: 992px) 1000px'
							src={smallSizeImages[index]}
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
