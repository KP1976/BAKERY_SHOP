import React, { useContext, useEffect } from 'react';
import { TabsContext } from './context/tabsContext';
import { ProductsContext } from './context/productsContext';
import { FirebaseContext } from '../../DataBase/firebase';

import ShopTab from './ShopTab';

const ShopTabs = () => {
	const productsFromDataBase = useContext(FirebaseContext);
	const [tabs, setActiveTab] = useContext(TabsContext);
	const [products, setProducts] = useContext(ProductsContext);

	const changeActiveTab = indexOfClickedTab => {
		const copyOfinitialTabs = [...tabs];

		copyOfinitialTabs.map((tab, index) => {
			const _tab = tab;
			if (indexOfClickedTab === index) {
				_tab.active = true;
			} else {
				_tab.active = false;
			}
			return _tab;
		});
		return copyOfinitialTabs;
	};

	const showProductsDependsOnTabs = productCategory => {
		const newArray = [...productsFromDataBase];

		switch (productCategory) {
			case 'Wszystko': {
				setProducts(newArray);
				break;
			}
			case productCategory: {
				const tab = newArray.filter(product => product.category === productCategory);
				setProducts(tab);
				break;
			}
			default:
				break;
		}
	};

	const onClickTabItem = index => () => {
		const newArray = changeActiveTab(index);

		setActiveTab(newArray);
		showProductsDependsOnTabs(newArray[index].category);
	};

	return (
		<ul className='search-tabs'>
			{tabs.map((tab, index) => (
				<ShopTab
					key={tab.category}
					tabCategory={tab.category}
					activeTab={tab.active}
					onClickTabItem={onClickTabItem(index)}
				/>
			))}
		</ul>
	);
};

export default ShopTabs;
