let _token = document.querySelector('input[name=_token]') ? document.querySelector('input[name=_token]').value : undefined
// set LANG ACTIVE
const langActiveLiAINTEXT = document.querySelector(
	'.languagebar__ul li.active a'
).innerText.trim()
const activeLangSpan = document.querySelector('.languagebar__active')
activeLangSpan.innerText = langActiveLiAINTEXT
const isHomePage = Boolean(document.querySelector('.topProducts'))
const isCartPage = Boolean(document.querySelector('.cartpageMain'))
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
if (!body.classList.contains('smallheader')) {
	headerBotFixer()
	window.addEventListener(
		'scroll',
		() => {
			headerBotFixer()
		},
		false
	)
}

const addInBasketMessage = document.querySelector('.productAddMessage')
const addBtns = document.querySelectorAll(
	'.topProducts__slider__wrapper__slide__addbtn'
)
const inCartNum = document.querySelector(
	'.header__bottom__shoppingcart__number'
)
const setInputWidthByChars = (el) => {
	el.style.width = `${el.value.length > 2 ? el.value.length : 3}ch`
}

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
if (!isHomePage) {
	searchBarContainer.classList.add('nothmpg')
}
searchBtnMobile.addEventListener('click', () => {
	if (isBurgerOn()) {
		burger.click()
		setTimeout(() => {
			if (!isHomePage) {
				scrollTopFunction()
				blueBG.classList.add('toggledForSearch')
				searchInput.focus()
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
					searchBarContainer.style.height = ''
					searchBarContainer.style.animationDelay = ''
					searchBarContainer.style.animationFillMode = ''
				}, 300)
			}
		} else {
			if (!isHomePage) {
				searchBarContainer.style.height = '64px'
				blueBG.classList.add('toggledForSearch')
				searchInput.focus()
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

// basket controls
const shoppingcart = document.querySelector('.header__bottom__shoppingcart')
const shoppingcartPopup = document.querySelector(
	'.header__bottom__shoppingcart__popup'
)

shoppingcart.addEventListener('mouseenter', () => {
	shoppingcart.classList.add('toggled')
})

shoppingcartPopup.addEventListener('mouseleave', () => {
	shoppingcart.classList.remove('toggled')
})
const cartpagetotal = document.querySelector(
	'.cartpageMain__products__infopanel__left__totalprice span'
)
let shoppingCartLis = document.querySelectorAll(
	'.header__bottom__shoppingcart__popup__ul__li'
)
const shoppcartliinitialiser = async (li) => {
	let id = +li.getAttribute('data-id')
	let unitPrice = +li.getAttribute('data-price')
	let minus = li.querySelector(
		'.header__bottom__shoppingcart__popup__ul__li__form__minus'
	)
	let plus = li.querySelector(
		'.header__bottom__shoppingcart__popup__ul__li__form__plus'
	)

	let input = li.querySelector(
		'.header__bottom__shoppingcart__popup__ul__li__form__num'
	)

	let priceSpan = li.querySelector(
		'.header__bottom__shoppingcart__popup__ul__li__form__price span'
	)

	// let removebtn = li.querySelector(
	// 	'.header__bottom__shoppingcart__popup__ul__li__removebtn'
	// )

	plus.addEventListener('click', () => {
		shopcartIncDecrementer(id, input, unitPrice, priceSpan)
	})
	minus.addEventListener('click', () => {
		shopcartIncDecrementer(id, input, unitPrice, priceSpan, true)
	})
	// removebtn.addEventListener('click', () => {
	// 	shopcartRemover(id, li)
	// })
}

const shopcartRemover = async (id, el, all = false) => {
	if (all) {
		let response = await axios.post(cartRemoveUrl, { all: true })
		// let response = { data: { success: true } }
		if (response.data.success) {
			el.forEach((each) => each.remove())
			updateTotalPrice()
		}
	} else {
		let response = await axios.post(cartRemoveUrl, { id })
		// let response = { data: { success: true } }
		if (response.data.success) {
			el.remove()
			updateTotalPrice()
		}
	}
}
shoppingCartLis.forEach((li) => {
	shoppcartliinitialiser(li)
})

const shopcartIncDecrementer = async (
	id = false,
	inp,
	prc,
	prcSPan,
	decrem = false
) => {
	let val = +inp.value
	if (decrem) {
		console.log('check here! 2')
		if (val !== 1) {
			--val
			let response = await axios.post(cartChangeUrl, { id, token: _token, action: 'minus' })
			console.log('before response.data')
			// let response = { data: { success: true } }
			console.log(response.data)
			if (response.data.status) {
				inp.value = val
				inCartNum.innerText = response.data.cart_items_count
			} else {
				return false
			}
		} else {
			return false
		}
	} else {
		++val
		let response = await axios.post(cartChangeUrl, { id, token: _token, action: 'plus' })
		// let response = { data: { success: true } }
		console.log(response.data)
		if (response.data.status) {
			inp.value = val
			inCartNum.innerText = response.data.cart_items_count
		} else {
			return false
		}
	}
	prcSPan.innerText = +inp.value * prc
	updateTotalPrice()
}

const updateTotalPrice = () => {
	let alltotalprices = document.querySelectorAll(
		'.header__bottom__shoppingcart__popup__ul__li__form__price span'
	)
	let inputtotalprice = document.getElementById('totalprice')
	let inputdeliveryprice = document.getElementById('deliveryprice')
	alltotalprices = [...alltotalprices]
	let total = 0
	alltotalprices.forEach((each) => {
		let price = +each.innerText
		total += price
	})

	cartpagetotal !== null ? (cartpagetotal.innerText = total) : null
	inputtotalprice !== null
		? (inputtotalprice.value = total + +inputdeliveryprice.value)
		: null
}

const addBtnHandler = async (btn) => {
	let productId = btn.getAttribute('data-id')
	let title = btn.parentElement.querySelector('h3').getAttribute('title')
	let brand = btn.parentElement.querySelector(
		'.topProducts__slider__wrapper__slide__info__value.brand'
	).innerText
	let code = btn.parentElement.querySelector(
		'.topProducts__slider__wrapper__slide__info__value.code'
	).innerText
	let price = btn.parentElement.querySelector(
		'.topProducts__slider__wrapper__slide__price span'
	).innerText
	let imgsrc = btn.parentElement
		.querySelector('.topProducts__slider__wrapper__slide__imgbox img')
		.getAttribute('src')
	let link = btn.parentElement
		.querySelector('.topProducts__slider__wrapper__slide__imgbox')
		.getAttribute('href')

	let response
	try {
		response = await axios.post(addProductURL, {
			id: productId,
			qty: 1,
			token: _token
		})
		// response = {
		// 	data: {
		// 		productsInBasket: 5,
		// 	},
		// }
	} catch (error) {
		console.log(error.message)
	}
	console.log(response.data)
	if (!response.data.status) {
		addInBasketMessage.classList.add('error')
		addInBasketMessage.classList.add('shown')
		setTimeout(() => {
			addInBasketMessage.classList.remove('shown')
		}, 3000)
	} else {
		inCartNum.innerText = response.data.cart_items_count
		addInBasketMessage.classList.remove('error')
		addInBasketMessage.classList.add('shown')
		setTimeout(() => {
			addInBasketMessage.classList.remove('shown')
		}, 3000)

		// Create New Li In shoppingcart
		// Create New Li In shoppingcart
		// Create New Li In shoppingcart
		let innerhtml = `
				<a href="${link}" class="header__bottom__shoppingcart__popup__ul__li__imgbox">
					<img src="${imgsrc}">
				</a>
				<div class="header__bottom__shoppingcart__popup__ul__li__mid">
					<h5><a href="${link}">${title}</a></h5>
					<div class="header__bottom__shoppingcart__popup__ul__li__mid__bottom">
						<div class="header__bottom__shoppingcart__popup__ul__li__mid__bottom__codename">????????????: <span>${code}</span></div>
						<div class="header__bottom__shoppingcart__popup__ul__li__mid__bottom__brandname">??????????????????: <span>${brand}</span></div>
					</div>
				</div>
				<form class="header__bottom__shoppingcart__popup__ul__li__form">
					<div class="header__bottom__shoppingcart__popup__ul__li__form__controls">
						<div class="header__bottom__shoppingcart__popup__ul__li__form__minus"><span></span></div>
						<input type="number" disabled name="num" class="header__bottom__shoppingcart__popup__ul__li__form__num" value="1" min="01">
						<div class="header__bottom__shoppingcart__popup__ul__li__form__plus">
							<span class="header__bottom__shoppingcart__popup__ul__li__form__plus__one"></span>
							<span class="header__bottom__shoppingcart__popup__ul__li__form__plus__two"></span>
						</div>
					</div>
				</form>
				<div class="header__bottom__shoppingcart__popup__ul__li__form__price">???<span>${price}</span></div>
				<a href="${window.location.href + '/' + 'cart-remove/' + productId}" class="header__bottom__shoppingcart__popup__ul__li__removebtn">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0,0H24V24H0Z" fill="none"/><path d="M19,13H13v6H11V13H5V11h6V5h2v6h6Z" transform="translate(12 -4.971) rotate(45)"/></svg>
				</a>
		`
		let li = document.createElement('li')

		document
			.querySelector('.header__bottom__shoppingcart__popup__ul')
			.appendChild(li)

		li.classList.add('header__bottom__shoppingcart__popup__ul__li')
		li.setAttribute('data-id', productId)
		li.setAttribute('data-price', price)
		li.innerHTML = innerhtml

		await shoppcartliinitialiser(li)
	}
}


updateTotalPrice()
addBtns.forEach((btn) => {
	btn.addEventListener('click', async (e) => {
		e.preventDefault()
		addBtnHandler(btn)
	})
})

if (isCartPage) {
	document.querySelector('.header__bottom__shoppingcart__popup').remove()
	let removeAllBtn = document.querySelector(
		'.cartpageMain__products__infopanel__cleanBasket'
	)

	removeAllBtn.addEventListener('click', () => {
		let allCartLis = document.querySelectorAll(
			'.cartpageMain .header__bottom__shoppingcart__popup__ul__li'
		)
		allCartLis = [...allCartLis]
		if (allCartLis[0]) {
			shopcartRemover(true, allCartLis, true)
		}
	})
}
document
	.querySelectorAll('.header__bottom__shoppingcart__popup__ul__li__form')
	.forEach((each) => {
		each.addEventListener('submit', (e) => e.preventDefault())
	})
document
	.querySelectorAll('.header__bottom__shoppingcart__popup__ul__li__form__num')
	.forEach((each) => {
		each.disabled = true
	})
let allCartLis = document.querySelectorAll(
	'.cartpageMain .header__bottom__shoppingcart__popup__ul__li'
)
