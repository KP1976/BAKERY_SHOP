import React from 'react';
import hamburgerMenuStyles from './hamburger-menu.module.scss';

const HamburgerMenu = () => {
	return (
		<div className={hamburgerMenuStyles['hamburger-menu']}>
			<div className={hamburgerMenuStyles['hamburger-menu__bar']} />
			<div className={hamburgerMenuStyles['hamburger-menu__bar']} />
			<div className={hamburgerMenuStyles['hamburger-menu__bar']} />
		</div>
	);
};

export default HamburgerMenu;
