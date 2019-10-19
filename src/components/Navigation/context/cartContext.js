import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [amountOfProducts, setAmountOfProducts] = useState(0);
	return (
		<CartContext.Provider value={[amountOfProducts, setAmountOfProducts]}>
			{children}
		</CartContext.Provider>
	);
};

CartProvider.propTypes = {
	children: PropTypes.array.isRequired,
};
