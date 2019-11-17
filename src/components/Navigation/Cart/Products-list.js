import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ProductInCart from './Product-in-cart';

import { useCartValue } from '../context/cartContext';
import { useTabsValue } from '../../Shop/context/tabsContext';
import { FirebaseContext } from '../../../DataBase/firebase';

const ProductsList = ({ isVisible, amountOfProducts, totalPriceOfAllProducts }) => {
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
	const [productsFromDataBase, setProductsFromDataBase] = useContext(FirebaseContext);
	const [tabs, setActiveTab] = useTabsValue();

	const clearAmountsOfProducts = () => {
		const productsAfterClear = productsFromDataBase.map(product => {
			const _product = product;
			if (_product.amount > 0) {
				_product.amount = 0;
			}
			return _product;
		});

		const resetTabs = tabs.map(tab => {
			const _tab = tab;
			if (_tab.active === true) {
				_tab.active = false;
			}
			return _tab;
		});

		resetTabs[0].active = true;

		setActiveTab(resetTabs);
		setProductsFromDataBase(productsAfterClear);
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
				isVisible && amountOfProducts > 0 ? 'products-list is-visible' : 'products-list'
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
