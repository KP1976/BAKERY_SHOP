import React from 'react';
import HamburgerMenu from './Hamburger-menu';
import MenuList from './Menu-list';

import '../../scss/sections/_menu.scss';

const NavBar = () => {
	return (
		<div className="nav-menu">
			<HamburgerMenu />
			<h1 className="main-title">domowe wypieki</h1>
			<MenuList />
		</div>
	);
};

export default NavBar;
