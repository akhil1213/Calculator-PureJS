import { setClickListenersForEachButton, isOperand, clearClicked, countDecimals } from './buttonClickHelper.js'
import keyboardPressedLogic from './calcKeyboard.js'

let input = document.getElementById('input')
let result = document.getElementById('result')
const operations = ['+', '-', '*', '/']
const buttonClicked = (value) => {
    console.log(value)
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

keyboardPressedLogic(buttonClicked)
setClickListenersForEachButton(buttonClicked)



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