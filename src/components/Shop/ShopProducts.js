import React from 'react';
import PropTypes from 'prop-types';

import ShopProduct from './ShopProduct';

const ShopProducts = ({ products }) => {
	return (
		<div className='shop__products'>
			{products.map(product => (
				<ShopProduct
					key={product.id}
					imageIndex={product.id - 1}
					name={product.name}
					category={product.category}
					price={product.price}
					imageAlt={product.image.alt}
				/>
			))}
		</div>
	);
};

ShopProducts.propTypes = {
	products: PropTypes.array.isRequired,
};

export default ShopProducts;
