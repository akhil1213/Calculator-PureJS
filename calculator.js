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

let input = document.getElementById('input')
let result = document.getElementById('result')
const operations = ['+', '-', '*', '/']
const buttonClicked = (value) => {
    const resultText = result.innerHTML
    const inputString = input.innerHTML
    const inputLastChar = inputString.charAt(inputString.length - 1)
    if (isOperand(value) && !isOperand(resultText)) input.innerHTML = resultText//if the result is a number, and current value is an operand then you want to chain operations/expressions
    if (isOperand(value) && input.innerHTML == '') return//if current value is an operand and input string is blank return
    if (!isOperand(resultText)) result.innerHTML = 'Result'//reset result html since theres a new operation
    if (input.innerHTML == '0') {
        input.innerHTML = ''
        if (isOperand(value) && operations.includes(value)) {//for the case when you have 0(operand)anydigit
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
        if (inputIsZero) result.innerHTML = 0;
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
    input.innerHTML += inputLastChar == '-' && value == '-' ? '' : value
}

const clearClicked = (inputLastChar) => {
    const inputText = input.innerHTML
    if (isOperand(inputLastChar)) {//undo last operand
        input.innerHTML = inputText.splice(0, -1)
    } else {//undo last number
        const indexOfLastNum = findBegIndexOfLastNumber(inputText)
        input.innerHTML = indexOfLastNum == 0 ? '0' : inputText.substring(0, indexOfLastNum)
    }
}
/**
 * if the choice is not a floating point number
 * then it must be an operation
 * @param {value user entered} userChoice 
 */
const isOperand = (userChoice) => {
    const matchFloatDigitRegex = /[+-]?([0-9]*[.])?[0-9]+/
    return !userChoice.match(matchFloatDigitRegex)
}

const findBegIndexOfLastNumber = (inputText) => {
    for (let i = inputText.length - 1; i >= 0; i--) {
        if (isOperand(inputText.charAt(i))) return i + 1
    }
    return 0
}