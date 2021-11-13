//Variables
const display = document.getElementById('display');
const stored = document.getElementById('stored');

let inputValue = [];
let displayValue = 0;
let storedDisplay = '';
let storedValue = 0;
let lastPressed = null;
let lastOperator = null;

//Clear display on load
window.onload = clearDisplay;

//Key listener to add keyboard support
window.addEventListener("keydown", function (event) {
    //Numbers
    if (!isNaN(event.key)) {
        let pressedNumber = event.key;
        pressedNumber = parseFloat(pressedNumber);
        clickHandler(pressedNumber);
    }
    //Operators, etc
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

// Completely resets the calculator
function clearDisplay() {
    inputValue = [];
    displayValue = 0;           
    storedValue = 0;
    lastPressed = null;
    lastOperator = null;
    updateDisplay();
    stored.innerHTML = '';
    enableOperators();
}

// Handles number and decimal click/keypress events
function clickHandler(number) {
    //Check if operation key was pressed before this
    if (lastPressed === 'add' || lastPressed === 'sub' || lastPressed === 'mul' || lastPressed === 'div') {
        //Wipe old display value and overwrite with new input
        if (inputValue[inputValue.length-1] !== '.') {
            inputValue = [];
            displayValue = 0;
            updateStoredOperator();
        }
        //If user inputs a decimal, allow it if there isn't one already
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
    //Check if = was pressed before this
    else if (lastPressed === 'calc') {
        //Start a new calculation
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
    //Check if user is just inputting a decimal, in which case add a leading 0.
    else if (number === '.') {
        if (inputValue.length === 0) {
            inputValue.push(0);
        }
        if (!inputValue.includes('.')) {
            inputValue.push(number);
            displayValue = inputValue.join('');
        }
        //Don't round, as it causes issues here
        display.innerHTML = displayValue;
        lastPressed = '.';
        return;
    }
    //Check if user is inputting multiple leading zeroes.
    else if (number === 0 && lastPressed === '.') {
        //Only allow values to thousandths place.
        if (inputValue.length < 4) {
            inputValue.push(0);
            displayValue = inputValue.join('');
            //Don't round, as it causes issues here
            display.innerHTML = displayValue;
        }
        return;
    }
    //Store input in displayValue
    else {
        displayValue[0] = number;
    }
    lastPressed = 'num';
    //Combine the input sequence into displayValue and display.
    inputValue.push(number);
    displayValue = inputValue.join('');
    displayValue = parseFloat(displayValue);
    updateDisplay();

    enableOperators();
}

// handle backspace click/keypress
function backspace() {
    //Don't backspace after a calculation
    if (lastPressed === 'add' || lastPressed === 'sub' || lastPressed === 'mul' || lastPressed === 'div') {
        return;
    }
    //If not after a calculation, remove the last digit of the input
    if (lastPressed !== 'calc') {
        inputValue.pop();
        displayValue = inputValue.join('');
        displayValue = parseFloat(displayValue);
        if (isNaN(displayValue)) {
            displayValue = 0;
            inputValue = [];
        }
    }
    //If it is after a calculation, clear the stored display
    else {
        stored.innerHTML = '';
    }
    
    updateDisplay();
}

// Handle + button click/keypress event
function addClicked() {
    // If stored display doesn't already have a symbol
    checkSymbol('+');
    
    // If the last key pressed was a number
    if (lastPressed === 'num') {
        //If there has already been an operator used, do the math
        doMath();
        updateStoredWithDisplay();
        addSymbol('add');
    }
    else if (lastPressed === 'calc') {
        storedValue = displayValue;
    }
    lastPressed = 'add';
    lastOperator = 'add';

}

function subClicked() {
    // If stored display doesn't already have a symbol
    checkSymbol('-');

    // If the last key pressed was a number
    if (lastPressed === 'num') {
        //If there has already been an operator used, do the math
        doMath();
        updateStoredWithDisplay();
        addSymbol('sub');
    }
    else if (lastPressed === 'calc') {
        storedValue = displayValue;
    }
    lastPressed = 'sub';
    lastOperator = 'sub';

}

function mulClicked() {
    // If stored display doesn't already have a symbol
    checkSymbol('&times');

    // If the last key pressed was a number
    if (lastPressed === 'num') {
        //If there has already been an operator used, do the math
        doMath();
        updateStoredWithDisplay();
        addSymbol('mul');
    }
    else if (lastPressed === 'calc') {
        storedValue = displayValue;
    }
    lastPressed = 'mul';
    lastOperator = 'mul';
}

function divClicked() {
    // If stored display doesn't already have a symbol
    checkSymbol('&divide');

    // If the last key pressed was a number
    if (lastPressed === 'num') {
        //If there has already been an operator used, do the math
        doMath();
        updateStoredWithDisplay();
        addSymbol('div');
    }
    else if (lastPressed === 'calc') {
        storedValue = displayValue;
    }
    lastPressed = 'div';
    lastOperator = 'div';
}


function calculate() {
    // If the last key press was a number
    if (lastPressed === 'num') {
        // Update the stored display and do math
        if (lastOperator === 'add') {
            updateStoredWithOperator('+');
            add();
            updateDisplay();
        }
        else if (lastOperator === 'sub') {
            updateStoredWithOperator('-');
            subtract();
            updateDisplay();
        }
        else if (lastOperator === 'mul') {
            updateStoredWithOperator('&times');
            multiply();
            updateDisplay();
        }
        else if (lastOperator === 'div') {
            divideWithStoredDisplay();
        }
        else if (lastOperator === null) {
            display.innerHTML = displayValue;
        }
    }
    //If last pressed an operator, do the math
    else if (lastPressed === 'add') {
        add();
        updateDisplay();
        lastOperator = 'add';
    }
    else if (lastPressed === 'sub') {
        subtract();
        updateDisplay();
        lastOperator = 'sub';
    }
    else if (lastPressed === 'mul') {
        multiply();
        updateDisplay();
        lastOperator = 'mul';
    }
    else if (lastPressed === 'div') {
        divide();
        lastOperator = 'div';
    }

    // If last pressed was calculate, repeat math
    else if (lastPressed === 'calc') {
        if (lastOperator === 'add') {
            repeatMath('add');
        }
        else if (lastOperator === 'sub') {
            repeatMath('sub');
        }
        else if (lastOperator === 'mul') {
            repeatMath('mul');
        }
        else if (lastOperator === 'div') {
            repeatMath('div');
        }
    }
    
    //If calc is the first thing being pressed
    else if (lastPressed === null) {
        stored.innerHTML = '0';
    }

    //When calc is pressed, add an = to stored display if one doesn't exist
    if (!stored.innerHTML.includes('=') && document.getElementById('/').disabled === false) {
        stored.innerHTML += inputValue.join('');
        stored.innerHTML += ' = ';
    }
    lastPressed = 'calc';
}

function updateDisplay() {
    display.innerHTML = roundNumber(displayValue);
}

function roundNumber(num) {
    return Math.round((num + Number.EPSILON) * 10000) / 10000;
}

function updateStoredWithDisplay() {
    stored.innerHTML = roundNumber(displayValue);
}

function updateStoredOperator() {
    switch(lastPressed) {
        case 'add': stored.innerHTML = storedValue + ' + ';break;
        case 'sub': stored.innerHTML = storedValue + ' - ';break;
        case 'mul': stored.innerHTML = storedValue + ' &times ';break;
        case 'div': stored.innerHTML = storedValue + ' &divide ';break;
        default: break;
    }
}

function updateStoredWithOperator(sym) {
    stored.innerHTML = roundNumber(storedValue) + ` ${sym} ` + inputValue.join('') + ' = ';
}

function checkSymbol(sym) {
    if (!stored.innerHTML.includes(sym)) {
        stored.innerHTML = roundNumber(displayValue);
        stored.innerHTML += ` ${sym} `;
    }
}

function addSymbol(op) {
    switch(op) {
        case 'add': {
            stored.innerHTML += ' + ';
            storedValue = displayValue;
        }; break;

        case 'sub': {
            stored.innerHTML += ' - ';
            storedValue = displayValue;
        }; break;

        case 'mul': {
            stored.innerHTML += ' &times ';
            storedValue = displayValue;
        }; break;

        case 'div': {
            stored.innerHTML += ' &divide ';
            storedValue = displayValue;
        }; break;

        default: break;
    }
}

function enableOperators() {
    document.getElementById('+').disabled = false;
    document.getElementById('-').disabled = false;
    document.getElementById('*').disabled = false;
    document.getElementById('/').disabled = false;
}

function disableOperators() {
    document.getElementById('+').disabled = true;
    document.getElementById('-').disabled = true;
    document.getElementById('*').disabled = true;
    document.getElementById('/').disabled = true;
}

function doMath() {
    if (lastOperator === 'add') {
        add();
        updateDisplay(); 
    }
    else if (lastOperator === 'sub') {
        subtract();
        updateDisplay();
    }
    else if (lastOperator === 'mul') {
        multiply();
        updateDisplay();
    }
    else if (lastOperator === 'div') {
        divide();
    }
}

function repeatMath(op) {
    switch(op) {
        case 'add': {
            newDisplayValue = inputValue.join('');
            newDisplayValue = parseFloat(newDisplayValue);
            storedValue = displayValue;
            displayValue += newDisplayValue;
            display.innerHTML = roundNumber(displayValue)

            stored.innerHTML = roundNumber(storedValue) + ' + ' + inputValue.join('') + ' = ';
        }; break;

        case 'sub': {
            newDisplayValue = inputValue.join('');
            newDisplayValue = parseFloat(newDisplayValue);
            storedValue = displayValue;
            displayValue -= newDisplayValue;
            display.innerHTML = roundNumber(displayValue)

            stored.innerHTML = roundNumber(storedValue) + ' - ' + inputValue.join('') + ' = ';
        }; break;

        case 'mul': {
            newDisplayValue = inputValue.join('');
            newDisplayValue = parseFloat(newDisplayValue);
            storedValue = displayValue;
            displayValue *= newDisplayValue;
            display.innerHTML = roundNumber(displayValue)

            stored.innerHTML = roundNumber(storedValue) + ' &times ' + inputValue.join('') + ' = ';
        }; break;

        case 'div': {
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
                disableOperators();
            }
        }; break;

        default: break;

    }
}

function add() {
    displayValue += storedValue;
}

function subtract() {
    displayValue = storedValue - displayValue;
}

function multiply() {
    displayValue = storedValue * displayValue;
}

function divide() {
    //Ensure there's no 'divide by zero' error.
    if (displayValue !== 0) {
        displayValue = storedValue / displayValue;
        updateDisplay();
    }
    else {
        display.innerHTML = 'Cannot divide by zero';
        inputValue = [];
        displayValue = 0;           
        storedValue = 0;
        resultValue = 0;
        lastPressed = null;
        lastOperator = null;
        disableOperators();
    }
}

function divideWithStoredDisplay() {
    if (displayValue !== 0) {
        updateStoredWithOperator('&divide');
        displayValue = storedValue / displayValue;
        updateDisplay();
    }
    else {
        display.innerHTML = 'Cannot divide by zero';
        inputValue = [];
        displayValue = 0;           
        storedValue = 0;
        lastPressed = null;
        lastOperator = null;
        disableOperators();
    }
}

