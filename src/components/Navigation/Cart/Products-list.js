import React from 'react';
import PropTypes from 'prop-types';
import ProductInCart from './Product-in-cart';

const ProductsList = ({ isVisible, amountOfProducts }) => {
	return (
		<ul
			className={isVisible && amountOfProducts > 0 ? 'products-list is-visible' : 'products-list'}>
			<ProductInCart />
			<li className='products-list__sum'>
				SUMA
				<span>a</span>
			</li>
			<button type='button' className='products-list__clear-button'>
				wyczyść koszyk
			</button>
		</ul>
	);
};

ProductsList.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	amountOfProducts: PropTypes.number.isRequired,
};

export default ProductsList;
