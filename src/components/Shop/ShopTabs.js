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

	const onClickTabItem = index => () => {
		console.log(index);
		const newArray = changeActiveTab(index);

		setActiveTab(newArray);
		// showProductsDependsOnTabs(newArray[index].category);
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

// import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// import ShopTab from './ShopTab';

// const ShopTabs = ({ showProductsDependsOnTabs }) => {
// 	const [tabs, setActiveTab] = useState([
// 		{ category: 'Wszystko', active: true },
// 		{ category: 'Babeczki', active: false },
// 		{ category: 'Ciasta', active: false },
// 		{ category: 'Słodycze', active: false },
// 		{ category: 'Donaty', active: false },
// 	]);

// 	const changeActiveTab = indexOfClickedTab => {
// 		const copyOfinitialTabs = [...tabs];

// 		copyOfinitialTabs.map((tab, index) => {
// 			const _tab = tab;
// 			if (indexOfClickedTab === index) {
// 				_tab.active = true;
// 			} else {
// 				_tab.active = false;
// 			}
// 			return _tab;
// 		});
// 		return copyOfinitialTabs;
// 	};

// 	const onClickTabItem = index => () => {
// 		const newArray = changeActiveTab(index);

// 		setActiveTab(newArray);
// 		showProductsDependsOnTabs(newArray[index].category);
// 	};

// 	return (
// 		<ul className='search-tabs'>
// 			{tabs.map((tab, index) => (
// 				<ShopTab
// 					key={tab.category}
// 					tabCategory={tab.category}
// 					activeTab={tab.active}
// 					onClickTabItem={onClickTabItem(index)}
// 				/>
// 			))}
// 		</ul>
// 	);
// };

// ShopTabs.propTypes = {
// 	showProductsDependsOnTabs: PropTypes.func.isRequired,
// };

// export default ShopTabs;
