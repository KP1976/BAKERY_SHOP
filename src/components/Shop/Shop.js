import React from 'react';

import ShopTabs from './ShopTabs';
import ShopProducts from './ShopProducts';

import { FirebaseProvider } from '../../DataBase/firebase';
import { TabsProvider } from './context/tabsContext';
import { ProductsProvider } from './context/productsContext';

import '../../scss/abstracts/_mixins.scss';

const Shop = () => {
	return (
		<FirebaseProvider>
			<ProductsProvider>
				<section className='shop' id='shop'>
					<h2 className='shop__title'>sklep</h2>
					<hr className='title-underline' />
					<TabsProvider>
						<ShopTabs />
						<ShopProducts />
					</TabsProvider>
				</section>
			</ProductsProvider>
		</FirebaseProvider>
	);
};

export default Shop;
