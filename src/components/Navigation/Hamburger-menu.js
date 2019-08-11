import React from 'react';
import PropTypes from 'prop-types';

const HamburgerMenu = ({ trigger, isChange }) => {
	return (
		<div className="hamburger-menu" onClick={trigger} onKeyUp={trigger} tabIndex="0" role="button">
			<div className={isChange ? 'hamburger-menu__bar rotate-right' : 'hamburger-menu__bar'} />
			<div className={isChange ? 'hamburger-menu__bar rotate-left' : 'hamburger-menu__bar'} />
			<div className={isChange ? 'hamburger-menu__bar hide' : 'hamburger-menu__bar'} />
		</div>
	);
};

HamburgerMenu.propTypes = {
	trigger: PropTypes.func.isRequired,
	isChange: PropTypes.bool.isRequired
};

export default HamburgerMenu;
