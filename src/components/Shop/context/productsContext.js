import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
	const [products, setProducts] = useState(null);
	return (
		<ProductsContext.Provider value={[products, setProducts]}>{children}</ProductsContext.Provider>
	);
};

ProductsProvider.propTypes = {
	children: PropTypes.object.isRequired,
};
