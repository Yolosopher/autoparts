const nameInput = document.getElementById('name')
const personalIdInput = document.getElementById('personal-id')
const emailInput = document.getElementById('email')
const telInput = document.getElementById('tel')
const exactaddressInput = document.getElementById('exactaddress')
const totalpriceInput = document.getElementById('totalprice')
const agreetermsCheckbox = document.getElementById('agreeterms')

nameInput.addEventListener('change', () => {
    nameChecker(nameInput)
})
personalIdInput.addEventListener('change', () => {
    personalIdChecker(personalIdInput)
})
emailInput.addEventListener('change', () => {
    emailChecker(emailInput)
})
telInput.addEventListener('change', () => {
    telChecker(telInput)
})
exactaddressInput.addEventListener('change', () => {
    telChecker(exactaddressInput)
})
totalpriceInput.addEventListener('change', () => {
    totalpriceChecker(totalpriceInput)
})

const nameChecker = (el) => {
    let val = el.value

    if (val === '') {
        el.parentElement.classList.add('invalid')
        el.parentElement.classList.remove('invalid-shown')
    } else if (val.length < 2) {
        el.parentElement.classList.add('invalid')
        el.parentElement.classList.add('invalid-shown')
    } else {
        el.parentElement.classList.remove('invalid')
        el.parentElement.classList.remove('invalid-shown')
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
    let value = telPut.value
	let parent = telPut.parentElement
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

const exactaddressChecker = (el) => {
    let val = el.value

    if (val === '') {
        el.parentElement.classList.add('invalid')
        el.parentElement.classList.remove('invalid-shown')
    } else if (val.length < 10) {
        el.parentElement.classList.add('invalid')
        el.parentElement.classList.add('invalid-shown')
    } else {
        el.parentElement.classList.remove('invalid')
        el.parentElement.classList.remove('invalid-shown')
    }
}

const totalpriceChecker = (el) => {
    let val = Number(el.value)

    if (el.value === '') {
        el.parentElement.classList.add('invalid')
        el.parentElement.classList.remove('invalid-shown')
    } else if (val < 20) {
        el.parentElement.classList.add('invalid')
        el.parentElement.classList.add('invalid-shown')
    } else {
        el.parentElement.classList.remove('invalid')
        el.parentElement.classList.remove('invalid-shown')
    }
}

const agreetermsCheckboxChecker = () => {
    if (agreetermsCheckbox.checked) return true
    return false
}
