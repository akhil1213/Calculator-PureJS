const buttonClicked = require('./calculator')
test('displays a user after a click', () => {
    // Set up our document body
    document.body.innerHTML = "<div class=\"wrapper\"><div id=\"input\">0</div><div id=\"result\">Result</div><button id='clear' onclick=\"buttonClicked('clear')\">clear</button><button id='=' onclick=\"buttonClicked('=')\">=</button><button id='/' onclick=\"buttonClicked('/')\">/</button><button id='*' onclick=\"buttonClicked('*')\">*</button><button id='1' onclick=\"buttonClicked('1')\">1</button><button id='2' onclick=\"buttonClicked('2')\">2</button><button id='3' onclick=\"buttonClicked('3')\">3</button><button id='-' onclick=\"buttonClicked('-')\">-</button><button id='4' onclick=\"buttonClicked('4')\">4</button><button id='5' onclick=\"buttonClicked('5')\">5</button><button id='6' onclick=\"buttonClicked('6')\">6</button><button id='+' onclick=\"buttonClicked('+')\">+</button><button id='7' onclick=\"buttonClicked('7')\">7</button><button id='8' onclick=\"buttonClicked('8')\">8</button><button id='enter' class=\"enter\" onclick=\"buttonClicked('enter')\">Enter</button><button id='9' onclick=\"buttonClicked('9')\">9</button><button id='0' onclick=\"buttonClicked('0')\">0</button><button id='undo' onclick=\"buttonClicked('undo')\">Undo</button><button id='.' onclick=\"buttonClicked('.')\">.</button></div><script src='./calculator.js'></script>"
    const oneButton = document.getElementById('1')
    jest.spyOn(buttonClicked, 'callFunction');
    oneButton.click();
    expect(buttonClicked.callFunction).toHaveBeenCalled();
    const input = document.getElementById('input')
    expect(input.innerHTML).toBe('0');
});