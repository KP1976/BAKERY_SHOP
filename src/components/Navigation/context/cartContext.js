import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [amountOfProducts, setAmountOfProducts] = useState(0);
	const [totalPriceOfAllProducts, setTotalPriceOfAllProducts] = useState(0);
	const [textProducts, setTextProducts] = useState('produktów –');
	const [listOfProducts, setListOfProducts] = useState([]);

	const displayCorrectSumOfProducts = _amountOfProducts => {
		switch (_amountOfProducts) {
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
		return textProducts;
	};

	return (
		<CartContext.Provider
			value={[
				amountOfProducts,
				setAmountOfProducts,
				totalPriceOfAllProducts,
				setTotalPriceOfAllProducts,
				listOfProducts,
				setListOfProducts,
				displayCorrectSumOfProducts,
			]}>
			{children}
		</CartContext.Provider>
	);
};

CartProvider.propTypes = {
	children: PropTypes.array.isRequired,
};

export const useCartValue = () => useContext(CartContext);
