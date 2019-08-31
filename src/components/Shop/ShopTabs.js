import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ShopTab from './ShopTab';

const ShopTabs = ({ filteredProducts }) => {
	const [tabs, setActiveTab] = useState([
		{ category: 'Wszystko', active: true },
		{ category: 'Babeczki', active: false },
		{ category: 'Ciasta', active: false },
		{ category: 'Słodycze', active: false },
		{ category: 'Donaty', active: false },
	]);

	const onClickTabItem = (index, tabActive) => () => {
		const newArray = [...tabs];

		newArray.map((tab, _index) => {
			const newTab = tab;

			newTab.active = index === _index ? (newTab.active = true) : (newTab.active = false);

			return newTab;
		});

		setActiveTab(newArray);

		const sendDataToParentAfterClick = () => {
			filteredProducts(tabs[index].category, tabActive);
		};

		sendDataToParentAfterClick();
	};

	return (
		<ul className='search-tabs'>
			{tabs.map((tab, index) => (
				<ShopTab
					key={tab.category}
					tabCategory={tab.category}
					activeTab={tab.active}
					onClickTabItem={onClickTabItem(index, tab.active)}
				/>
			))}
		</ul>
	);
};

ShopTabs.propTypes = {
	filteredProducts: PropTypes.func.isRequired,
};

export default ShopTabs;
