import React, { useContext, useEffect } from 'react';
import uuid from 'uuid';

import ShopProduct from './ShopProduct';

import { useProductsValue } from './context/productsContext';
import { FirebaseContext } from '../../DataBase/firebase';

const ShopProducts = () => {
	const productsFromDataBase = useContext(FirebaseContext);
	const [products, setProducts] = useProductsValue();

	useEffect(() => {
		setProducts(productsFromDataBase);
	}, [productsFromDataBase, setProducts]);

	return (
		<div className='shop__products'>
			{!products && (
				<div className='spinner-container'>
					<div className='spinner' />
				</div>
			)}
			{products &&
				products.map(product => (
					<ShopProduct
						key={product.id}
						imageIndex={product.id - 1}
						productName={product.name}
						category={product.category}
						productPrice={product.price}
						imageAlt={product.image.alt}
						amount={product.amount}
						productId={uuid.v4()}
					/>
				))}
		</div>
	);
};

export default ShopProducts;
