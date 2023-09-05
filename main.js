const month = document.getElementById('month');
const year = document.getElementById('year');
const cvv = document.getElementById('cvv');
const cvvNum = document.getElementById('cvv-num');
const submit = document.getElementById('submit');
const owner = document.getElementById('owner');
const cardHolder = document.getElementById('card-holder');
const exp = document.getElementById('exp');
const expY = document.getElementById('expY');
const form = document.querySelector('[name="input-field"]')
const cardDetails = document.querySelectorAll('.card-number input')
const input1 = document.getElementById('input1')
const input2 = document.getElementById('input2')
const input3 = document.getElementById('input3')
const input4 = document.getElementById('input4')
const cardProvider = document.getElementById('provider')
const flip = document.getElementById('card-section')
const invalidCardNumber = document.getElementById('card-number-error')
const invalidCvv = document.getElementById('cvv-error')
const expErr = document.getElementById('exp-error')
const holderError = document.getElementById('holder-error')

const validProviders = [2, 5, 4, 3]
const day = new Date()
const maxYear = 5
const yearArr = ['',]
const months = ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

flip.addEventListener('click', () => {
    flip.classList.toggle('card-section')
})
//populate the yearArr with a max of 5yrs excluding the current year
for (let i = 0; i <= maxYear; i++) {
    yearArr.push(day.getFullYear() + i)
}

//restrict input of type number for card number to 4
function restrictInput(input) {
    input1.textContent = cardDetails[0].value.slice(0, 4)
    input2.textContent = cardDetails[1].value.slice(0, 4)
    input3.textContent = cardDetails[2].value.slice(0, 4)
    input4.textContent = cardDetails[3].value.slice(0, 4)
    const firstDigit = another()
    const convert = Number(firstDigit)
    if (input.value.length > 4) {
        input.value = input.value.slice(0, 4);
    } else if (validProviders.includes(convert)) {
        invalidCardNumber.replaceChildren()
    } else {
        invalidCardNumber.textContent = `invalid provider`
    }

}

//restrict input of type number for cvv number to 3
function restrictInputAlt(input) {
    if (input.value.length > 3) {
        input.value = input.value.slice(0, 3);
    }
    cvvNum.textContent = cvv.value
}

month.innerHTML = months.map((itm, idx) => {
    return (
        `<option value=${idx === 0 ? null : itm} class=${idx === 0 ? 'option optionALt' : 'option'}>
         ${itm}
        </option>`
    )
}).join(",")

year.innerHTML = yearArr.map((itm, idx) => {
    return (
        `<option value=${idx === 0 ? null : itm} class=${idx === 0 ? 'option optionALt' : 'option'}>
          ${itm}
        </option>`
    )
}).join(",")



function onInput() {
    let value = cardHolder.value
    owner.textContent = value

    if (value.length > 20) {
        owner.textContent = value.slice(0, 20) + '.......'
    }
}

function onMonthInput() {
    const value = Number(month.value)
    exp.textContent = month.value

    if (day.getMonth() + 1 > value) {
        expErr.textContent = `enter a valid expiration date`
    } else {
        expErr.textContent = ``
    }

}
function onYearInput() {
    expY.textContent = '/ ' + year.value
}
form.addEventListener('input', (e) => {
    const inputs = e.target;
    if (inputs.nextElementSibling && inputs.value.length > 3) {
        inputs.nextElementSibling.focus()
    }
})


let content = ""
function another() {
    let firstNumber = cardDetails[0].value[0];

    if (firstNumber == 2) {
        content = `<img src="/assets/master.png" alt="hologram" class="hologram card-logo"></img>`;
    } else if (firstNumber == 5) {
        content = `<img src="/assets/master.png" alt="hologram" class="hologram card-logo"></img>`;
    } else if (firstNumber == 4) {
        content = `<img src="/assets/visa.png" alt="hologram" class="hologram card-logo"></img>`;
    } else if (firstNumber == 3) {
        content = `<img src="/assets/american-express.png" alt="hologram" class="hologram card-logo express"></img>`;
    } else {
        content = `<img src="/assets/loading.svg" alt="hologram" class="hologram card-logo"></img>`;
    }
    cardProvider.innerHTML = content

    return firstNumber
}



//handle some checks onSubmit
submit.addEventListener('click', () => {
    let firstDigit = another()
    let convert = Number(firstDigit);
    const value = Number(month.value)
    let cvvLength = cvv.value.toString().length
    let input1 = cardDetails[0].value.length
    let input2 = cardDetails[1].value.length
    let input3 = cardDetails[2].value.length
    let input4 = cardDetails[3].value.length
    let totalLength = input1 + input2 + input3 + input4

    //validate the card number and provider
    if (validProviders.includes(convert) && totalLength >= 16) {
        invalidCardNumber.replaceChildren()
    } else {
        invalidCardNumber.textContent = `invalid card number`
        return;
    }

    //check if the card holder name is empty
    if (cardHolder.value) {
        holderError.replaceChildren()
    } else {
        holderError.textContent = `can't be empty`
        return;
    }

    if (day.getMonth() + 1 > value) {
        expErr.textContent = `enter a valid expiration date`
        return;
    } else {
        expErr.textContent = ``
    }

    //validate the card expiration date
    if (month.value === 'null' || year.value === 'null') {
        expErr.textContent = `enter an expiration date`
        return;
    } else {
        expErr.replaceChildren()
    }


    //validate the cvv which must not be less than 3
    if (cvvLength < 3) {
        invalidCvv.textContent = `invalid cvv`
        flip.classList.add('card-section')
        return;
    } else {
        invalidCvv.replaceChildren()
        flip.classList.remove('card-section')
    }

    return alert("Your payment was successful");
})