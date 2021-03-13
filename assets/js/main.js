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

const addInBasketMessage = document.querySelector('.productAddMessage')
const addBtns = document.querySelectorAll(
	'.topProducts__slider__wrapper__slide__addbtn'
)
const inCartNum = document.querySelector(
	'.header__bottom__shoppingcart__number'
)



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

	let removebtn = li.querySelector(
		'.header__bottom__shoppingcart__popup__ul__li__removebtn'
	)

	plus.addEventListener('click', () => {
		shopcartIncDecrementer(id, input, unitPrice, priceSpan)
	})
	minus.addEventListener('click', () => {
		shopcartIncDecrementer(id, input, unitPrice, priceSpan, true)
	})
	removebtn.addEventListener('click', () => {
		shopcartRemover(id, li)
	})
}


const shopcartRemover = async (id, el) => {
	// let response = await axios.post(cartRemoveUrl, { id })
	let response = { data: { success: true } }
	if (response.data.success) {
		el.remove()
	}
}
shoppingCartLis.forEach((li) => {
	shoppcartliinitialiser(li)
})

const shopcartIncDecrementer = async (id, inp, prc, prcSPan, decrem = false) => {
	let val = +inp.value
	if (decrem) {
		if (val !== 1) {
			--val
			// let response = await axios.post(cartChangeUrl, { id, quantity: val })
			let response = { data: { success: true } }
			if (response.data.success) {
				inp.value = val
			} else {
				return false
			}
		} else {
			return false
		}
	} else {
		++val
		// let response = await axios.post(cartChangeUrl, { id, quantity: val })
		let response = { data: { success: true } }
		if (response.data.success) {
			inp.value = val
		} else {
			return false
		}
	}
	prcSPan.innerText = +inp.value * prc
}




addBtns.forEach((btn) => {
	btn.addEventListener('click', async (e) => {
		e.preventDefault()
		let productId = btn.getAttribute('data-id')
		let title = btn.parentElement.querySelector('h3').getAttribute('title')
		let brand = btn.parentElement.querySelector('.topProducts__slider__wrapper__slide__info__value.brand').innerText
		let code = btn.parentElement.querySelector('.topProducts__slider__wrapper__slide__info__value.code').innerText
		let price = btn.parentElement.querySelector('.topProducts__slider__wrapper__slide__price span').innerText
		let imgsrc = btn.parentElement.querySelector('.topProducts__slider__wrapper__slide__imgbox img').getAttribute('src')
		let link = btn.parentElement.querySelector('.topProducts__slider__wrapper__slide__imgbox').getAttribute('href')
		

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
							<div class="header__bottom__shoppingcart__popup__ul__li__mid__bottom__codename">კოდი: <span>${code}</span></div>
							<div class="header__bottom__shoppingcart__popup__ul__li__mid__bottom__brandname">ბრენდი: <span>${brand}</span></div>
						</div>
					</div>
					<form class="header__bottom__shoppingcart__popup__ul__li__form">
						<div class="header__bottom__shoppingcart__popup__ul__li__form__controls">
							<div class="header__bottom__shoppingcart__popup__ul__li__form__minus"><span></span></div>
							<input type="number" name="num" class="header__bottom__shoppingcart__popup__ul__li__form__num" value="1" min="01">
							<div class="header__bottom__shoppingcart__popup__ul__li__form__plus">
								<span class="header__bottom__shoppingcart__popup__ul__li__form__plus__one"></span>
								<span class="header__bottom__shoppingcart__popup__ul__li__form__plus__two"></span>
							</div>
						</div>
					</form>
					<div class="header__bottom__shoppingcart__popup__ul__li__form__price">₾<span>${price}</span></div>
					<button type="button" class="header__bottom__shoppingcart__popup__ul__li__removebtn">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0,0H24V24H0Z" fill="none"/><path d="M19,13H13v6H11V13H5V11h6V5h2v6h6Z" transform="translate(12 -4.971) rotate(45)"/></svg>
					</button>
			`
			let li = document.createElement('li')
			
			document.querySelector('.header__bottom__shoppingcart__popup__ul').appendChild(li)

			li.classList.add('header__bottom__shoppingcart__popup__ul__li')
			li.setAttribute('data-id', productId)
			li.setAttribute('data-price', price)
			li.innerHTML = innerhtml

			console.log(li)

			await shoppcartliinitialiser(li)
		}
	})
})