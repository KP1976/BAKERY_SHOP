import React from 'react';

import ShopTabs from './ShopTabs';
import ShopProducts from './ShopProducts';

import { TabsProvider } from './context/tabsContext';

import '../../scss/abstracts/_mixins.scss';

const Shop = () => {
	return (
		<section className='shop' id='shop'>
			<h2 className='shop__title'>sklep</h2>
			<hr className='title-underline' />
			<TabsProvider>
				<ShopTabs />
				<ShopProducts />
			</TabsProvider>
		</section>
	);
};

export default Shop;
