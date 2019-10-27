import React from 'react';
import { useProductsValue } from '../../Shop/context/productsContext';

const ProductInCart = () => {
	const products = useProductsValue()[0];

	return (
		<>
			{products && (
				<li className='products-list__product'>
					<img
						src='/src/img/products/small/1_citrus_cupcake_small.jpg'
						alt=''
						className='products-list__picture'
					/>
					<span className='products-list__name'>$</span>
					<span className='products-list__price'>$</span>
					<span className='products-list__trash-can'>
						<i className='material-icons'>delete</i>
					</span>
				</li>
			)}
		</>
	);
};

export default ProductInCart;
