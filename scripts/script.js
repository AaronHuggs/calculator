let inputValue = [];
let displayValue = 0;
let storedValue = 0;
let resultValue = 0;
let lastPressed = null;
let lastOperator = null;

const display = document.getElementById('display');
window.onload = clearDisplay;

window.addEventListener("keydown", function (event) {
    if (!isNaN(event.key)) {
        let pressedNumber = event.key;
        pressedNumber = parseInt(pressedNumber);
        clickHandler(pressedNumber);
    }
    else {
        switch(event.key) {
            case '+': addClicked(); break;
            case '-': subClicked(); break;
            case '*': mulClicked(); break;
            case '/': divClicked(); break;
            case 'Enter': calculate(); break;
            case 'Escape': clearDisplay(); break;
            default: break;
        }
    }
});

const debugValues = document.getElementById('debug');

function clearDisplay() {
    inputValue = [];
    displayValue = 0;           
    storedValue = 0;
    resultValue = 0;
    lastPressed = null;
    lastOperator = null;
    display.innerHTML = displayValue;
    document.getElementById('+').disabled = false;
    document.getElementById('-').disabled = false;
    document.getElementById('*').disabled = false;
    document.getElementById('/').disabled = false;
    updateDebug();
}

function clickHandler(number) {
    if (lastPressed === 'add' || lastPressed === 'sub' || lastPressed === 'mul' || lastPressed === 'div') {
        inputValue = [];
        displayValue = 0;
    }
    else if (lastPressed === 'calc') {
        inputValue = [];
        displayValue = 0;
        storedValue = 0;
    }
    else {
        displayValue[0] = number;
    }
    lastPressed = 'num';

    inputValue.push(number);
    displayValue = inputValue.join('');
    displayValue = parseInt(displayValue);
    display.innerHTML = displayValue

    document.getElementById('+').disabled = false;
    document.getElementById('-').disabled = false;
    document.getElementById('*').disabled = false;
    document.getElementById('/').disabled = false;

    updateDebug();
}

function backspace() {
    inputValue.pop();
    displayValue = inputValue.join('');
    displayValue = parseInt(displayValue);
    if (isNaN(displayValue)) {
        displayValue = 0;
        inputValue = [];
    }
    display.innerHTML = displayValue;
    updateDebug();
}

function addClicked() {
    if (lastPressed === 'num') {
        if (lastOperator === 'add') {
            displayValue += storedValue;
            display.innerHTML = displayValue
        }
        else if (lastOperator === 'sub') {
            displayValue = storedValue - displayValue;
            display.innerHTML = displayValue
        }
        else if (lastOperator === 'mul') {
            displayValue = storedValue * displayValue;
            display.innerHTML = displayValue
        }
        else if (lastOperator === 'div') {
            if (displayValue !== 0) {
                displayValue = storedValue / displayValue;
                display.innerHTML = displayValue
            }
            else {
                display.innerHTML = 'Cannot divide by zero';
                inputValue = [];
                displayValue = 0;           
                storedValue = 0;
                resultValue = 0;
                lastPressed = null;
                lastOperator = null;
                document.getElementById('+').disabled = true;
                document.getElementById('-').disabled = true;
                document.getElementById('*').disabled = true;
                document.getElementById('/').disabled = true;
                updateDebug();
            }
        }
        storedValue = displayValue;
    }
    else if (lastPressed === 'calc') {
        storedValue = displayValue;
    }
    lastPressed = 'add';
    lastOperator = 'add';

    updateDebug();
}

function subClicked() {
    if (lastPressed === 'num') {
        if (lastOperator === 'add') {
            displayValue += storedValue;
            display.innerHTML = displayValue
        }
        else if (lastOperator === 'sub') {
            displayValue = storedValue - displayValue;
            display.innerHTML = displayValue
        }
        else if (lastOperator === 'mul') {
            displayValue = storedValue * displayValue;
            display.innerHTML = displayValue
        }
        else if (lastOperator === 'div') {
            if (displayValue !== 0) {
                displayValue = storedValue / displayValue;
                display.innerHTML = displayValue
            }
            else {
                display.innerHTML = 'Cannot divide by zero';
                inputValue = [];
                displayValue = 0;           
                storedValue = 0;
                resultValue = 0;
                lastPressed = null;
                lastOperator = null;
                document.getElementById('+').disabled = true;
                document.getElementById('-').disabled = true;
                document.getElementById('*').disabled = true;
                document.getElementById('/').disabled = true;
                updateDebug();
            }
        }
        storedValue = displayValue;
    }
    else if (lastPressed === 'calc') {
        storedValue = displayValue;
    }
    lastPressed = 'sub';
    lastOperator = 'sub';

    updateDebug();
}

function mulClicked() {
    if (lastPressed === 'num') {
        if (lastOperator === 'add') {
            displayValue += storedValue;
            display.innerHTML = displayValue
        }
        else if (lastOperator === 'sub') {
            displayValue = storedValue - displayValue;
            display.innerHTML = displayValue
        }
        else if (lastOperator === 'mul') {
            displayValue = storedValue * displayValue;
            display.innerHTML = displayValue
        }
        else if (lastOperator === 'div') {
            if (displayValue !== 0) {
                displayValue = storedValue / displayValue;
                display.innerHTML = displayValue
            }
            else {
                display.innerHTML = 'Cannot divide by zero';
                inputValue = [];
                displayValue = 0;           
                storedValue = 0;
                resultValue = 0;
                lastPressed = null;
                lastOperator = null;
                document.getElementById('+').disabled = true;
                document.getElementById('-').disabled = true;
                document.getElementById('*').disabled = true;
                document.getElementById('/').disabled = true;
                updateDebug();
            }
        }
        storedValue = displayValue;
    }
    else if (lastPressed === 'calc') {
        storedValue = displayValue;
    }
    lastPressed = 'mul';
    lastOperator = 'mul';
}

function divClicked() {
    if (lastPressed === 'num') {
        if (lastOperator === 'add') {
            displayValue += storedValue;
            display.innerHTML = displayValue
        }
        else if (lastOperator === 'sub') {
            displayValue = storedValue - displayValue;
            display.innerHTML = displayValue
        }
        else if (lastOperator === 'mul') {
            displayValue = storedValue * displayValue;
            display.innerHTML = displayValue
        }
        else if (lastOperator === 'div') {
            if (displayValue !== 0) {
                displayValue = storedValue / displayValue;
                display.innerHTML = displayValue
            }
            else {
                display.innerHTML = 'Cannot divide by zero';
                inputValue = [];
                displayValue = 0;           
                storedValue = 0;
                resultValue = 0;
                lastPressed = null;
                lastOperator = null;
                document.getElementById('+').disabled = true;
                document.getElementById('-').disabled = true;
                document.getElementById('*').disabled = true;
                document.getElementById('/').disabled = true;
                updateDebug();
            }
        }
        storedValue = displayValue;
    }
    else if (lastPressed === 'calc') {
        storedValue = displayValue;
    }
    lastPressed = 'div';
    lastOperator = 'div';
}


function calculate() {
    if (lastPressed === 'num') {
        if (lastOperator === 'add') {
            displayValue += storedValue;
            display.innerHTML = displayValue
        }
        else if (lastOperator === 'sub') {
            displayValue = storedValue - displayValue;
            display.innerHTML = displayValue
        }
        else if (lastOperator === 'mul') {
            displayValue = storedValue * displayValue;
            display.innerHTML = displayValue
        }
        else if (lastOperator === 'div') {
            if (displayValue !== 0) {
                displayValue = storedValue.toFixed(4) / displayValue.toFixed(4);
                display.innerHTML = displayValue
            }
            else {
                display.innerHTML = 'Cannot divide by zero';
                inputValue = [];
                displayValue = 0;           
                storedValue = 0;
                resultValue = 0;
                lastPressed = null;
                lastOperator = null;
                document.getElementById('+').disabled = true;
                document.getElementById('-').disabled = true;
                document.getElementById('*').disabled = true;
                document.getElementById('/').disabled = true;
                updateDebug();
            }
        }
    }
    else if (lastPressed === 'add') {
        displayValue += storedValue;
        display.innerHTML = displayValue
        lastOperator = 'add';
    }
    else if (lastPressed === 'sub') {
        displayValue = storedValue - displayValue;
        display.innerHTML = displayValue
        lastOperator = 'sub';
    }
    else if (lastPressed === 'mul') {
        displayValue = storedValue * displayValue;
        display.innerHTML = displayValue
        lastOperator = 'mul';
    }
    else if (lastPressed === 'div') {
        if (displayValue !== 0) {
            displayValue = storedValue / displayValue;
            display.innerHTML = displayValue
            lastOperator = 'div';
        }
        else {
            display.innerHTML = 'Cannot divide by zero';
            inputValue = [];
            displayValue = 0;           
            storedValue = 0;
            resultValue = 0;
            lastPressed = null;
            lastOperator = null;
            document.getElementById('+').disabled = true;
            document.getElementById('-').disabled = true;
            document.getElementById('*').disabled = true;
            document.getElementById('/').disabled = true;
            updateDebug();
        }
    }
    else if (lastPressed === 'calc') {
        if (lastOperator === 'add') {
            newDisplayValue = inputValue.join('');
            newDisplayValue = parseInt(newDisplayValue);
            storedValue = displayValue;
            displayValue += newDisplayValue;
            display.innerHTML = displayValue
        }
        else if (lastOperator === 'sub') {
            newDisplayValue = inputValue.join('');
            newDisplayValue = parseInt(newDisplayValue);
            storedValue = displayValue;
            displayValue -= newDisplayValue;
            display.innerHTML = displayValue
        }
        else if (lastOperator === 'mul') {
            newDisplayValue = inputValue.join('');
            newDisplayValue = parseInt(newDisplayValue);
            storedValue = displayValue;
            displayValue *= newDisplayValue;
            display.innerHTML = displayValue
        }
        else if (lastOperator === 'div') {
            newDisplayValue = inputValue.join('');
            newDisplayValue = parseFloat(newDisplayValue);
            storedValue = displayValue;
            if (displayValue !== 0) {
                displayValue = storedValue / newDisplayValue;
                display.innerHTML = displayValue
            }
            else {
                display.innerHTML = 'Cannot divide by zero';
                inputValue = [];
                displayValue = 0;           
                storedValue = 0;
                resultValue = 0;
                lastPressed = null;
                lastOperator = null;
                document.getElementById('+').disabled = true;
                document.getElementById('-').disabled = true;
                document.getElementById('*').disabled = true;
                document.getElementById('/').disabled = true;
                updateDebug();
            }
        }
    }
    if (lastPressed === null || lastOperator === null) {
        clearDisplay();
    }
    lastPressed = 'calc';
    updateDebug();
}




function updateDebug() {
    debugValues.innerHTML = `
    inputValue: ${inputValue}<br>
    displayValue: ${displayValue}<br>
    storedValue: ${storedValue}<br>
    lastPressed: ${lastPressed}<br>
    lastOperator: ${lastOperator}<br>`
}
