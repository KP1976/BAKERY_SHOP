// MENU
const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu-list');
const menuListItems = document.querySelectorAll('.menu-list__item');
const phoneNumber = document.querySelector('.menu-list__phone-number');
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
	productsList.classList.remove('is-visible');
	products.forEach(item => item.classList.remove('show'));
	productsListButton.classList.remove('open');
};

const showProducts = () => {
	if (window.innerWidth < 768) {
		productsList.classList.toggle('is-visible');
		products.forEach(item => item.classList.toggle('show'));
		productsListButton.classList.toggle('open');
	} else {
		productsList.classList.toggle('is-visible');
		products.forEach(item => item.classList.toggle('show'));
	}
};

const showContact = () => {
	if (window.innerWidth >= 768) {
		phoneNumber.classList.toggle('show');
	}
};

hamburgerMenu.addEventListener('click', showMenu);
productsListButton.addEventListener('click', showProducts);
menuListItems[3].addEventListener('click', showContact);
