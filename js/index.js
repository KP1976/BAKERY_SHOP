const Main = (_ => {
	let buttonName = document.querySelector('.products-btn__name');
	let amountOfProducts = parseInt(DOMAmountOfProducts.textContent);
	let sumOfAllProducts = 0;

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

	function addProduct(e) {
		let productPrice = parseFloat(
			e.target.nextElementSibling.lastElementChild.textContent
				.split(' ')[0]
				.replace(',', '.'),
		);
		let productPictureSource = e.target.parentElement.firstElementChild.getAttribute(
			'src',
		);
		let productPictureAlt = e.target.parentElement.firstElementChild.getAttribute(
			'alt',
		);
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
		<span class="products-list__price">${productPrice
			.toString()
			.replace('.', ',')} zł</span>
		<span class="products-list__trash-can"
			><i class="material-icons">delete</i></span
		>
	`;

		document
			.querySelector('.products-list__clear-button')
			.insertAdjacentElement('beforebegin', li);
	}

	// Fetch JSON data
	const getProductsFromJSON = async () => {
		try {
			const result = await fetch('../products.json');
			let data = await result.json();

			data = data.map(product => {
				const { id, name, category } = product;
				return { id, name, category };
			});
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const executeEventListeners = () => {
		hamburgerMenu.addEventListener('click', showMenu);
		menuListItems[3].addEventListener('click', showContact);
		DOMAddProductButtons.forEach(productButton => {
			productButton.addEventListener('click', addProduct);
		});
	};

	return {
		init: () => {
			executeEventListeners();
			getProductsFromJSON().then(products =>
				products.forEach(product => {
					console.log(product.id, product.name, product.category);
				}),
			);
		},
	};
})();
document.addEventListener('DOMContentLoaded', Main.init());
