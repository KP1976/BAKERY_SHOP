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
	products.forEach(product => {
		product.style.display = 'none';
	});
};

function showSelectedProducts() {
	productsTabs.forEach(productTab => {
		productTab.className = 'search-tabs__item';
	});

	clearAllProducts();

	products.forEach((product, index) => {
		if (product.getAttribute('data-category') === this.textContent) {
			products[index].style.display = 'block';
		}

		if (this.textContent === 'Wszystko') {
			products[index].style.display = 'block';
		}
	});

	this.className = 'search-tabs__item selected';
}

productsTabs.forEach(productTab => {
	productTab.addEventListener('click', showSelectedProducts);
});

// OBSŁUGA DODAWANIA I DEJMOWANIA PRODUKTÓW
const DOMAmountOfProducts = document.querySelector('.products-btn__quantity');
const DOMTotalPriceOfProducts = document.querySelector(
	'.products-btn__total-price',
);
const DOMAddProductButtons = document.querySelectorAll(
	'.product__shop-cart-box',
);

let buttonName = document.querySelector('.products-btn__name');

let amountOfProducts = parseInt(DOMAmountOfProducts.textContent);
let sumOfAllProducts = 0;

function addProduct(e) {
	let productPrice = parseFloat(
		e.target.nextElementSibling.lastElementChild.textContent
			.split(' ')[0]
			.replace(',', '.'),
	);
	amountOfProducts++;
	sumOfAllProducts += productPrice;

	if (amountOfProducts === 0 || amountOfProducts === 5) {
		buttonName.textContent = 'produktów – ';
	} else if (amountOfProducts === 1) {
		buttonName.textContent = 'produkt – ';
	} else if (amountOfProducts === 2) {
		buttonName.textContent = 'produkty – ';
	}

	if (sumOfAllProducts.toString().includes('.')) {
		sumOfAllProducts = sumOfAllProducts.toString().replace('.', ',');
		DOMTotalPriceOfProducts.textContent = sumOfAllProducts + ' zł';
		sumOfAllProducts = sumOfAllProducts.toString().replace(',', '.');
		sumOfAllProducts = parseFloat(sumOfAllProducts);
	} else {
		DOMTotalPriceOfProducts.textContent = sumOfAllProducts.toString() + ' zł';
	}

	DOMAmountOfProducts.textContent = amountOfProducts;
}

DOMAddProductButtons.forEach(productButton => {
	productButton.addEventListener('click', addProduct);
});
