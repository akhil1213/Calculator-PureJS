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
const setClickListenersForEachButton = (buttonClicked) => {
    document.querySelectorAll('.button').forEach(item => {
        item.addEventListener('click', event => {
            buttonClicked(item.getAttribute('id'))
        })
    })
}
export { setClickListenersForEachButton, isOperand, clearClicked, countDecimals }
