import React from 'react';
import PropTypes from 'prop-types';

const ProductInCart = ({ productName, productPrice, imageIndex, imageAlt }) => {
	const importAll = r => r.keys().map(r);
	const smallSizeImages = importAll(
		require.context('../../../img/products/small', false, /\.(png|jpe?g|svg)$/),
	);

	return (
		<>
			<li className='products-list__product'>
				<img
					src={smallSizeImages[imageIndex]}
					alt={imageAlt}
					className='products-list__picture'
				/>
				<span className='products-list__name'>{productName}</span>
				<span className='products-list__price'>
					{productPrice.toString().replace('.', ',')} zł
				</span>
				<span className='products-list__trash-can'>
					<i className='material-icons'>delete</i>
				</span>
			</li>
		</>
	);
};

ProductInCart.propTypes = {
	productName: PropTypes.string.isRequired,
	productPrice: PropTypes.number.isRequired,
	imageIndex: PropTypes.number.isRequired,
	imageAlt: PropTypes.string.isRequired,
};

export default ProductInCart;
