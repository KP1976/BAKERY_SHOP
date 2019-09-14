import React, { useContext } from 'react';
import { TabsContext } from './context/tabsContext';

import ShopTab from './ShopTab';

const ShopTabs = () => {
	const [tabs, setActiveTab] = useContext(TabsContext);

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
		console.log(productCategory);
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
