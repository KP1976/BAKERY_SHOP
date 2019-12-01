import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ProductInCart from './Product-in-cart';

import { useCartValue } from '../context/cartContext';
import { useProductsValue } from '../../Shop/context/productsContext';
import { FirebaseContext } from '../../../DataBase/firebase';

const ProductsList = ({
	isVisible,
	amountOfProducts,
	totalPriceOfAllProducts,
}) => {
	const [
		,
		setAmountOfProducts,
		,
		setTextProducts,
		,
		setTotalPriceOfAllProducts,
		listOfProducts,
		setListOfProducts,
	] = useCartValue();
	const productsFromDataBase = useContext(FirebaseContext);
	const [products, setProducts] = useProductsValue();

	const clearAmountsOfProducts = () => {
		const oldProducts = [...products];
		const productsAfterClear = productsFromDataBase.map(product => {
			const _product = product;
			if (_product.amount > 0) {
				_product.amount = 0;
			}
			return _product;
		});

		setProducts(productsAfterClear);
		setProducts(oldProducts);
	};

	const clearProductsFromCart = () => {
		setListOfProducts([]);
		setAmountOfProducts(0);
		setTotalPriceOfAllProducts(0);
		setTextProducts('produktów –');
		clearAmountsOfProducts();
	};

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
						key={product.productIdInCart}
						productName={product.productName}
						productPrice={product.productPrice}
						imageIndex={product.imageIndex}
						imageAlt={product.imageAlt}
						productIdInCart={product.productIdInCart}
						productId={product.productId}
					/>
				))}

			<li className='products-list__sum'>
				SUMA
				<span>{totalPriceOfAllProducts.toString().replace('.', ',')} zł</span>
			</li>
			<button
				type='button'
				className='products-list__clear-button'
				onClick={clearProductsFromCart}>
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
