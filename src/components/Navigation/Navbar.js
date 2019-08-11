import React, { useState } from 'react';
import HamburgerMenu from './Hamburger-menu';
import MenuList from './Menu-list';

// import '../../scss/sections/_menu.scss';

const NavBar = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isChange, setIsChange] = useState(false);

	const menuVisible = () => {
		setIsVisible(!isVisible);
		setIsChange(!isChange);
	};

	return (
		<div className="nav-menu">
			<HamburgerMenu trigger={menuVisible} isChange={isChange} />
			<h1 className="main-title">domowe wypieki</h1>
			<MenuList isVisible={isVisible} />
		</div>
	);
};

export default NavBar;
