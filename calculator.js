const buildCalculator = () => {
    let numbers = '<tr>'
    for (let i = 1; i <= 9; i++) {
        numbers += `<td class='number'><button>${i}</button></td>`
        numbers += i == 3 ? '<td class=\'number\'><button>-</button></td>' : ''
        numbers += i == 6 ? '<td class=\'number\'><button>+</button></td>' : ''
        numbers += i % 3 == 0 ? '</tr><tr>' : ''
    }
    document.getElementById('calculator').insertAdjacentHTML('afterbegin', numbers)
}
let expression = ''
let input = document.getElementById('input')
let result = document.getElementById('result')
let matchDigitRegex = /^-?\d+$/
const buttonClicked = (value) => {
    if (input.innerHTML == '0') input.innerHTML = ''
    const inputString = input.innerHTML
    if (!value.match(matchDigitRegex) && inputString == '') return
    if (value == 'enter') {
        if (!inputString.charAt(inputString.length - 1).match(matchDigitRegex)) return
        result.innerHTML = eval(input.innerHTML)
        input.innerHTML = '0'
        return
    }
    input.innerHTML += value
    expression += value

}