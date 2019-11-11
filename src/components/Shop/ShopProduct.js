import React from 'react';
import PropTypes from 'prop-types';
import { useProductsValue } from './context/productsContext';
import { useCartValue } from '../Navigation/context/cartContext';

const ShopProduct = ({
	amount,
	category,
	productName,
	productPrice,
	imageIndex,
	imageAlt,
	productId,
}) => {
	const importAll = r => r.keys().map(r);
	const smallSizeImages = importAll(
		require.context('../../img/products/small', false, /\.(png|jpe?g|svg)$/),
	);
	const normalSizeImages = importAll(
		require.context('../../img/products/normal', false, /\.(png|jpe?g|svg)$/),
	);

	const [products, setProducts] = useProductsValue();
	const [
		amountOfAllProducts,
		setAmountOfAllProducts,
		,
		setTextProducts,
		totalPriceOfAllProducts,
		setTotalPriceOfAllProducts,
		listOfProducts,
		setListOfProducts,
	] = useCartValue();

	const displayCorrectSumOfProducts = amountOfProducts => {
		switch (amountOfProducts) {
			case 1:
				setTextProducts('produkt – ');
				break;
			case 2:
			case 3:
			case 4:
				setTextProducts('produkty – ');
				break;
			default:
				setTextProducts('produktów – ');
				break;
		}
	};

	const addProduct = _productName => () => {
		const addedAmountOfProduct = amount + 1;
		const totalPrice = totalPriceOfAllProducts + productPrice;
		const newProducts = [...products];
		const newListOfProductsInCart = listOfProducts;

		newListOfProductsInCart.push({
			productName,
			productPrice,
			imageIndex,
			imageAlt,
			productId,
		});

		setListOfProducts(newListOfProductsInCart);

		newProducts.map(product => {
			if (product.name === _productName) {
				const _product = product;
				_product.amount = addedAmountOfProduct;
			}
			return product;
		});

		setTotalPriceOfAllProducts(totalPrice);
		setProducts(newProducts);
		setAmountOfAllProducts(amountOfAllProducts + 1);

		displayCorrectSumOfProducts(amountOfAllProducts + 1);
	};

	return (
		<figure className='product' data-category={category}>
			<img
				className='product__image'
				srcSet={`${smallSizeImages[imageIndex]} 500w, ${normalSizeImages[imageIndex]} 1000w`}
				sizes='(max-width: 576px) 500px, (max-width: 992px) 1000px'
				src={smallSizeImages[imageIndex]}
				alt={imageAlt}
			/>
			<span className={amount ? 'product__amount visible' : 'product__amount'}>
				{amount}
			</span>
			<div
				className='product__shop-cart-box'
				role='button'
				tabIndex='0'
				onClick={addProduct(productName)}
				onKeyPress={addProduct(productName)}>
				<i className='material-icons'>shopping_cart</i>
				<span className='plus-sign'>+</span>
			</div>
			<div className='product__description-box'>
				<span className='product__name'>{productName}</span>
				<span className='product__price'>
					{productPrice.toString().replace('.', ',')} zł
				</span>
			</div>
		</figure>
	);
};

ShopProduct.propTypes = {
	amount: PropTypes.number.isRequired,
	category: PropTypes.string.isRequired,
	productName: PropTypes.string.isRequired,
	productPrice: PropTypes.number.isRequired,
	imageIndex: PropTypes.number.isRequired,
	imageAlt: PropTypes.string.isRequired,
	productId: PropTypes.string.isRequired,
};

export default ShopProduct;
