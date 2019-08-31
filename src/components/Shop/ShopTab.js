import React from 'react';
import PropTypes from 'prop-types';

const ShopTab = ({ tabCategory, activeTab, onClickTabItem }) => {
	return (
		<li>
			<button
				className={activeTab ? 'search-tabs__item selected' : 'search-tabs__item'}
				type='button'
				onClick={onClickTabItem}
				onKeyUp={onClickTabItem}
				tabIndex='0'>
				{tabCategory}
			</button>
		</li>
	);
};

ShopTab.propTypes = {
	tabCategory: PropTypes.string.isRequired,
	activeTab: PropTypes.bool.isRequired,
	onClickTabItem: PropTypes.func.isRequired,
};

export default ShopTab;
