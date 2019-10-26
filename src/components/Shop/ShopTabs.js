import React, { useContext } from 'react';
import { useTabsValue } from './context/tabsContext';
import { useProductsValue } from './context/productsContext';
import { FirebaseContext } from '../../DataBase/firebase';

import ShopTab from './ShopTab';

const ShopTabs = () => {
	const productsFromDataBase = useContext(FirebaseContext);
	const [tabs, setActiveTab] = useTabsValue();
	const setProducts = useProductsValue();

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
				setProducts[1](newArray);
				break;
			}
			case productCategory: {
				const tab = newArray.filter(product => product.category === productCategory);
				setProducts[1](tab);
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
