import React from 'react';
import '../scss/abstracts/_mixins.scss';
// import '../scss/sections/_shop.scss';

const Shop = () => {
	return (
		<section className="shop" id="shop">
			<h2 className="shop__title">sklep</h2>
			<hr className="title-underline" />

			<ul className="search-tabs">
				<li className="search-tabs__item selected">Wszystko</li>
				<li className="search-tabs__item">Babeczki</li>
				<li className="search-tabs__item">Ciasta</li>
				<li className="search-tabs__item">Słodycze</li>
				<li className="search-tabs__item">Donaty</li>
			</ul>

			<div className="shop__products" />
		</section>
	);
};

export default Shop;
