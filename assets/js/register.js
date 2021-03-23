// legal inputs
let nameInputLegal = document.getElementById('legalname')
let identificationCodeInputLegal = document.getElementById('legalidentificationcode')
let emailInputLegal = document.getElementById('legalemail')
let telInputLegal = document.getElementById('legaltel')
let passwordInputLegal = document.getElementById('legalpassword')
let passwordRepeatInputLegal = document.getElementById('legalpasswordrepeat')

// individual inputs
let nameInputIndividual = document.getElementById('individualname')
let personalidInputIndividual = document.getElementById('individualpersonalid')
let emailInputIndividual = document.getElementById('individualemail')
let telInputIndividual = document.getElementById('individualtel')
let passwordInputIndividual = document.getElementById('individualpassword')
let passwordRepeatInputIndividual = document.getElementById('individualpasswordrepeat')

// names
nameInputIndividual.addEventListener('change', () => {
    nameChecker(nameInputIndividual)
})
nameInputLegal.addEventListener('change', () => {
	nameChecker(nameInputLegal)
})
// persId / itendifCode
personalidInputIndividual.addEventListener('change', () => {
    personalIdChecker(personalidInputIndividual)
})
identificationCodeInputLegal.addEventListener('change', () => {
    nameChecker(identificationCodeInputLegal, 3)
})
// email
emailInputLegal.addEventListener('change', () => {
    emailChecker(emailInputLegal)
})
emailInputIndividual.addEventListener('change', () => {
    emailChecker(emailInputIndividual)
})
// tel
telInputLegal.addEventListener('change', () => {
    telChecker(telInputLegal)
})
telInputIndividual.addEventListener('change', () => {
    telChecker(telInputIndividual)
})
// passwords
passwordInputLegal.addEventListener('change', () => {
    nameChecker(passwordInputLegal, 2)
})
passwordInputIndividual.addEventListener('change', () => {
    nameChecker(passwordInputIndividual, 2)
})
// repeated passwords
passwordRepeatInputIndividual.addEventListener('change', () => {
    repeatPassChecker(passwordRepeatInputIndividual, passwordInputIndividual)
})
passwordRepeatInputLegal.addEventListener('change', () => {
    repeatPassChecker(passwordRepeatInputLegal, passwordInputLegal)
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
const personalIdChecker = (el) => {
	let val = el.value

	if (val === '') {
		el.parentElement.classList.add('invalid')
		el.parentElement.classList.remove('invalid-shown')
	} else if (val.length !== 11) {
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

const regisFormLegal = document.getElementById('regisFormLegal')
const regisFormIndividual = document.getElementById('regisFormIndividual')

regisFormLegal.addEventListener('submit', (e) => {
    nameChecker(nameInputLegal)
    nameChecker(identificationCodeInputLegal, 3)
    emailChecker(emailInputLegal)
    telChecker(telInputLegal)
    nameChecker(passwordInputLegal, 2)
    repeatPassChecker(passwordRepeatInputLegal, passwordInputLegal)

	if (regisFormLegal.querySelectorAll('.invalid')[0]) {
		e.preventDefault()
		regisFormLegal.querySelectorAll('.invalid').forEach((each) => {
			each.classList.add('invalid-shown')
		})
	}
})
regisFormIndividual.addEventListener('submit', (e) => {
    nameChecker(nameInputIndividual)
    personalIdChecker(personalidInputIndividual)
    emailChecker(emailInputIndividual)
    telChecker(telInputIndividual)
    nameChecker(passwordInputIndividual, 2)
    repeatPassChecker(passwordRepeatInputIndividual, passwordInputIndividual)

	if (regisFormIndividual.querySelectorAll('.invalid')[0]) {
		e.preventDefault()
		regisFormIndividual.querySelectorAll('.invalid').forEach((each) => {
			each.classList.add('invalid-shown')
		})
	}
})
