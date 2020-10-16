
/**
 * takes the key value and checks if its a valid key using
 * a regexp which checks if its a digit or valid operand 
 * @param {string} text
 * @return {boolean} 
 */
const validateKey = (keyValue) => {
    if (keyValue == 'backspace' || keyValue == 'enter' || keyValue == '*') return true
    const validInputRegex = /[0-9]*[+./=-]*/
    return keyValue.match(validInputRegex)[0] == keyValue
}
// let prevClickedElement;
// let validateKeyPressedRegexp = new RegExp(/[0-9]*[+./=-]*/) !validateKeyPressedRegexp.test(keyPressedText)
const keyboardPressLogic = (buttonClicked) => {
    document.addEventListener('keyup', (e) => {
        const keyPressedText = e.key.toLowerCase()
        const validInputRegex = /[0-9]*[+./=-]*/
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
}
export default keyboardPressLogic