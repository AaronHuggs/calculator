let inputValue = [];
let displayValue = 0;
let storedValue = 0;
let resultValue = 0;
let lastPressed = null;
let lastOperator = null;
let clearMe = false;

const display = document.getElementById('display');
window.onload = clearDisplay;

const debugValues = document.getElementById('debug');

function clearDisplay() {
    inputValue = [];
    displayValue = 0;           
    storedValue = 0;
    resultValue = 0;
    lastPressed = null;
    lastOperator = null;
    clearMe = false;
    display.innerHTML = displayValue;

    updateDebug();
}

function clickHandler(number) {
    
    if (lastPressed === 'num') {
        
    }
    else if (lastPressed === 'add') {
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
    display.innerHTML = displayValue;

    updateDebug();
}

function addClicked() {
    if (lastPressed === 'num') {
        storedValue = displayValue;
    }
    else if (lastPressed === 'add') {

    }
    else if (lastPressed === 'calc') {
        
        storedValue = displayValue;
        

    }
    lastPressed = 'add';
    lastOperator = 'add';

    updateDebug();
}

function calculate() {
    if (lastPressed === 'num') {
        if (lastOperator === 'add') {
            displayValue += storedValue;
            display.innerHTML = displayValue;
        }
    }
    else if (lastPressed === 'add') {
        displayValue += storedValue;
        display.innerHTML = displayValue;
        lastOperator = 'add';
    }
    else if (lastPressed === 'calc') {
        if (lastOperator === 'add') {
            newdisplayValue = inputValue.join('');
            newdisplayValue = parseInt(newdisplayValue);
            storedValue = displayValue;
            displayValue += newdisplayValue;

            display.innerHTML = displayValue;
        }
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
