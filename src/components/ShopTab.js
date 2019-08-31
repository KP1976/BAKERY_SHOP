import React from 'react';
import PropTypes from 'prop-types';

const ShopTab = ({ tabCategory, activeTab, onClickTabItem }) => {
	return (
		<li>
			<div
				className={activeTab ? 'search-tabs__item selected' : 'search-tabs__item'}
				onClick={onClickTabItem}
				onKeyUp={onClickTabItem}
				tabIndex='0'
				role='button'>
				{tabCategory}
			</div>
		</li>
	);
};

ShopTab.propTypes = {
	tabCategory: PropTypes.string.isRequired,
	activeTab: PropTypes.bool.isRequired,
	onClickTabItem: PropTypes.func.isRequired,
};

export default ShopTab;
