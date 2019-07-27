/* global firebase */

const hamburgerMenu = document.querySelector('.hamburger-menu');
const hamburgerMenuBars = document.querySelectorAll('.hamburger-menu__bar');
const menu = document.querySelector('.menu-list');
const menuListItems = document.querySelectorAll('.menu-list__item');
const phoneNumber = document.querySelector('.menu-list__phone-number');
const menuProductsListButton = document.querySelector('.products-btn');
const menuProductsList = document.querySelector('.products-list');
const DOMAmountOfProductsInCart = document.querySelector('.products-btn__quantity');
const DOMTotalPriceOfProducts = document.querySelector('.products-btn__total-price');
const DOMTotalPriceOfProductsContainerDesktopVersion = document.querySelector('.products-list__sum');
const DOMTotalPriceOfProductsDesktopVersion = document.querySelector('.products-list__sum span');
const DOMShopProducts = document.querySelector('.shop__products');
const productsTabs = document.querySelectorAll('.search-tabs__item');
const clearShoppingCartButton = document.querySelector('.products-list__clear-button');

const Main = (() => {
	const buttonName = document.querySelector('.products-btn__name');
	let amountOfProducts = parseInt(DOMAmountOfProductsInCart.textContent, 10);
	let sumOfAllProducts = 0;

	firebase.initializeApp({
		apiKey: 'AIzaSyDGAyftLCspEF-3gm0RJ1-3QlqIx6Dfg4o',
		authDomain: 'bakery-shop-5457e.firebaseapp.com',
		databaseURL: 'https://bakery-shop-5457e.firebaseio.com',
		projectId: 'bakery-shop-5457e',
		storageBucket: 'bakery-shop-5457e.appspot.com',
		messagingSenderId: '1009026750919',
		appId: '1:1009026750919:web:798e2def54d149d2'
	});

	const db = firebase.firestore();
	const productsFromDataBase = [];

	const addAllProductsToDOM = async () => {
		let allProductsAsString = '';
		let i = 0;

		try {
			const products = await db.collection('produkty').get();
			products.forEach(product => {
				productsFromDataBase[i] = product.data();
				i++;
			});

			productsFromDataBase.forEach(product => {
				const productSchema = `
				<figure class="product" data-category="${product.category}">
					<img
						class="product__image"
						srcset="${product.image.small} 500w, ${product.image.normal} 1000w"
						sizes="(max-width: 576px) 500px, (max-width: 992px) 1000px"
						src="${product.image.small}"
						alt="${product.image.alt}"
					/>
					<span class="product__amount">0</span>
					<div class="product__shop-cart-box">
						<i class="material-icons">shopping_cart</i>
						<span class="plus-sign">+</span>
					</div>
					<div class="product__description-box">
						<span class="product__name">${product.name}</span>
						<span class="product__price">${product.price}</span>
					</div>
				</figure>
			`;
				allProductsAsString += productSchema;
			});
			DOMShopProducts.innerHTML = allProductsAsString;
		} catch (error) {
			console.log(error);
		}
	};

	// Fetch JSON data
	// const getProductsFromJSON = async () => {
	// 	try {
	// 		const result = await fetch('js/products.json');
	// 		let data = await result.json();

	// 		data = data.map(product => {
	// 			const { id, name, price, category, image } = product;
	// 			return { id, name, price, category, image };
	// 		});
	// 		return data;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// 	return true;
	// };

	const showProductsInMenu = () => {
		if (window.innerWidth < 768) {
			menuProductsList.classList.toggle('is-visible');
			menuProductsListButton.classList.toggle('open');
		} else {
			menuProductsList.classList.toggle('is-visible');
		}
	};

	const removeAllProductsFromShoppingCart = () => {
		const howManyNodeChildren = menuProductsList.childElementCount;
		let child = menuProductsList.firstElementChild;
		let counter = 0;

		// -2, bo odejmujemy node'a z ceną wszystkich produktów dla desktopa i buttona czyszczącego
		while (counter < howManyNodeChildren - 2) {
			menuProductsList.removeChild(child);
			child = menuProductsList.firstElementChild;
			counter++;
		}

		menuProductsListButton.classList.remove('open');
		menuProductsListButton.removeEventListener('click', showProductsInMenu);
		sumOfAllProducts = 0;
		amountOfProducts = 0;
		DOMAmountOfProductsInCart.textContent = amountOfProducts;
		DOMTotalPriceOfProducts.textContent = '0 zł';
		DOMTotalPriceOfProductsDesktopVersion.textContent = '0 zł';
		buttonName.textContent = 'produktów – ';
		menuProductsListButton.classList.remove('open');
		menuProductsList.classList.remove('is-visible');

		// Czyszczenie wszystkich liczb pojedynczych produktów
		document.querySelectorAll('.product__amount').forEach(productAmount => {
			productAmount.classList.remove('visible');
			const newProductAmount = productAmount;
			newProductAmount.textContent = '0';
		});
	};

	const changeHamburgerMenu = () => {
		const [barTop, barMiddle, barBottom] = hamburgerMenuBars;

		barTop.classList.toggle('rotate-right');
		barMiddle.classList.toggle('rotate-left');
		barBottom.classList.toggle('hide');
	};

	const showMenu = () => {
		changeHamburgerMenu();
		menu.classList.toggle('is-visible');
		menuProductsList.classList.remove('is-visible');
		menuProductsListButton.classList.remove('open');
	};

	const showContact = () => {
		if (window.innerWidth >= 768) {
			phoneNumber.classList.toggle('show');
		}
	};

	const clearAllProducts = products => {
		products.forEach(product => {
			const newProduct = product;
			newProduct.style.display = 'none';
		});
	};

	function showSelectedProducts() {
		const products = document.querySelectorAll('.product');
		productsTabs.forEach(productTab => {
			const newProductTab = productTab;
			newProductTab.className = 'search-tabs__item';
		});

		clearAllProducts(products);

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

	const displayCorrectSumOfProducts = () => {
		if (amountOfProducts === 0 || amountOfProducts === 5) {
			buttonName.textContent = 'produktów – ';
		} else if (amountOfProducts === 1) {
			buttonName.textContent = 'produkt – ';
		} else if (amountOfProducts > 1 && amountOfProducts < 5) {
			buttonName.textContent = 'produkty – ';
		}

		// Zamiana . na , i na odwrót w cenie produktu
		if (sumOfAllProducts.toString().includes('.')) {
			sumOfAllProducts = sumOfAllProducts.toString().replace('.', ',');
			DOMTotalPriceOfProducts.textContent = `${sumOfAllProducts} zł`;
			DOMTotalPriceOfProductsDesktopVersion.textContent = `${sumOfAllProducts} zł`;
			sumOfAllProducts = sumOfAllProducts.toString().replace(',', '.');
			sumOfAllProducts = parseFloat(sumOfAllProducts);
		} else {
			DOMTotalPriceOfProducts.textContent = `${sumOfAllProducts.toString()} zł`;
			DOMTotalPriceOfProductsDesktopVersion.textContent = `${sumOfAllProducts.toString()} zł`;
		}
	};

	function removeProductFromCart(productPrice, e) {
		const nameOfProductInCart = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

		amountOfProducts--;
		sumOfAllProducts -= productPrice;
		e.target.parentElement.parentElement.remove();
		DOMAmountOfProductsInCart.textContent = amountOfProducts;
		displayCorrectSumOfProducts();

		[...DOMShopProducts.children].forEach(product => {
			const nameOfProduct = product.children[3].firstElementChild.textContent;
			const _product = product;

			if (nameOfProductInCart === nameOfProduct) {
				_product.children[1].textContent--;
				if (_product.children[1].textContent === '0') {
					console.log('WYZEROWANY!!!');
					_product.children[1].classList.remove('visible');
				}
			}
		});

		if (amountOfProducts === 0) {
			menuProductsListButton.classList.remove('open');
			menuProductsListButton.removeEventListener('click', showProductsInMenu);
			menuProductsList.classList.remove('is-visible');
		}
	}

	function addProductToCart(e) {
		const productInDOM = {
			productPrice: parseFloat(
				e.target.nextElementSibling.lastElementChild.textContent.split(' ')[0].replace(',', '.')
			),
			productPictureSource: e.target.parentElement.firstElementChild.getAttribute('src'),
			productPictureAlt: e.target.parentElement.firstElementChild.getAttribute('alt'),
			productName: e.target.nextElementSibling.firstElementChild.textContent
		};

		e.target.previousElementSibling.textContent++;
		e.target.previousElementSibling.classList.add('visible');

		menuProductsListButton.addEventListener('click', showProductsInMenu);

		amountOfProducts++;
		sumOfAllProducts += productInDOM.productPrice;

		displayCorrectSumOfProducts();

		DOMAmountOfProductsInCart.textContent = amountOfProducts;

		// Tworzenie HTML dla nowego produktu
		const li = document.createElement('li');

		li.className = 'products-list__product';
		li.innerHTML = `
		<img src="${productInDOM.productPictureSource}"	alt="${productInDOM.productPictureAlt}" class="products-list__picture"/>
		<span class="products-list__name">${productInDOM.productName}</span>
		<span class="products-list__price">${productInDOM.productPrice.toString().replace('.', ',')} zł</span>
		<span class="products-list__trash-can"><i class="material-icons">delete</i></span>
		`;

		DOMTotalPriceOfProductsContainerDesktopVersion.insertAdjacentElement('beforebegin', li);

		document
			.querySelectorAll('.products-list__trash-can i')
			[amountOfProducts - 1].addEventListener('click', removeProductFromCart.bind(e, productInDOM.productPrice));
	}

	const executeEventListeners = () => {
		const DOMAddProductButtons = document.querySelectorAll('.product__shop-cart-box');

		hamburgerMenu.addEventListener('click', showMenu);
		menuListItems[3].addEventListener('click', showContact);
		DOMAddProductButtons.forEach(productButton => {
			productButton.addEventListener('click', addProductToCart);
		});

		clearShoppingCartButton.addEventListener('click', removeAllProductsFromShoppingCart);
	};

	return {
		init: () => {
			addAllProductsToDOM().then(() => {
				executeEventListeners();
			});
		}
	};
})();
document.addEventListener('DOMContentLoaded', Main.init());
