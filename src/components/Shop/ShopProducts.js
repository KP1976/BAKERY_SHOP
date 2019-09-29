import React, { useContext } from 'react';

import ShopProduct from './ShopProduct';

import { ProductsContext } from './context/productsContext';
import { FirebaseContext } from '../../DataBase/firebase';

const ShopProducts = () => {
	const productsFromDataBase = useContext(FirebaseContext);
	const [products, setProducts] = useContext(ProductsContext);

	if (!products) {
		setTimeout(() => {
			setProducts(productsFromDataBase);
		}, 2000);
	}

	return (
		<div className='shop__products'>
			{products ? (
				products.map(product => (
					<ShopProduct
						key={product.id}
						imageIndex={product.id - 1}
						productName={product.name}
						category={product.category}
						productPrice={product.price}
						imageAlt={product.image.alt}
						amount={product.amount}
					/>
				))
			) : (
				<div className='spinner-container'>
					<div className='spinner' />
				</div>
			)}
		</div>
	);
};

export default ShopProducts;
