// MENU
const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu-list');
const menuListItems = document.querySelectorAll('.menu-list__item');
const productsListButton = document.querySelector('.products-btn');
const productsList = document.querySelector('.products-list');
const products = document.querySelectorAll('.products-list__product');

const changeHamburgerMenu = () => {
	const hamburgerMenuBars = document.querySelectorAll('.hamburger-menu__bar');
	const [barTop, barMiddle, barBottom] = hamburgerMenuBars;

	barTop.classList.toggle('rotate-right');
	barMiddle.classList.toggle('rotate-left');
	barBottom.classList.toggle('hide');
};

const showMenu = () => {
	changeHamburgerMenu();
	menu.classList.toggle('is-visible');
	menuListItems.forEach(item => item.classList.toggle('show'));
	if (productsList.classList.contains('is-visible')) {
		showProducts();
	}
	productsList.classList.remove('is-visible');
};

const showProducts = () => {
	productsList.classList.toggle('is-visible');
	products.forEach(item => item.classList.toggle('show'));
	productsListButton.classList.toggle('open');
};

hamburgerMenu.addEventListener('click', showMenu);
productsListButton.addEventListener('click', showProducts);
