import React from 'react';
import PropTypes from 'prop-types';

const ShopProduct = ({ amount, category, productName, productPrice, imageIndex, imageAlt }) => {
	const importAll = r => r.keys().map(r);
	const smallSizeImages = importAll(
		require.context('../../img/products/small', false, /\.(png|jpe?g|svg)$/),
	);
	const normalSizeImages = importAll(
		require.context('../../img/products/normal', false, /\.(png|jpe?g|svg)$/),
	);

	return (
		<figure className='product' data-category={category}>
			<img
				className='product__image'
				srcSet={`${smallSizeImages[imageIndex]} 500w, ${normalSizeImages[imageIndex]} 1000w`}
				sizes='(max-width: 576px) 500px, (max-width: 992px) 1000px'
				src={smallSizeImages[imageIndex]}
				alt={imageAlt}
			/>
			<span className='product__amount'>{amount}</span>
			<div className='product__shop-cart-box' role='button' tabIndex='0'>
				<i className='material-icons'>shopping_cart</i>
				<span className='plus-sign'>+</span>
			</div>
			<div className='product__description-box'>
				<span className='product__name'>{productName}</span>
				<span className='product__price'>{productPrice}</span>
			</div>
		</figure>
	);
};

ShopProduct.propTypes = {
	amount: PropTypes.number.isRequired,
	category: PropTypes.string.isRequired,
	productName: PropTypes.string.isRequired,
	productPrice: PropTypes.string.isRequired,
	imageIndex: PropTypes.number.isRequired,
	imageAlt: PropTypes.string.isRequired,
};

export default ShopProduct;
