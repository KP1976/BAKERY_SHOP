import React, { useContext, useEffect } from 'react';

import ShopProduct from './ShopProduct';

import { FirebaseContext } from '../../DataBase/firebase';
import { ProductsContext } from './context/productsContext';
import 'firebase/firestore';

const ShopProducts = () => {
	const firebase = useContext(FirebaseContext);
	const [products, setProducts] = useContext(ProductsContext);

	useEffect(() => {
		firebase
			.firestore()
			.collection('produkty')
			.onSnapshot(snapshot => {
				const newProducts = snapshot.docs.map(doc => ({
					...doc.data(),
				}));
				setProducts(newProducts);
			});
	}, [firebase, setProducts]);

	let listOfProducts;

	if (products === null) {
		listOfProducts = <li>Ładuję produkty</li>;
	} else if (products.length === 0) {
		listOfProducts = <li>Brak produktów</li>;
	} else {
		listOfProducts = products.map(product => (
			<ShopProduct
				key={product.id}
				imageIndex={product.id - 1}
				productName={product.name}
				category={product.category}
				productPrice={product.price}
				imageAlt={product.image.alt}
				amount={product.amount}
			/>
		));
	}

	return <div className='shop__products'>{listOfProducts}</div>;
};

export default ShopProducts;

// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// import ShopProduct from './ShopProduct';

// const ShopProducts = ({ products }) => {
// 	const [updatedProducts, setUpdatedProducts] = useState([]);

// 	const addProduct = (id, amount) => () => {
// 		const newArrayofProducts = [...updatedProducts];
// 		let _amount = amount;
// 		_amount++;

// 		newArrayofProducts.map(product => {
// 			const _product = product;
// 			if (_product.id === id) {
// 				_product.amount = _amount;
// 			}
// 			return _product;
// 		});
// 		setUpdatedProducts(newArrayofProducts);
// 	};

// 	useEffect(() => {
// 		setUpdatedProducts(products);
// 	}, [products]);

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
// 					addProduct={addProduct(product.id, product.amount)}
// 				/>
// 			))}
// 		</div>
// 	);
// };

// ShopProducts.propTypes = {
// 	products: PropTypes.array.isRequired,
// };

// export default ShopProducts;
