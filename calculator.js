let input = document.getElementById('input')
let result = document.getElementById('result')
const operations = ['+', '-', '*', '/']

const buttonClicked = (value) => {
    const resultText = result.innerHTML
    const inputString = input.innerHTML
    const inputLastChar = inputString.charAt(inputString.length - 1)
    /*
        for the case when you have a number and user accidentaly inputs
        decimals after decimals i.e (54.56.75)
    */
    if (value == '.' && countDecimals(input.innerHTML) == 1) return
    /*
        if the result is a number, and current value is an operand then you want to chain
        operations/expressions
    */
    if (isOperand(value) && !isOperand(resultText)) input.innerHTML = resultText

    //if current value is an operand and input string is blank return
    if (isOperand(value) && input.innerHTML == '') return

    //reset result html since theres a new operation
    if (!isOperand(resultText)) result.innerHTML = 'Result'

    if (input.innerHTML == '0') {
        input.innerHTML = ''
        //for the case when you have 0(operand)anydigit
        if (isOperand(value) && operations.includes(value)) {
            input.innerHTML = `0${value}`
            return
        }
    }
    if (value == 'clear' || value == 'undo') {
        clearClicked(inputLastChar)
        return
    }
    if (value == 'enter' || value == '=') {
        if (isOperand(inputLastChar) && inputLastChar != '.') {
            return//if last char is an operand and not a decimal, no need to evaluate
        }
        const inputIsZero = input.innerHTML == 0
        if (inputIsZero) result.innerHTML = 0;//evaluating 0 is just zero
        result.innerHTML = !inputIsZero ? eval(input.innerHTML) : result.innerHTML
        input.innerHTML = '0'
        return
    }
    /*
        for the case when user wants to replace operand choice 
        and when user wants to perform operations on negative numbers 
    */
    if (isOperand(inputLastChar) && operations.includes(value)) {
        //when the user enters +-, the - shouldnt be replaced with any other operand, you don't want +*
        const secondTwoLastChar = inputString.charAt(inputString.length - 2)
        if (operations.includes(secondTwoLastChar)) return
        if (value != '-') {
            input.innerHTML = input.innerHTML.slice(0, -1) + value;
            return;
        }
    }
    //if last char is a minus sign, don't concatenate for negative number operations
    input.innerHTML += inputLastChar == '-' && value == '-' ? '' : value
}
/**
 * returns number of decimals of last number
 * which is numbers from right before first operand
 * @param {string} text
 * @return {number} 
 */
const countDecimals = (text) => {
    let decimalCount = 0
    for (let i = text.length - 1; i >= 0; i--) {
        if (isOperand(text.charAt(i)) && text.charAt(i) != '.') break
        if (text.charAt(i) == '.') decimalCount++
    }
    return decimalCount
}
/**
 * if the last character of the input text is an operand then undo operand
 * else its a number so you find the beginning index of the last number and remove
 * @param {char} inputLastChar 
 */
const clearClicked = (inputLastChar) => {
    const inputText = input.innerHTML
    if (isOperand(inputLastChar) && inputLastChar != '.') {//undo last operand
        input.innerHTML = inputText.slice(0, -1)
    } else {//undo last number
        const indexOfLastNum = findBegIndexOfLastNumber(inputText)
        input.innerHTML = indexOfLastNum == 0 ? '0' : inputText.substring(0, indexOfLastNum)
    }
}
/**
 * if the choice is not a floating point number
 * then it must be an operand 
 * @param {character} userChoice 
 * @return {boolean} 
 */
const isOperand = (userChoice) => {
    const matchFloatDigitRegex = /[+-]?([0-9]*[.])?[0-9]+/
    return !userChoice.match(matchFloatDigitRegex)
}
/**
 * iterate through expression backwards and 
 * find first operand and return index to the right
 * which is the beginning of the last number
 * @param {string} inputText 
 * @return {number} begIndexOfLastNum
 */
const findBegIndexOfLastNumber = (inputText) => {
    for (let i = inputText.length - 1; i >= 0; i--) {
        const currentChar = inputText.charAt(i)
        if (isOperand(currentChar) && currentChar != '.') return i + 1
    }
    return 0
}
const validateKey = (keyValue) => {
    if (keyValue == 'backspace' || keyValue == 'enter' || keyValue == '*') return true
    const validInputRegex = /[0-9]*[+./=-]*/
    console.log(keyValue.match(validInputRegex)[0])
    return keyValue.match(validInputRegex)[0] == keyValue
}

// let prevClickedElement;
// let validateKeyPressedRegexp = new RegExp(/[0-9]*[+./=-]*/) !validateKeyPressedRegexp.test(keyPressedText)
this.addEventListener('keyup', (e) => {
    const keyPressedText = e.key.toLowerCase()
    const validInputRegex = /[0-9]*[+./=-]*/
    console.log(keyPressedText)
    if (!validateKey(keyPressedText)) {
        console.log('invalid key')
        return
    }
    const addClickedAnimation = (buttonId) => {
        document.getElementById(buttonId).classList.add('clicked')
        setTimeout(() => {
            document.getElementById(buttonId).classList.remove('clicked')
        }, 200)
    }

    if (keyPressedText == 'backspace') {
        buttonClicked('clear')
        addClickedAnimation('clear')
        addClickedAnimation('undo')
        return
    }
    buttonClicked(keyPressedText)
    addClickedAnimation(keyPressedText)
    // if (prevClickedElement != undefined) prevClickedElement.classList.remove('clicked')
    // prevClickedElement = curClickedElement
});

// const buildCalculator = () => {
    //     let numbers = '<tr>'
    //     for (let i = 1; i <= 9; i++) {
        //         numbers += `<td class='number'><button>${i}</button></td>`
        //         numbers += i == 3 ? '<td class=\'number\'><button>-</button></td>' : ''
        //         numbers += i == 6 ? '<td class=\'number\'><button>+</button></td>' : ''
        //         numbers += i % 3 == 0 ? '</tr><tr>' : ''
        //     }
        //     document.getElementById('calculator').insertAdjacentHTML('afterbegin', numbers)
        // }

// if ((!validButtons.includes(keyPressedText) &&
//     keyPressedText.charAt(0).toUpperCase() != keyPressedText.charAt(0).toLowerCase())
//     || invalidKeys.includes(keyPressedText)
// ) {
//     return
// }