import React from 'react';
import PropTypes from 'prop-types';
import ProductInCart from './Product-in-cart';
import { useCartValue } from '../context/cartContext';

const ProductsList = ({
	isVisible,
	amountOfProducts,
	totalPriceOfAllProducts,
}) => {
	const listOfProducts = useCartValue()[6];

	return (
		<ul
			className={
				isVisible && amountOfProducts > 0
					? 'products-list is-visible'
					: 'products-list'
			}>
			{listOfProducts &&
				listOfProducts.map(product => (
					<ProductInCart
						key={product.productId}
						productName={product.productName}
						productPrice={product.productPrice}
						imageIndex={product.imageIndex}
						imageAlt={product.imageAlt}
					/>
				))}

			<li className='products-list__sum'>
				SUMA
				<span>{totalPriceOfAllProducts.toString().replace('.', ',')} zł</span>
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
	totalPriceOfAllProducts: PropTypes.number.isRequired,
};

export default ProductsList;
