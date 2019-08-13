import React from 'react';
import '../scss/abstracts/_mixins.scss';
import ShopProduct from './ShopProduct';

const Shop = () => {
	const searchTabs = ['Babeczki', 'Ciasta', 'Słodycze', 'Donaty'];

	return (
		<section className="shop" id="shop">
			<h2 className="shop__title">sklep</h2>
			<hr className="title-underline" />

			<ul className="search-tabs">
				<li className="search-tabs__item selected">Wszystko</li>
				{searchTabs.map(tab => {
					return (
						<li key={tab} className="search-tabs__item">
							{tab}
						</li>
					);
				})}
			</ul>

			<div className="shop__products">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map(product => {
					return <ShopProduct key={product} />;
				})}
				{/* <ShopProduct /> */}
			</div>
		</section>
	);
};

export default Shop;
