const Main = (() => {
	let buttonName = document.querySelector('.products-btn__name');
	let amountOfProducts = parseInt(DOMAmountOfProducts.textContent);
	let sumOfAllProducts = 0;
	let amountOfSingleProducts = [0, 0, 0, 0, 0, 0, 0, 0, 0];

	// Fetch JSON data
	const getProductsFromJSON = async () => {
		try {
			const result = await fetch('js/products.json');
			let data = await result.json();

			data = data.map(product => {
				const { id, name, price, category, image } = product;
				return { id, name, price, category, image };
			});
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const addAllProductsToDOM = () => {
		let allProductsAsString = '';

		const allProductsInDOM = getProductsFromJSON().then(products => {
			products.forEach(product => {
				let productSchema = `
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
		});

		return allProductsInDOM;
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
		document.querySelectorAll('.product__amount').forEach(product__amount => {
			product__amount.classList.remove('visible');
			product__amount.textContent = '0';
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

	const showProductsInMenu = () => {
		if (window.innerWidth < 768) {
			menuProductsList.classList.toggle('is-visible');
			menuProductsListButton.classList.toggle('open');
		} else {
			menuProductsList.classList.toggle('is-visible');
		}
	};

	const showContact = () => {
		if (window.innerWidth >= 768) {
			phoneNumber.classList.toggle('show');
		}
	};

	const clearAllProducts = products => {
		products.forEach(product => {
			product.style.display = 'none';
		});
	};

	function showSelectedProducts() {
		const products = document.querySelectorAll('.product');
		productsTabs.forEach(productTab => {
			productTab.className = 'search-tabs__item';
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
			DOMTotalPriceOfProducts.textContent = sumOfAllProducts + ' zł';
			DOMTotalPriceOfProductsDesktopVersion.textContent = sumOfAllProducts + ' zł';
			sumOfAllProducts = sumOfAllProducts.toString().replace(',', '.');
			sumOfAllProducts = parseFloat(sumOfAllProducts);
		} else {
			DOMTotalPriceOfProducts.textContent = sumOfAllProducts.toString() + ' zł';
			DOMTotalPriceOfProductsDesktopVersion.textContent = sumOfAllProducts.toString() + ' zł';
		}
	};

	function addProductToCart(e) {
		let productPrice = parseFloat(
			e.target.nextElementSibling.lastElementChild.textContent.split(' ')[0].replace(',', '.'),
		);
		let productPictureSource = e.target.parentElement.firstElementChild.getAttribute('src');
		let productPictureAlt = e.target.parentElement.firstElementChild.getAttribute('alt');
		let productName = e.target.nextElementSibling.firstElementChild.textContent;

		switch (productName) {
			case 'Babeczka cytrynowa':
				amountOfSingleProducts[0]++;
				e.target.previousElementSibling.textContent = amountOfSingleProducts[0];
				break;
			case 'Malinowy cukierek':
				amountOfSingleProducts[1]++;
				e.target.previousElementSibling.textContent = amountOfSingleProducts[1];
				break;
			case 'Sernik':
				amountOfSingleProducts[2]++;
				e.target.previousElementSibling.textContent = amountOfSingleProducts[2];
				break;
			case 'Beza':
				amountOfSingleProducts[3]++;
				e.target.previousElementSibling.textContent = amountOfSingleProducts[3];
				break;
			case 'Makowiec':
				amountOfSingleProducts[4]++;
				e.target.previousElementSibling.textContent = amountOfSingleProducts[4];
				break;
			case 'Donut z polewą':
				amountOfSingleProducts[5]++;
				e.target.previousElementSibling.textContent = amountOfSingleProducts[5];
				break;
			case 'Cukierek cytrynowy':
				amountOfSingleProducts[6]++;
				e.target.previousElementSibling.textContent = amountOfSingleProducts[6];
				break;
			case 'Tort':
				amountOfSingleProducts[7]++;
				e.target.previousElementSibling.textContent = amountOfSingleProducts[7];
				break;
			case 'Babeczka z owocami':
				amountOfSingleProducts[8]++;
				e.target.previousElementSibling.textContent = amountOfSingleProducts[8];
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
			[amountOfProducts - 1].addEventListener('click', function(e) {
				const nameOfProductInCart = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

				amountOfProducts--;
				sumOfAllProducts -= productPrice;
				e.target.parentElement.parentElement.remove();
				DOMAmountOfProducts.textContent = amountOfProducts;
				displayCorrectSumOfProducts();

				switch (nameOfProductInCart) {
					case 'Babeczka cytrynowa':
						amountOfSingleProducts[0]--;
						// e.target.previousElementSibling.textContent = amountOfSingleProducts[0];
						break;
					case 'Malinowy cukierek':
						amountOfSingleProducts[1]--;
						// e.target.previousElementSibling.textContent = amountOfSingleProducts[1];
						break;
					case 'Sernik':
						amountOfSingleProducts[2]--;
						// e.target.previousElementSibling.textContent = amountOfSingleProducts[2];
						break;
					case 'Beza':
						amountOfSingleProducts[3]--;
						// e.target.previousElementSibling.textContent = amountOfSingleProducts[3];
						break;
					case 'Makowiec':
						amountOfSingleProducts[4]--;
						// e.target.previousElementSibling.textContent = amountOfSingleProducts[4];
						break;
					case 'Donut z polewą':
						amountOfSingleProducts[5]--;
						// e.target.previousElementSibling.textContent = amountOfSingleProducts[5];
						break;
					case 'Cukierek cytrynowy':
						amountOfSingleProducts[6]--;
						// e.target.previousElementSibling.textContent = amountOfSingleProducts[6];
						break;
					case 'Tort':
						amountOfSingleProducts[7]--;
						// e.target.previousElementSibling.textContent = amountOfSingleProducts[7];
						break;
					case 'Babeczka z owocami':
						amountOfSingleProducts[8]++;
						// e.target.previousElementSibling.textContent = amountOfSingleProducts[8];
						break;
				}

				console.log(amountOfSingleProducts);

				// [...DOMShopProducts.children].forEach(DOMProduct => {
				// 	if (DOMProduct.lastElementChild.firstElementChild.textContent === nameOfProductInCart) {
				// 		amountOfSingleProducts[4]--;
				// 		DOMProduct.firstElementChild.nextElementSibling.textContent = amountOfSingleProduct;

				// 		console.log(DOMProduct.firstElementChild.nextElementSibling.textContent);

				// 		if (amountOfSingleProduct === 0) {
				// 			DOMProduct.firstElementChild.nextElementSibling.classList.remove('visible');
				// 		} else {
				// 			DOMProduct.firstElementChild.nextElementSibling.classList.add('visible');
				// 		}
				// 	}
				// });
			});
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
		},
	};
})();
document.addEventListener('DOMContentLoaded', Main.init());
