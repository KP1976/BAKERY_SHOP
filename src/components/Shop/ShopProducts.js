import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ShopProduct from './ShopProduct';

const ShopProducts = ({ products }) => {
	const [updatedProducts, setUpdatedProducts] = useState([]);

	const addProduct = (id, amount) => () => {
		const newArrayofProducts = [...updatedProducts];
		let _amount = amount;
		_amount++;

		newArrayofProducts.map(product => {
			const _product = product;
			if (_product.id === id) {
				_product.amount = _amount;
			}
			return _product;
		});
		setUpdatedProducts(newArrayofProducts);
	};

	useEffect(() => {
		setUpdatedProducts(products);
	}, [products]);

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
					amount={product.amount}
					addProduct={addProduct(product.id, product.amount)}
				/>
			))}
		</div>
	);
};

ShopProducts.propTypes = {
	products: PropTypes.array.isRequired,
};

export default ShopProducts;
