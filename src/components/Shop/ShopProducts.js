import React from 'react';

import ShopProduct from './ShopProduct';

const ShopProducts = () => {
	return (
		<div className='shop__products'>
			<ShopProduct />
		</div>
	);
};

export default ShopProducts;

// const ShopProducts = ({ products }) => {
// 	return (
// 		<div className='shop__products'>
// 			{products.map(product => (
// 				<ShopProduct
// 					key={product.id}
// 					imageIndex={product.id - 1}
// 					name={product.name}
// 					category={product.category}
// 					price={product.price}
// 					imageAlt={product.image.alt}
// 					amount={product.amount}
// 				/>
// 			))}
// 		</div>
// 	);
// };

// ShopProducts.propTypes = {
// 	products: PropTypes.array.isRequired,
// };

// export default ShopProducts;
