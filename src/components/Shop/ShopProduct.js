import React from 'react';
import PropTypes from 'prop-types';

const ShopProduct = ({ category, name, price, imageIndex, imageAlt }) => {
	const importAll = r => r.keys().map(r);
	const smallSizeImages = importAll(require.context('../../img/products/small', false, /\.(png|jpe?g|svg)$/));
	const normalSizeImages = importAll(require.context('../../img/products/normal', false, /\.(png|jpe?g|svg)$/));

	return (
		<figure className='product' data-category={category}>
			<img
				className='product__image'
				srcSet={`${smallSizeImages[imageIndex]} 500w, ${normalSizeImages[imageIndex]} 1000w`}
				sizes='(max-width: 576px) 500px, (max-width: 992px) 1000px'
				src={smallSizeImages[imageIndex]}
				alt={imageAlt}
			/>
			<span className='product__amount'>0</span>
			<div className='product__shop-cart-box'>
				<i className='material-icons'>shopping_cart</i>
				<span className='plus-sign'>+</span>
			</div>
			<div className='product__description-box'>
				<span className='product__name'>{name}</span>
				<span className='product__price'>{price}</span>
			</div>
		</figure>
	);
};

ShopProduct.propTypes = {
	category: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	imageIndex: PropTypes.number.isRequired,
	imageAlt: PropTypes.string.isRequired,
};

export default ShopProduct;
