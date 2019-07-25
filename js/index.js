const hamburgerMenu = document.querySelector('.hamburger-menu');
const hamburgerMenuBars = document.querySelectorAll('.hamburger-menu__bar');
const menu = document.querySelector('.menu-list');
const menuListItems = document.querySelectorAll('.menu-list__item');
const phoneNumber = document.querySelector('.menu-list__phone-number');
const menuProductsListButton = document.querySelector('.products-btn');
const menuProductsList = document.querySelector('.products-list');
const DOMAmountOfProducts = document.querySelector('.products-btn__quantity');
const DOMTotalPriceOfProducts = document.querySelector('.products-btn__total-price');
const DOMTotalPriceOfProductsContainerDesktopVersion = document.querySelector('.products-list__sum');
const DOMTotalPriceOfProductsDesktopVersion = document.querySelector('.products-list__sum span');
const DOMShopProducts = document.querySelector('.shop__products');
const productsTabs = document.querySelectorAll('.search-tabs__item');
const clearShoppingCartButton = document.querySelector('.products-list__clear-button');

const Main = (() => {
	const buttonName = document.querySelector('.products-btn__name');
	let amountOfProducts = parseInt(DOMAmountOfProducts.textContent, 10);
	let sumOfAllProducts = 0;
	let amountOfSingleProducts = [0, 0, 0, 0, 0, 0, 0, 0, 0];

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
	let i = 0;

	const addAllProductsToDOM = () => {
		let allProductsAsString = '';

		const allProductsInDOM = db
			.collection('produkty')
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					productsFromDataBase[i] = doc.data();
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
			})
			.catch(err => console.log(err));
		return allProductsInDOM;
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

	// const addAllProductsToDOM = () => {
	// 	let allProductsAsString = '';

	// 	const allProductsInDOM = getProductsFromJSON().then(products => {
	// 		products.forEach(product => {
	// 			const productSchema = `
	// 				<figure class="product" data-category="${product.category}">
	// 					<img
	// 						class="product__image"
	// 						srcset="${product.image.small} 500w, ${product.image.normal} 1000w"
	// 						sizes="(max-width: 576px) 500px, (max-width: 992px) 1000px"
	// 						src="${product.image.small}"
	// 						alt="${product.image.alt}"
	// 					/>
	// 					<span class="product__amount">0</span>
	// 					<div class="product__shop-cart-box">
	// 						<i class="material-icons">shopping_cart</i>
	// 						<span class="plus-sign">+</span>
	// 					</div>
	// 					<div class="product__description-box">
	// 						<span class="product__name">${product.name}</span>
	// 						<span class="product__price">${product.price}</span>
	// 					</div>
	// 				</figure>
	// 			`;
	// 			allProductsAsString += productSchema;
	// 		});
	// 		DOMShopProducts.innerHTML = allProductsAsString;
	// 	});

	// 	return allProductsInDOM;
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
		DOMAmountOfProducts.textContent = amountOfProducts;
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

		amountOfSingleProducts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
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
		const {
			0: product1,
			1: product2,
			2: product3,
			3: product4,
			4: product5,
			5: product6,
			6: product7,
			7: product8,
			8: product9
		} = DOMShopProducts.children;

		amountOfProducts--;
		sumOfAllProducts -= productPrice;
		e.target.parentElement.parentElement.remove();
		DOMAmountOfProducts.textContent = amountOfProducts;
		displayCorrectSumOfProducts();

		switch (nameOfProductInCart) {
			case 'Babeczka cytrynowa':
				amountOfSingleProducts[0]--;
				product1.firstElementChild.nextElementSibling.textContent--;
				if (amountOfSingleProducts[0] === 0) {
					product1.firstElementChild.nextElementSibling.classList.remove('visible');
				}
				break;
			case 'Malinowy cukierek':
				amountOfSingleProducts[1]--;
				product2.firstElementChild.nextElementSibling.textContent--;
				if (amountOfSingleProducts[1] === 0) {
					product2.firstElementChild.nextElementSibling.classList.remove('visible');
				}
				break;
			case 'Sernik':
				amountOfSingleProducts[2]--;
				product3.firstElementChild.nextElementSibling.textContent--;
				if (amountOfSingleProducts[2] === 0) {
					product3.firstElementChild.nextElementSibling.classList.remove('visible');
				}
				break;
			case 'Beza':
				amountOfSingleProducts[3]--;
				product4.firstElementChild.nextElementSibling.textContent--;
				if (amountOfSingleProducts[3] === 0) {
					product4.firstElementChild.nextElementSibling.classList.remove('visible');
				}
				break;
			case 'Makowiec':
				amountOfSingleProducts[4]--;
				product5.firstElementChild.nextElementSibling.textContent--;
				if (amountOfSingleProducts[4] === 0) {
					product5.firstElementChild.nextElementSibling.classList.remove('visible');
				}
				break;
			case 'Donut z polewą':
				amountOfSingleProducts[5]--;
				product6.firstElementChild.nextElementSibling.textContent--;
				if (amountOfSingleProducts[5] === 0) {
					product6.firstElementChild.nextElementSibling.classList.remove('visible');
				}
				break;
			case 'Cukierek cytrynowy':
				amountOfSingleProducts[6]--;
				product7.firstElementChild.nextElementSibling.textContent--;
				if (amountOfSingleProducts[6] === 0) {
					product7.firstElementChild.nextElementSibling.classList.remove('visible');
				}
				break;
			case 'Tort':
				amountOfSingleProducts[7]--;
				product8.firstElementChild.nextElementSibling.textContent--;
				if (amountOfSingleProducts[7] === 0) {
					product8.firstElementChild.nextElementSibling.classList.remove('visible');
				}
				break;
			case 'Babeczka z owocami':
				amountOfSingleProducts[8]--;
				product9.firstElementChild.nextElementSibling.textContent--;
				if (amountOfSingleProducts[8] === 0) {
					product9.firstElementChild.nextElementSibling.classList.remove('visible');
				}
				break;
			default:
				break;
		}

		if (amountOfProducts === 0) {
			menuProductsListButton.classList.remove('open');
			menuProductsListButton.removeEventListener('click', showProductsInMenu);
			menuProductsList.classList.remove('is-visible');
		}
	}

	function addProductToCart(e) {
		const productPrice = parseFloat(
			e.target.nextElementSibling.lastElementChild.textContent.split(' ')[0].replace(',', '.')
		);
		const productPictureSource = e.target.parentElement.firstElementChild.getAttribute('src');
		const productPictureAlt = e.target.parentElement.firstElementChild.getAttribute('alt');
		const productName = e.target.nextElementSibling.firstElementChild.textContent;

		let {
			0: product1,
			1: product2,
			2: product3,
			3: product4,
			4: product5,
			5: product6,
			6: product7,
			7: product8,
			8: product9
		} = amountOfSingleProducts;

		switch (productName) {
			case 'Babeczka cytrynowa':
				amountOfSingleProducts[0]++;
				product1++;
				e.target.previousElementSibling.textContent = product1;
				break;
			case 'Malinowy cukierek':
				amountOfSingleProducts[1]++;
				product2++;
				e.target.previousElementSibling.textContent = product2;
				break;
			case 'Sernik':
				amountOfSingleProducts[2]++;
				product3++;
				e.target.previousElementSibling.textContent = product3;
				break;
			case 'Beza':
				amountOfSingleProducts[3]++;
				product4++;
				e.target.previousElementSibling.textContent = product4;
				break;
			case 'Makowiec':
				amountOfSingleProducts[4]++;
				product5++;
				e.target.previousElementSibling.textContent = product5;
				break;
			case 'Donut z polewą':
				amountOfSingleProducts[5]++;
				product6++;
				e.target.previousElementSibling.textContent = product6;
				break;
			case 'Cukierek cytrynowy':
				amountOfSingleProducts[6]++;
				product7++;
				e.target.previousElementSibling.textContent = product7;
				break;
			case 'Tort':
				amountOfSingleProducts[7]++;
				product8++;
				e.target.previousElementSibling.textContent = product8;
				break;
			case 'Babeczka z owocami':
				amountOfSingleProducts[8]++;
				product9++;
				e.target.previousElementSibling.textContent = product9;
				break;
			default:
				break;
		}

		amountOfSingleProducts.forEach(amountOfSingleProduct => {
			if (amountOfSingleProduct === 1) {
				e.target.previousElementSibling.classList.add('visible');
			}
		});

		menuProductsListButton.addEventListener('click', showProductsInMenu);

		amountOfProducts++;
		sumOfAllProducts += productPrice;

		displayCorrectSumOfProducts();

		DOMAmountOfProducts.textContent = amountOfProducts;

		const li = document.createElement('li');

		li.className = 'products-list__product';
		li.innerHTML = `
		<img src="${productPictureSource}"	alt="${productPictureAlt}" class="products-list__picture"/>
		<span class="products-list__name">${productName}</span>
		<span class="products-list__price">${productPrice.toString().replace('.', ',')} zł</span>
		<span class="products-list__trash-can"><i class="material-icons">delete</i></span>
		`;

		DOMTotalPriceOfProductsContainerDesktopVersion.insertAdjacentElement('beforebegin', li);

		document
			.querySelectorAll('.products-list__trash-can i')
			[amountOfProducts - 1].addEventListener('click', removeProductFromCart.bind(e, productPrice));
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
			addAllProductsToDOM().then(() => executeEventListeners());
		}
	};
})();
document.addEventListener('DOMContentLoaded', Main.init());
