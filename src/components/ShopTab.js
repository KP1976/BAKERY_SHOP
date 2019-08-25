import React from 'react';
import PropTypes from 'prop-types';

const ShopTab = ({ tabName, activeTab, onClickTabItem }) => {
	return (
		<li>
			<div
				className={activeTab ? 'search-tabs__item selected' : 'search-tabs__item'}
				onClick={onClickTabItem}
				onKeyUp={onClickTabItem}
				tabIndex='0'
				role='button'>
				{tabName}
			</div>
		</li>
	);
};

ShopTab.propTypes = {
	tabName: PropTypes.string.isRequired,
	activeTab: PropTypes.bool.isRequired,
	onClickTabItem: PropTypes.func.isRequired,
};

export default ShopTab;
