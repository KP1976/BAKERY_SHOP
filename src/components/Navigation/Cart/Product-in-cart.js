import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useCartValue } from '../context/cartContext';
import { useProductsValue } from '../../Shop/context/productsContext';
import { FirebaseContext } from '../../../DataBase/firebase';

const ProductInCart = ({
	productId,
	productIdInCart,
	productName,
	productPrice,
	imageIndex,
	imageAlt,
}) => {
	const importAll = r => r.keys().map(r);
	const smallSizeImages = importAll(
		require.context('../../../img/products/small', false, /\.(png|jpe?g|svg)$/),
	);

	const [
		amountOfProducts,
		setAmountOfProducts,
		,
		,
		totalPriceOfAllProducts,
		setTotalPriceOfAllProducts,
		listOfProducts,
		setListOfProducts,
	] = useCartValue();

	const productsFromDataBase = useContext(FirebaseContext);
	const [products, setProducts] = useProductsValue();

	const clearProductFromCart = (idInCart, id, price) => () => {
		const oldProducts = [...products];
		const newProducts = [...productsFromDataBase];
		const filteredListOfProducts = listOfProducts.filter(
			product => product.productIdInCart !== idInCart,
		);
		const updatedTotalPrice = totalPriceOfAllProducts - price;
		const updatedamountOfProducts = amountOfProducts - 1;

		newProducts.map(product => {
			if (product.id === id) {
				const _product = product;
				_product.amount -= 1;
			}
			return product;
		});

		setListOfProducts(filteredListOfProducts);
		setTotalPriceOfAllProducts(updatedTotalPrice);
		setAmountOfProducts(updatedamountOfProducts);
		setProducts(newProducts);
		setProducts(oldProducts);
	};

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
				<span
					className='products-list__trash-can'
					onClick={clearProductFromCart(
						productIdInCart,
						productId,
						productPrice,
					)}
					onKeyPress={clearProductFromCart(
						productIdInCart,
						productId,
						productPrice,
					)}
					role='button'
					tabIndex='0'>
					<i className='material-icons'>delete</i>
				</span>
			</li>
		</>
	);
};

ProductInCart.propTypes = {
	productId: PropTypes.number.isRequired,
	productIdInCart: PropTypes.string.isRequired,
	productName: PropTypes.string.isRequired,
	productPrice: PropTypes.number.isRequired,
	imageIndex: PropTypes.number.isRequired,
	imageAlt: PropTypes.string.isRequired,
};

export default ProductInCart;
