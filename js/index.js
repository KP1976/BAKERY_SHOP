const Main = (_ => {
	let buttonName = document.querySelector('.products-btn__name');
	let amountOfProducts = parseInt(DOMAmountOfProducts.textContent);
	let sumOfAllProducts = 0;

	// Fetch JSON data
	const getProductsFromJSON = async () => {
		try {
			const result = await fetch('../products.json');
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
		let allProductsInDOM = '';

		getProductsFromJSON()
			.then(products => {
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
					allProductsInDOM += productSchema;
				});
				DOMShopProducts.innerHTML = allProductsInDOM;
			})
			.then(() => executeEventListeners());
	};

	const removeAllProductsFromShoppingCart = () => {
		console.log("Kliknąłeś na przycisk 'WYCZYŚĆ KOSZYK'");
	};

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

	const showProductsInMenu = () => {
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

	function addProduct(e) {
		let productPrice = parseFloat(
			e.target.nextElementSibling.lastElementChild.textContent.split(' ')[0].replace(',', '.'),
		);
		let productPictureSource = e.target.parentElement.firstElementChild.getAttribute('src');
		let productPictureAlt = e.target.parentElement.firstElementChild.getAttribute('alt');
		let productName = e.target.nextElementSibling.firstElementChild.textContent;
		let amountOfProduct = e.target.previousElementSibling.textContent;

		amountOfProduct++;
		e.target.previousElementSibling.textContent = amountOfProduct;

		if (amountOfProduct === 1) {
			e.target.previousElementSibling.classList.add('visible');
		}

		menuProductsListButton.addEventListener('click', showProductsInMenu);

		amountOfProducts++;
		sumOfAllProducts += productPrice;

		// Zamiana odpowiedniego słowa w zależności od ilości produktów
		if (amountOfProducts === 0 || amountOfProducts === 5) {
			buttonName.textContent = 'produktów – ';
		} else if (amountOfProducts === 1) {
			buttonName.textContent = 'produkt – ';
		} else if (amountOfProducts === 2) {
			buttonName.textContent = 'produkty – ';
		}

		// Zamiana . na , i na odwrót w cenie produktu
		if (sumOfAllProducts.toString().includes('.')) {
			sumOfAllProducts = sumOfAllProducts.toString().replace('.', ',');
			DOMTotalPriceOfProducts.textContent = sumOfAllProducts + ' zł';
			sumOfAllProducts = sumOfAllProducts.toString().replace(',', '.');
			sumOfAllProducts = parseFloat(sumOfAllProducts);
		} else {
			DOMTotalPriceOfProducts.textContent = sumOfAllProducts.toString() + ' zł';
		}

		DOMAmountOfProducts.textContent = amountOfProducts;

		const li = document.createElement('li');

		li.className = 'products-list__product show';
		li.innerHTML = `
	<img
			src="${productPictureSource}"
			alt="${productPictureAlt}"
			class="products-list__picture"
		/>
		<span class="products-list__name">${productName}</span>
		<span class="products-list__price">${productPrice.toString().replace('.', ',')} zł</span>
		<span class="products-list__trash-can"
			><i class="material-icons">delete</i></span
		>
	`;

		document.querySelector('.products-list__clear-button').insertAdjacentElement('beforebegin', li);
	}

	const executeEventListeners = () => {
		const DOMAddProductButtons = document.querySelectorAll('.product__shop-cart-box');
		const clearShoppingCartButton = document.querySelector('.products-list__clear-button');
		hamburgerMenu.addEventListener('click', showMenu);
		menuListItems[3].addEventListener('click', showContact);
		DOMAddProductButtons.forEach(productButton => {
			productButton.addEventListener('click', addProduct);
		});
		clearShoppingCartButton.addEventListener('click', removeAllProductsFromShoppingCart);
	};

	return {
		init: () => {
			addAllProductsToDOM();
		},
	};
})();
document.addEventListener('DOMContentLoaded', Main.init());
