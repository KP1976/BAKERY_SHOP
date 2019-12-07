import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductsList from './Cart/Products-list';

import { useCartValue } from './context/cartContext';

const MenuList = ({ isVisible }) => {
	const [
		amountOfProducts,
		,
		totalPriceOfAllProducts,
		,
		,
		,
		displayCorrectSumOfProducts,
	] = useCartValue();
	const [productsVisible, setProductsVisible] = useState(false);

	const showProductsInCart = _amountOfProducts => () => {
		if (_amountOfProducts > 0) {
			setProductsVisible(!productsVisible);
		}
	};

	return (
		<ul className={isVisible ? 'menu-list is-visible' : 'menu-list'}>
			<li className='menu-list__item'>
				<a href='#root' className='menu-list__link'>
					Strona główna
				</a>
			</li>
			<li className='menu-list__item'>
				<a href='#aboutus' className='menu-list__link'>
					O nas
				</a>
			</li>
			<li className='menu-list__item'>
				<a href='#shop' className='menu-list__link'>
					Sklep
				</a>
			</li>
			<li className='menu-list__item'>
				Kontakt
				<p className='menu-list__phone-number'>
					<i className='material-icons'> call </i> 999-999-999
				</p>
			</li>
			<li className='menu-list__item'>
				<button
					type='button'
					className={
						productsVisible && amountOfProducts
							? 'products-btn open'
							: 'products-btn'
					}
					onClick={showProductsInCart(amountOfProducts)}>
					<i className='material-icons'>shopping_cart</i>
					<span className='products-btn__quantity'>{amountOfProducts}</span>
					<span className='products-btn__name'>
						{displayCorrectSumOfProducts(amountOfProducts)}
					</span>
					<span className='products-btn__total-price'>
						{' '}
						{totalPriceOfAllProducts.toString().replace('.', ',')} zł
					</span>
				</button>
				<ProductsList
					isVisible={productsVisible}
					amountOfProducts={amountOfProducts}
					totalPriceOfAllProducts={totalPriceOfAllProducts}
				/>
			</li>
		</ul>
	);
};

MenuList.propTypes = {
	isVisible: PropTypes.bool.isRequired,
};

export default MenuList;
