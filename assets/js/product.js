const catLis = document.querySelectorAll('.productsMain__categories__ul__li')
const innerLis = document.querySelectorAll(
	'.productsMain__categories__ul__li__ul__li'
)
const filterProducts = document.querySelector('.productsMain__content__filter')
const filterProductsArrow = document.querySelector('.productsMain__content__filter__arrow')
const productsMain = document.querySelector('.productsMain')
const partsUl = document.querySelector('.productsMain__content__parts__ul')

catLis.forEach((catli) => {
	const innerLiAmount = catli.querySelector('ul').children.length

	const maxHeight = innerLiAmount * 48 + (innerLiAmount - 1) * 8 + 16 + 8

	catli.style.setProperty('--maxheight', maxHeight + 'px')

	catli.querySelector('span').addEventListener('click', () => {
		catli.classList.toggle('toggled')
	})
})
innerLis.forEach((innercatli) => {
	innercatli.addEventListener('click', async () => {
        // show loader
        setLoader(true)

        partsUl.innerHTML = ''
        // data to send
        let dataToSend = {
            category: +innercatli.dataset.id
        }
		// get data
        let response, data
        try {
            // let response = await axios.post(URL_FOR_CATEGORIES, dataToSend) 
            let getResponse = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        data: [
                            {
                                id: 1,
                                name: 'პროდუქტი დასახელება 1',
                                brand: 'mercedes-benz',
                                code: 'JX-55842742',
                                price: 233.93,
                                image: 'assets/img/parts/part.jpg'
                            },
                            {
                                id: 2,
                                name: 'პროდუქტი დასახელება 2',
                                brand: 'mercedes-benz',
                                code: 'JX-55842742',
                                price: 488.41,
                                image: 'assets/img/parts/part.jpg'
                            },
                            {
                                id: 3,
                                name: 'პროდუქტი დასახელება 3',
                                brand: 'mercedes-benz',
                                code: 'JX-55842742',
                                price: 4901.48,
                                image: 'assets/img/parts/part.jpg'
                            },
                            {
                                id: 4,
                                name: 'პროდუქტი დასახელება 4',
                                brand: 'mercedes-benz',
                                code: 'JX-55842742',
                                price: 780.39,
                                image: 'assets/img/parts/part.jpg'
                            },
                            {
                                id: 5,
                                name: 'პროდუქტი დასახელება 5',
                                brand: 'mercedes-benz',
                                code: 'JX-55842742',
                                price: 322.11,
                                image: 'assets/img/parts/part.jpg'
                            },
                            {
                                id: 6,
                                name: 'პროდუქტი დასახელება 6',
                                brand: 'mercedes-benz',
                                code: 'JX-55842742',
                                price: 127.59,
                                image: 'assets/img/parts/part.jpg'
                            },
                            {
                                id: 7,
                                name: 'პროდუქტი დასახელება 7',
                                brand: 'mercedes-benz',
                                code: 'JX-55842742',
                                price: 441.33,
                                image: 'assets/img/parts/part.jpg'
                            },
                            {
                                id: 8,
                                name: 'პროდუქტი დასახელება 8',
                                brand: 'mercedes-benz',
                                code: 'JX-55842742',
                                price: 598.99,
                                image: 'assets/img/parts/part.jpg'
                            },
                        ]
                    })
                }, 800);
            })
            response = await getResponse
        } catch (error) {
            console.log(error)
        } finally {

            data = response.data
            if (data) {
                // render data
                data.forEach(product => {

                    let newLi = document.createElement('li')
                    newLi.className = 'topProducts__slider__wrapper__slide swiper-slide productsMain__content__parts__ul__li'
                    
                    let innerhtml = `
                        <div class="topProducts__slider__wrapper__slide__imgbox">
                            <img src="${product.image}" alt="productname">
                        </div>
                        <h3 title="${product.name}">${product.name}</h3>
                        <div class="topProducts__slider__wrapper__slide__info">
                            <span class="topProducts__slider__wrapper__slide__info__label">ბრენდი:</span>
                            <span class="topProducts__slider__wrapper__slide__info__value brand">${product.brand}</span>
                            <span class="topProducts__slider__wrapper__slide__info__label">პროდუქტის კოდი:</span>
                            <span class="topProducts__slider__wrapper__slide__info__value code">${product.code}</span>
                        </div>
                        <div class="topProducts__slider__wrapper__slide__price">₾<span>${product.price}</span></div>
                        <button data-id="${product.id}" type="button" class="topProducts__slider__wrapper__slide__addbtn">
                            <span>კალათაში დამატება</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0,0H24V24H0Z" fill="none"/><path d="M7,18a2,2,0,1,0,2,2A2,2,0,0,0,7,18ZM1,2V4H3l3.6,7.59L5.25,14.04A1.933,1.933,0,0,0,5,15a2.006,2.006,0,0,0,2,2H19V15H7.42a.248.248,0,0,1-.25-.25l.03-.12L8.1,13h7.45a1.991,1.991,0,0,0,1.75-1.03l3.58-6.49A.977.977,0,0,0,21,5a1,1,0,0,0-1-1H5.21L4.27,2H1ZM17,18a2,2,0,1,0,2,2A2,2,0,0,0,17,18Z" transform="translate(1)"/></svg>
                        </button>
                    `      
                    newLi.innerHTML = innerhtml              
                    
                    partsUl.appendChild(newLi)
                    let btn = newLi.querySelector('button')
                    btn.addEventListener('click', async (e) => {
                        e.preventDefault()
                        addBtnHandler(btn)
                    })
                })
                // hide loader
                setLoader(false)

                // show parts
                productsMain.classList.add('prts')
            } else {
                console.log("coudn't get data")
            }
        }


		// update active innerli
		let currentActive = document.querySelector(
			'.productsMain__categories__ul__li__ul__li.active'
		)
		currentActive && currentActive.classList.remove('active')
		innercatli.classList.add('active')
	})
})

filterProductsArrow.addEventListener('click', () => {
    if (productsMain.classList.contains('prts')) 
    filterProducts.classList.toggle('toggled')
})

filterProducts.querySelectorAll('li').forEach(filterli => {
    filterli.addEventListener('click', () => {
        if (!filterProducts.classList.contains('toggled')) filterProductsArrow.click()
        else {
            if (filterli.dataset.sort === 'incr') sortProducts()
            else sortProducts(true)
            filterProducts.querySelectorAll('li').forEach(each => {
                each.classList.toggle('active')
            })
            filterProductsArrow.click()
        }

    })
})

const sortProducts = (decreasing = false) => {
    setLoader(true)
    setTimeout(() => {      
        const parent = document.querySelector('.productsMain__content__parts__ul')
        console.log(parent)
        console.log(parent.children)
        const getPrice = (ele) =>
            Number(ele.querySelector('.topProducts__slider__wrapper__slide__price span').innerText.replace(/[^\d.]+/g, '')) || 0
        
        let arr = []
        arr.slice
            .call(parent.children)
            // sort them using custom sort function
            .sort((a, b) => {
                // get text content in .price and return difference
                if (decreasing) return getPrice(b) - getPrice(a)
                else return getPrice(a) - getPrice(b)
                // iterate and append again in new sorted order
            })
            .forEach((ele) => {
                parent.appendChild(ele)
            })
        setLoader(false)
    }, 800);
        
}


const categoriesWithImgs = document.querySelectorAll('.productsMain__content__categories__ul__li')

categoriesWithImgs.forEach(eachVisCat => {
    eachVisCat.addEventListener('click', () => {
        document.querySelector(`.productsMain__categories__ul__li[data-id="${eachVisCat.dataset.id}"] span`).click()
    })
})


const setLoader = (value) => {
    let loaderParent = document.querySelector('.productsMain__content')
    value ? loaderParent.classList.add('loaderon') : loaderParent.classList.remove('loaderon')
}