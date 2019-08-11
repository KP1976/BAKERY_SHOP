import React from 'react';
import '../scss/sections/_header.scss';
import headerImgSmall from '../img/header-photo_small.jpg';
import headerImgLarge from '../img/header-photo.jpg';

const Header = () => {
	return (
		<header className="header">
			<img
				className="header__image"
				srcSet={`${headerImgSmall} 500w, ${headerImgLarge} 1000w`}
				sizes="(max-width: 576px) 500px, (max-width: 992px) 1000px"
				src={headerImgSmall}
				alt="cakes"
			/>
			<h2 className="header__title">zdrowy asortyment</h2>
			<p className="header__text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.</p>
			<a href="#shop" className="header__cta-btn">
				nasze produkty
			</a>
			<div className="header__gradient_graphic" />
		</header>
	);
};

export default Header;
