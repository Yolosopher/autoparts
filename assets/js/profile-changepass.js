let oldpasswordInput = document.getElementById('oldpassword')
let newpasswordInput = document.getElementById('newpassword')
let repeatnewpasswordInput = document.getElementById('repeatnewpassword')


oldpasswordInput.addEventListener('change', () => {
    nameChecker(oldpasswordInput, 2)
})
newpasswordInput.addEventListener('change', () => {
    nameChecker(newpasswordInput, 2)
})
repeatnewpasswordInput.addEventListener('change', () => {
    repeatPassChecker(repeatnewpasswordInput, newpasswordInput)
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

const repeatPassChecker = (el, inputToCheck) => {
    let repeatedVal = el.value
    let passVal = inputToCheck.value

    if (repeatedVal === '') {
        el.parentElement.classList.add('invalid')
		el.parentElement.classList.remove('invalid-shown')
	} else if (repeatedVal !== passVal) {
		el.parentElement.classList.add('invalid')
		el.parentElement.classList.add('invalid-shown')
	} else {
		el.parentElement.classList.remove('invalid')
		el.parentElement.classList.remove('invalid-shown')
	}
}


const profileForm = document.querySelector('.profileContent__main__form.formChangepass')

profileForm.addEventListener('submit', e => {
    nameChecker(oldpasswordInput, 2)
    nameChecker(newpasswordInput, 2)
    repeatPassChecker(repeatnewpasswordInput, newpasswordInput)

    if (profileForm.querySelectorAll('.invalid')[0]) {
		e.preventDefault()
		profileForm.querySelectorAll('.invalid').forEach((each) => {
			each.classList.add('invalid-shown')
		})
	}
})