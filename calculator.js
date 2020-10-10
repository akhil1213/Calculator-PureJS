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
const buttonClicked = (value) => {
    const resultText = result.innerHTML
    const inputString = input.innerHTML
    if (isOperand(value) && inputString == '') return//if current value is an operand and input string is blank return
    if (!isOperand(resultText.charAt(0))) result.innerHTML = 'Result'//reset result html since theres a new operation
    if (input.innerHTML == '0') input.innerHTML = ''
    if (value == 'clear' || value == 'undo') {
        clearClicked()
        return
    }
    if (value == 'enter' || value == '=') {
        if (isOperand(inputString.charAt(inputString.length - 1))) return//if last char is an operand, no need to evaluate
        if (inputString == 0) result.innerHTML = 0
        result.innerHTML = eval(input.innerHTML)
        input.innerHTML = '0'
        return
    }
    input.innerHTML += value
}

const clearClicked = () => {
    const inputText = input.innerHTML
    if (isOperand(inputText.charAt(inputText.length - 1))) {//undo operand
        input.innerHTML = inputText.substring(0, inputText.length - 1)
    } else {//undo last number
        const indexOfLastNum = findBegIndexOfLastNumber(inputText)
        input.innerHTML = indexOfLastNum == 0 ? '0' : inputText.substring(0, indexOfLastNum)
    }
}

const isOperand = (userChoice) => {
    const matchDigitRegex = /^-?\d+$/
    return !userChoice.match(matchDigitRegex)
}

const findBegIndexOfLastNumber = (inputText) => {
    for (let i = inputText.length - 1; i >= 0; i--) {
        if (isOperand(inputText.charAt(i))) return i + 1
    }
    return 0
}