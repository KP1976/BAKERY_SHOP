import React from 'react';
import PropTypes from 'prop-types';

const MenuList = ({ isVisible }) => {
	return (
		<ul className={isVisible ? 'menu-list is-visible' : 'menu-list'}>
			<li className="menu-list__item">
				<a href="#root" className="menu-list__link">
					Strona główna
				</a>
			</li>
			<li className="menu-list__item">
				<a href="#aboutus" className="menu-list__link">
					O nas
				</a>
			</li>
			<li className="menu-list__item">
				<a href="#shop" className="menu-list__link">
					Sklep
				</a>
			</li>
			<li className="menu-list__item">
				Kontakt
				<p className="menu-list__phone-number">
					<i className="material-icons"> call </i> 999-999-999
				</p>
			</li>
			<li className="menu-list__item">
				<button type="button" className="products-btn">
					<i className="material-icons">shopping_cart</i>
					<span className="products-btn__quantity">0</span>
					<span className="products-btn__name">produktów –</span>
					<span className="products-btn__total-price"> 0 zł</span>
				</button>

				<ul className="products-list">
					<li className="products-list__sum">
						SUMA
						<span />
					</li>
					<button type="button" className="products-list__clear-button">
						wyczyść koszyk
					</button>
				</ul>
			</li>
		</ul>
	);
};

MenuList.propTypes = {
	isVisible: PropTypes.bool.isRequired
};

export default MenuList;
