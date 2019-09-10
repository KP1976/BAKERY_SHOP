import React from 'react';
import PropTypes from 'prop-types';

const ShopProduct = ({ amount, category, name, price, imageIndex, imageAlt, addProduct }) => {
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
			<span className={amount ? 'product__amount visible' : 'product__amount'}>{amount}</span>
			<div
				className='product__shop-cart-box'
				onClick={addProduct}
				onKeyUp={addProduct}
				role='button'
				tabIndex='0'>
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
	amount: PropTypes.number.isRequired,
	category: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	imageIndex: PropTypes.number.isRequired,
	imageAlt: PropTypes.string.isRequired,
	addProduct: PropTypes.func.isRequired,
};

export default ShopProduct;
