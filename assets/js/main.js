// set LANG ACTIVE
const langActiveLiAINTEXT = document.querySelector(
	'.languagebar__ul li.active a'
).innerText
const activeLangSpan = document.querySelector('.languagebar__active')
activeLangSpan.innerText = langActiveLiAINTEXT
const isHomePage = Boolean(document.querySelector('.topProducts'))
const body = document.querySelector('body')

const header = document.querySelector('header')
let headerHeight = header.offsetHeight

const headerBotFixer = () => {
	let opacityValue =
		window.pageYOffset >= 2 * headerHeight
			? 1
			: (window.pageYOffset - headerHeight) / 100

	if (window.pageYOffset > headerHeight) {
		header.style.backgroundColor = `rgba(32, 72, 157, ${opacityValue})`
	} else {
		header.style.backgroundColor = `rgba(32, 72, 157, 0)`
	}
}
headerBotFixer()
window.addEventListener(
	'scroll',
	() => {
		headerBotFixer()
	},
	false
)
let hmpgTopProducts = new Swiper('.topProducts__slider', {
	spaceBetween: 24,
	slidesPerView: 'auto',
	// observeParents: true,
	// observer: true,
	pagination: {
		el: '.topProducts__slider__pagination',
		type: 'bullets',
		clickable: true,
	},
	navigation: {
		nextEl: '.topProducts__slider__navRight',
		prevEl: '.topProducts__slider__navLeft',
	},
})

const addInBasketMessage = document.querySelector('.productAddMessage')
const addBtns = document.querySelectorAll(
	'.topProducts__slider__wrapper__slide__addbtn'
)
const inCartNum = document.querySelector(
	'.header__bottom__shoppingcart__number'
)

addBtns.forEach((btn) => {
	btn.addEventListener('click', async (e) => {
		e.preventDefault()
		let productId = btn.getAttribute('data-id')

		let response
		try {
			// response = await axios.post(addProductURL, {
			// 	id: productId
			// })
			response = {
				data: {
					productsInBasket: 5,
				},
			}
		} catch (error) {
			console.log(error.message)
		}

		if (!response.data) {
			addInBasketMessage.classList.add('error')
			addInBasketMessage.classList.add('shown')
			setTimeout(() => {
				addInBasketMessage.classList.remove('shown')
			}, 3000)
		} else {
			inCartNum.innerText = response.data.productsInBasket
			addInBasketMessage.classList.remove('error')
			addInBasketMessage.classList.add('shown')
			setTimeout(() => {
				addInBasketMessage.classList.remove('shown')
			}, 3000)
		}
	})
})

const blueBG = document.querySelector('.blueBG')
const burger = document.getElementById('burger')
const searchBtnMobile = document.getElementById('searchbarMobile')
const respoMenu = document.querySelector('.responsiveMenu')
const searchBarContainer = document.querySelector('.searchbar__container')
const responsiveNav = document.querySelector('.responsiveNavigation')

const searchInput = document.querySelector('.searchbar__input')

const isBurgerOn = () => {
	return blueBG.classList.contains('toggled')
}
const isSearchOn = () => {
	return blueBG.classList.contains('toggledForSearch')
}
const scrollTopFunction = async () => {
	document.body.scrollTop = 0 // For Safari
	document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
}
searchBtnMobile.addEventListener('click', () => {
	if (isBurgerOn()) {
		burger.click()
		setTimeout(() => {
			if (!isHomePage) {
				scrollTopFunction()
				blueBG.classList.add('toggledForSearch')
			} else {
				searchInput.focus()
				scrollTopFunction()
			}
		}, 600)
	} else {
		if (isSearchOn()) {
			if (!isHomePage) {
				searchBarContainer.style.animationDelay = 0
				searchBarContainer.style.animationFillMode = 'backwards'
				setTimeout(() => {
					blueBG.classList.remove('toggledForSearch')
					searchBarContainer.style.animationDelay = ''
					searchBarContainer.style.animationFillMode = ''
				}, 300)
			}
		} else {
			if (!isHomePage) {
				blueBG.classList.add('toggledForSearch')
			} else {
				searchInput.focus()
				scrollTopFunction()
			}
		}
	}
})

burger.addEventListener('click', () => {
	if (isSearchOn()) {
		searchBtnMobile.click()
		setTimeout(() => {
			scrollTopFunction()
			respoMenu.classList.add('active')
			blueBG.classList.add('toggled')
			responsiveNav.classList.add('toggled')
			body.classList.add('noscroll')
		}, 900)
	} else {
		if (isBurgerOn()) {
			respoMenu.classList.remove('active')
			blueBG.classList.remove('toggled')
			responsiveNav.classList.remove('toggled')
			body.classList.remove('noscroll')
		} else {
			scrollTopFunction()
			respoMenu.classList.add('active')
			blueBG.classList.add('toggled')
			responsiveNav.classList.add('toggled')
			body.classList.add('noscroll')
		}
	}
})
