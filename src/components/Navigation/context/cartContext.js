import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [amountOfProducts, setAmountOfProducts] = useState(0);
	const [totalPriceOfAllProducts, setTotalPriceOfAllProducts] = useState(0);
	const [textProducts, setTextProducts] = useState('produktów –');
	const [listOfProducts, setListOfProducts] = useState([]);

	return (
		<CartContext.Provider
			value={[
				amountOfProducts,
				setAmountOfProducts,
				textProducts,
				setTextProducts,
				totalPriceOfAllProducts,
				setTotalPriceOfAllProducts,
				listOfProducts,
				setListOfProducts,
			]}>
			{children}
		</CartContext.Provider>
	);
};

CartProvider.propTypes = {
	children: PropTypes.array.isRequired,
};

export const useCartValue = () => useContext(CartContext);
