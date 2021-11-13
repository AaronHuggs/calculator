let inputValue = [];
let displayValue = 0;
let storedDisplay = '';
let storedValue = 0;
let resultValue = 0;
let lastPressed = null;
let lastOperator = null;

const display = document.getElementById('display');
const stored = document.getElementById('stored');
window.onload = clearDisplay;

window.addEventListener("keydown", function (event) {
    if (!isNaN(event.key)) {
        let pressedNumber = event.key;
        pressedNumber = parseFloat(pressedNumber);
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
            case 'Backspace': backspace(); break;
            case '.': clickHandler('.'); break;
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
    display.innerHTML = roundNumber(displayValue);
    stored.innerHTML = '';
    document.getElementById('+').disabled = false;
    document.getElementById('-').disabled = false;
    document.getElementById('*').disabled = false;
    document.getElementById('/').disabled = false;
    updateDebug();
}
function clickHandler(number) {
    if (lastPressed === 'add' || lastPressed === 'sub' || lastPressed === 'mul' || lastPressed === 'div') {
        if (inputValue[inputValue.length-1] !== '.') {
            inputValue = [];
            displayValue = 0;
            updateStored();
        }
        if (number === '.') {
            if (inputValue.length === 0) {
                inputValue.push(0);
            }
            if (!inputValue.includes('.')) {
                inputValue.push(number);
                displayValue = inputValue.join('');
            }
            display.innerHTML = displayValue;
            lastPressed === '.';
            return;
        }
    }
    else if (lastPressed === 'calc') {
        inputValue = [];
        displayValue = 0;
        storedValue = 0;
        stored.innerHTML = '';
        if (number === '.') {
            if (inputValue.length === 0) {
                inputValue.push(0);
            }
            if (!inputValue.includes('.')) {
                inputValue.push(number);
                displayValue = inputValue.join('');
            }
            display.innerHTML = displayValue;
            lastPressed === '.';
            return;
        }
    }
    else if (number === '.') {
        if (inputValue.length === 0) {
            inputValue.push(0);
        }
        if (!inputValue.includes('.')) {
            inputValue.push(number);
            displayValue = inputValue.join('');
        }
        display.innerHTML = displayValue;
        lastPressed = '.';
        return;
    }
    else if (number === 0 && lastPressed === '.') {
        inputValue.push(0);
        displayValue = inputValue.join('');
        display.innerHTML = displayValue;
        return;
    }
    else {
        displayValue[0] = number;
    }
    lastPressed = 'num';

    inputValue.push(number);
    displayValue = inputValue.join('');
    displayValue = parseFloat(displayValue);
    display.innerHTML = roundNumber(displayValue);

    document.getElementById('+').disabled = false;
    document.getElementById('-').disabled = false;
    document.getElementById('*').disabled = false;
    document.getElementById('/').disabled = false;

    updateDebug();
}

function backspace() {
    if (lastPressed !== 'calc') {
        inputValue.pop();
        displayValue = inputValue.join('');
        displayValue = parseFloat(displayValue);
        if (isNaN(displayValue)) {
            displayValue = 0;
            inputValue = [];
        }
    }
    display.innerHTML = roundNumber(displayValue);
    stored.innerHTML = '';
    updateDebug();
}

function addClicked() {
    if (!stored.innerHTML.includes('+')) {
        stored.innerHTML = roundNumber(displayValue);
        stored.innerHTML += ' + ';
    }
    
    if (lastPressed === 'num') {
        
        if (lastOperator === 'add') {
            displayValue += storedValue;
            display.innerHTML = roundNumber(displayValue)
            
        }
        else if (lastOperator === 'sub') {
            displayValue = storedValue - displayValue;
            display.innerHTML = roundNumber(displayValue)
        }
        else if (lastOperator === 'mul') {
            displayValue = storedValue * displayValue;
            display.innerHTML = roundNumber(displayValue)
        }
        else if (lastOperator === 'div') {
            if (displayValue !== 0) {
                displayValue = storedValue / displayValue;
                display.innerHTML = roundNumber(displayValue)
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
        stored.innerHTML = roundNumber(displayValue);
        stored.innerHTML += ' + ';
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
    if (!stored.innerHTML.includes('-')) {
        stored.innerHTML = roundNumber(displayValue);
        stored.innerHTML += ' - ';
    }
    if (lastPressed === 'num') {
        if (lastOperator === 'add') {
            displayValue += storedValue;
            display.innerHTML = roundNumber(displayValue)
        }
        else if (lastOperator === 'sub') {
            displayValue = storedValue - displayValue;
            display.innerHTML = roundNumber(displayValue)
        }
        else if (lastOperator === 'mul') {
            displayValue = storedValue * displayValue;
            display.innerHTML = roundNumber(displayValue)
        }
        else if (lastOperator === 'div') {
            if (displayValue !== 0) {
                displayValue = storedValue / displayValue;
                display.innerHTML = roundNumber(displayValue)
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
        stored.innerHTML = roundNumber(displayValue);
        stored.innerHTML += ' - ';
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
    if (!stored.innerHTML.includes('&times')) {
        stored.innerHTML = roundNumber(displayValue);
        stored.innerHTML += ' &times ';
    }
    if (lastPressed === 'num') {
        if (lastOperator === 'add') {
            displayValue += storedValue;
            display.innerHTML = roundNumber(displayValue)
        }
        else if (lastOperator === 'sub') {
            displayValue = storedValue - displayValue;
            display.innerHTML = roundNumber(displayValue)
        }
        else if (lastOperator === 'mul') {
            displayValue = storedValue * displayValue;
            display.innerHTML = roundNumber(displayValue)
        }
        else if (lastOperator === 'div') {
            if (displayValue !== 0) {
                displayValue = storedValue / displayValue;
                display.innerHTML = roundNumber(displayValue)
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
        stored.innerHTML = roundNumber(displayValue);
        stored.innerHTML += ' &times ';
        storedValue = displayValue;
    }
    else if (lastPressed === 'calc') {
        storedValue = displayValue;
    }
    lastPressed = 'mul';
    lastOperator = 'mul';
}

function divClicked() {
    if (!stored.innerHTML.includes('&divide')) {
        stored.innerHTML = roundNumber(displayValue);
        stored.innerHTML += ' &divide ';
    }
    if (lastPressed === 'num') {
        if (lastOperator === 'add') {
            displayValue += storedValue;
            display.innerHTML = roundNumber(displayValue)
        }
        else if (lastOperator === 'sub') {
            displayValue = storedValue - displayValue;
            display.innerHTML = roundNumber(displayValue)
        }
        else if (lastOperator === 'mul') {
            displayValue = storedValue * displayValue;
            display.innerHTML = roundNumber(displayValue)
        }
        else if (lastOperator === 'div') {
            if (displayValue !== 0) {
                displayValue = storedValue / displayValue;
                display.innerHTML = roundNumber(displayValue)
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
        stored.innerHTML = roundNumber(displayValue);
        stored.innerHTML += ' &divide ';
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
            stored.innerHTML = roundNumber(storedValue) + ' + ' + inputValue.join('') + ' = ';
            
            displayValue += storedValue;
            display.innerHTML = roundNumber(displayValue)
        }
        else if (lastOperator === 'sub') {
            stored.innerHTML = roundNumber(storedValue) + ' - ' + inputValue.join('') + ' = ';

            displayValue = storedValue - displayValue;
            display.innerHTML = roundNumber(displayValue)
        }
        else if (lastOperator === 'mul') {
            stored.innerHTML = roundNumber(storedValue) + ' &times ' + inputValue.join('') + ' = ';

            displayValue = storedValue * displayValue;
            display.innerHTML = roundNumber(displayValue)
        }
        else if (lastOperator === 'div') {
            if (displayValue !== 0) {
                stored.innerHTML = roundNumber(storedValue) + ' &divide ' + inputValue.join('') + ' = ';

                displayValue = storedValue/ displayValue;
                display.innerHTML = roundNumber(displayValue);
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
        else if (lastOperator === null) {
            display.innerHTML = displayValue;
        }
    }
    else if (lastPressed === 'add') {
        displayValue += storedValue;
        display.innerHTML = displayValue;
        lastOperator = 'add';
    }
    else if (lastPressed === 'sub') {
        displayValue = storedValue - displayValue;
        display.innerHTML = roundNumber(displayValue)
        lastOperator = 'sub';
    }
    else if (lastPressed === 'mul') {
        displayValue = storedValue * displayValue;
        display.innerHTML = roundNumber(displayValue)
        lastOperator = 'mul';
    }
    else if (lastPressed === 'div') {
        if (displayValue !== 0) {
            displayValue = storedValue / displayValue;
            display.innerHTML = roundNumber(displayValue)
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
            newDisplayValue = parseFloat(newDisplayValue);
            storedValue = displayValue;
            displayValue += newDisplayValue;
            display.innerHTML = roundNumber(displayValue)

            stored.innerHTML = roundNumber(storedValue) + ' + ' + inputValue.join('') + ' = ';
        }
        else if (lastOperator === 'sub') {
            newDisplayValue = inputValue.join('');
            newDisplayValue = parseFloat(newDisplayValue);
            storedValue = displayValue;
            displayValue -= newDisplayValue;
            display.innerHTML = roundNumber(displayValue)

            stored.innerHTML = roundNumber(storedValue) + ' - ' + inputValue.join('') + ' = ';
        }
        else if (lastOperator === 'mul') {
            newDisplayValue = inputValue.join('');
            newDisplayValue = parseFloat(newDisplayValue);
            storedValue = displayValue;
            displayValue *= newDisplayValue;
            display.innerHTML = roundNumber(displayValue)

            stored.innerHTML = roundNumber(storedValue) + ' &times ' + inputValue.join('') + ' = ';
        }
        else if (lastOperator === 'div') {
            newDisplayValue = inputValue.join('');
            newDisplayValue = parseFloat(newDisplayValue);
            storedValue = displayValue;
            if (displayValue !== 0) {
                displayValue = storedValue / newDisplayValue;
                display.innerHTML = roundNumber(displayValue)

                stored.innerHTML = roundNumber(storedValue) + ' &divide ' + inputValue.join('') + ' = ';
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
    if (!stored.innerHTML.includes('=')) {
        stored.innerHTML += inputValue.join('');
        stored.innerHTML += ' = ';
    }
    lastPressed = 'calc';
    updateDebug();
}

function roundNumber(num) {
    return Math.round((num + Number.EPSILON) * 1000) / 1000;
}

function updateStored() {
    switch(lastPressed) {
        case 'add': stored.innerHTML = storedValue + ' + ';break;
        case 'sub': stored.innerHTML = storedValue + ' - ';break;
        case 'mul': stored.innerHTML = storedValue + ' &times ';break;
        case 'div': stored.innerHTML = storedValue + ' &divide ';break;
        default: break;
    }
}


function updateDebug() {
    debugValues.innerHTML = `
    inputValue: ${inputValue}<br>
    displayValue: ${displayValue}<br>
    storedValue: ${storedValue}<br>
    lastPressed: ${lastPressed}<br>
    lastOperator: ${lastOperator}<br>`
}
