let arrows = document.querySelectorAll('.filters__form__selectcontainer__arrow')

const brandsSelect = document.getElementById('brands')
const brandsSelectUl = document.querySelector('.selectbrands ul')
const brandsOptions = brandsSelect.querySelectorAll('option')

brandsOptions.forEach((option) => {
	let txt = option.innerText
	let li = document.createElement('li')
	li.innerHTML = `<span>${txt}</span>`
	brandsSelectUl.appendChild(li)
})

arrows.forEach((arrow) => {
	arrow.addEventListener('click', () => {
		if (arrow.nextElementSibling.querySelector('li')) {
			arrow.parentElement.classList.toggle('toggled')
			let filtered = arrows.filter(arr != arrow)
			filtered.forEach(fil => {
				fil.parentElement.classList.remove('toggled')
			})
		} else {
			let previousSelectContainer = arrow.parentElement.previousElementSibling
			if (previousSelectContainer.querySelector('li')) {
				previousSelectContainer.querySelector('.filters__form__selectcontainer__arrow').click()
			} else {
				document.querySelector('.filters__form__selectcontainer__arrow').click()
			}
		}
	})
})

// selecting brand
brandsSelectUl.querySelectorAll('li').forEach((li) => {
	li.addEventListener('click', async () => {
		let modelsSelect = document.getElementById('models')
		let modelsSelectUl = document.querySelector('.selectmodels ul')

		await clickEventInitialiser(
			li,
			brandsSelectUl,
			brandsURL,
			modelsSelect,
			modelsSelectUl
		)

		const carsSelect = document.getElementById('cars')
		const carsSelectUl = document.querySelector('.selectcars ul')
        
        document.querySelector('.selectmodels ul').querySelectorAll('li').forEach(modelLi => {
            modelLi.addEventListener('click', async () => {
                await clickEventInitialiser(
                    modelLi,
                    modelsSelectUl,
                    modelsURL,
                    carsSelect,
                    carsSelectUl,
                    true
                )
            })
        })

	})
})


const clickEventInitialiser = async (
	li,
	ulll,
	urlll,
	changeSel,
	changeSelUl,
    withlinks = false
) => {
	let arw = ulll.previousElementSibling
	let chsn = arw.previousElementSibling
	let value = li.innerText
	try {
		// let response = await axios.post(urlll, {
		//     value
		// })

		let response = {
			array: [
				{ id: 1, name: 'x1' },
				{ id: 2, name: 'x2' },
				{ id: 3, name: 'x3' },
				{ id: 4, name: 'x4' },
				{ id: 5, name: 'x5' },
				{ id: 6, name: 'x6' },
				{ id: 7, name: 'x7' },
				{ id: 8, name: 'x8' },
			],
		}
		let models = response.array
		changeSel.innerHTML = ''
		changeSelUl.innerHTML = ''
		models.forEach((model) => {
			let option = document.createElement('option')
			option.setAttribute('value', model.id)
			option.innerText = model.name
			changeSel.appendChild(option)
			let li = document.createElement('li')
            if (withlinks) {
                li.innerHTML = `<a href=${window.location.origin + "/products/" + model.id}>${model.name}</a>`
            } else {
                li.innerHTML = `<span>${model.name}</span>`
            }
			changeSelUl.appendChild(li)
		})
	} catch (error) {
		console.log(error)
	} finally {
		arw.click()
		chsn.innerText = value
	}
}

// click event for carsLiElements
