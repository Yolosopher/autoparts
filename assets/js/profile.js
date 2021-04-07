let nameInput = document.getElementById('name')
let emailInput = document.getElementById('email')
let telInput = document.getElementById('tel')

nameInput.addEventListener('change', () => {
    nameChecker(nameInput)
})
emailInput.addEventListener('change', () => {
    emailChecker(emailInput)
})
telInput.addEventListener('change', () => {
    telChecker(telInput)
})


const nameChecker = (el, atleast = 5) => {
	let val = el.value

	if (val === '') {
		el.parentElement.classList.add('invalid')
		el.parentElement.classList.remove('invalid-shown')
	} else if (val.length < atleast) {
		el.parentElement.classList.add('invalid')
		el.parentElement.classList.add('invalid-shown')
	} else {
		el.parentElement.classList.remove('invalid')
		el.parentElement.classList.remove('invalid-shown')
	}
}

const emailChecker = (el) => {
	let val = el.value
	let ifEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val)

	if (val === '') {
		el.parentElement.classList.add('invalid')
		el.parentElement.classList.remove('invalid-shown')
	} else if (!ifEmail) {
		el.parentElement.classList.add('invalid')
		el.parentElement.classList.add('invalid-shown')
	} else {
		el.parentElement.classList.remove('invalid')
		el.parentElement.classList.remove('invalid-shown')
	}
}

const telChecker = (el) => {
	let value = el.value
	let parent = el.parentElement
	let ifTel = /^(5)\d{8}$/.test(value)

	if (value === '') {
		parent.classList.add('invalid')
		parent.classList.remove('invalid-shown')
	} else if (ifTel && value.length === 9) {
		parent.classList.remove('invalid')
		parent.classList.remove('invalid-shown')
	} else {
		parent.classList.add('invalid')
		parent.classList.add('invalid-shown')
	}
}

const profileForm = document.querySelector('.profileContent__main__form')

profileForm.addEventListener('submit', e => {
    nameChecker(nameInput)
    emailChecker(emailInput)
    telChecker(telInput)

    if (profileForm.querySelectorAll('.invalid')[0]) {
		e.preventDefault()
		profileForm.querySelectorAll('.invalid').forEach((each) => {
			each.classList.add('invalid-shown')
		})
	}
})