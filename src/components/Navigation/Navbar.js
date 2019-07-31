import React from 'react';
import HamburgerMenu from './Hamburger-menu';
import NavBarStyles from './nav-menu.module.scss';

const NavBar = () => {
	return (
		<div className={NavBarStyles['nav-menu']}>
			<HamburgerMenu />
		</div>
	);
};

export default NavBar;
