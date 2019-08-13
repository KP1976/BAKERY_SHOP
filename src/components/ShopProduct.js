import React from 'react';
import citrusCupcakeSmall from '../img/citrus_cupcake_small.jpg';
import citrusCupcakeLarge from '../img/citrus_cupcake.jpg';

const ShopProduct = () => {
	return (
		// <figure className="product" data-category="${product.category}">
		// 	<img
		// 		className="product__image"
		// 		srcset="${product.image.small} 500w, ${product.image.normal} 1000w"
		// 		sizes="(max-width: 576px) 500px, (max-width: 992px) 1000px"
		// 		src="${product.image.small}"
		// 		alt="${product.image.alt}"
		// 	/>
		// 	<span className="product__amount">0</span>
		// 	<div className="product__shop-cart-box">
		// 		<i className="material-icons">shopping_cart</i>
		// 		<span className="plus-sign">+</span>
		// 	</div>
		// 	<div className="product__description-box">
		// 		<span className="product__name">${product.name}</span>
		// 		<span className="product__price">${product.price}</span>
		// 	</div>
		// </figure>
		<figure className="product" data-category="Babeczki">
			<img
				className="product__image"
				srcSet={`${citrusCupcakeSmall} 500w, ${citrusCupcakeLarge} 1000w`}
				sizes="(max-width: 576px) 500px, (max-width: 992px) 1000px"
				src={citrusCupcakeSmall}
				alt="citric cupcake"
			/>
			<span className="product__amount">0</span>
			<div className="product__shop-cart-box">
				<i className="material-icons">shopping_cart</i>
				<span className="plus-sign">+</span>
			</div>
			<div className="product__description-box">
				<span className="product__name">Babeczka Cytrynowa</span>
				<span className="product__price">5 zł</span>
			</div>
		</figure>
	);
};

export default ShopProduct;
