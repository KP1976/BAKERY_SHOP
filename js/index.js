// MENU
const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu-list');
const menuListItems = document.querySelectorAll('.menu-list__item');
const phoneNumber = document.querySelector('.menu-list__phone-number');
const menuProductsListButton = document.querySelector('.products-btn');
const menuProductsList = document.querySelector('.products-list');
const menuProducts = document.querySelectorAll('.products-list__product');

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
	menuProductsList.classList.remove('is-visible');
	menuProducts.forEach(item => item.classList.remove('show'));
	menuProductsListButton.classList.remove('open');
};

const showProducts = () => {
	if (window.innerWidth < 768) {
		menuProductsList.classList.toggle('is-visible');
		menuProducts.forEach(item => item.classList.toggle('show'));
		menuProductsListButton.classList.toggle('open');
	} else {
		menuProductsList.classList.toggle('is-visible');
		menuProducts.forEach(item => item.classList.toggle('show'));
	}
};

const showContact = () => {
	if (window.innerWidth >= 768) {
		phoneNumber.classList.toggle('show');
	}
};

hamburgerMenu.addEventListener('click', showMenu);
menuProductsListButton.addEventListener('click', showProducts);
menuListItems[3].addEventListener('click', showContact);

// SORTOWANIE PRODUKTÓW

const productsTabs = [...document.querySelector('.search-tabs').children];
const products = document.querySelectorAll('.product');

const clearAllProducts = () => {
	for (let i = 0; i < products.length; i++) {
		products[i].style.display = 'none';
	}
};

function showSelectedProducts() {
	productsTabs.forEach(productTab => {
		productTab.className = 'search-tabs__item';
	});

	switch (this.textContent) {
		case 'Babeczki':
			clearAllProducts();
			products[0].style.display = 'block';
			products[8].style.display = 'block';
			break;
		case 'Ciasta':
			clearAllProducts();
			products[2].style.display = 'block';
			products[4].style.display = 'block';
			products[7].style.display = 'block';
			break;
		case 'Słodycze':
			clearAllProducts();
			products[1].style.display = 'block';
			products[3].style.display = 'block';
			products[6].style.display = 'block';
			break;
		case 'Donaty':
			clearAllProducts();
			products[5].style.display = 'block';
			break;
		case 'Wszystko':
			for (let i = 0; i < products.length; i++) {
				products[i].style.display = 'block';
			}
			break;
	}

	this.className = 'search-tabs__item--selected';
}

productsTabs.forEach(productTab => {
	productTab.addEventListener('click', showSelectedProducts);
});
