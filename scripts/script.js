//Variables
const display = document.getElementById('display');
const stored = document.getElementById('stored');
const precisionValue = document.getElementById('precisionValue');


let inputValue = [];
let displayValue = 0;
let storedDisplay = '';
let storedValue = 0;
let lastPressed = null;
let lastOperator = null;
let precision = 3;
updatePrecisionDisplay();

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
    resizeDisplay();
    resizeStoredDisplay();
    updatePrecisionColor('white');
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
            display.innerHTML = numberWithCommas(displayValue);
            lastPressed === '.';
            return;
        }
    }
    //Check if = was pressed before this
    else if (lastPressed === 'calc') {
        //Start a new calculation
        inputValue = [];
        newDisplayValue = displayValue; //Save for sub edge case
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
            display.innerHTML = numberWithCommas(displayValue);
            lastPressed = '.';
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
        display.innerHTML = numberWithCommas(displayValue);
        lastPressed = '.';
        return;
    }
    //Check if user is inputting multiple leading zeroes.
    else if (number === 0 && lastPressed === '.') {
        //Only allow an input of nine 0's after decimal
        if (inputValue.length < 11) {
            inputValue.push(0);
            displayValue = inputValue.join('');
            //Don't round, as it causes issues here
            display.innerHTML = numberWithCommas(displayValue);
        }
        return;
    }
    //Limit numbers to trillions place
    else if (inputValue.length > 12) {
        return;
    }
    else if (inputValue.includes('.')) {
        if (checkPrecisionOverflow()) return;
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
    updatePrecisionColor('white');
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
    updatePrecisionColor('white');
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
    updatePrecisionColor('white');
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
    updatePrecisionColor('white');
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
    updatePrecisionColor('white');
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
    updatePrecisionColor('white');
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
            display.innerHTML = numberWithCommas(displayValue);
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
        stored.innerHTML += numberWithCommas(inputValue.join(''));
        stored.innerHTML += ' = ';
    }
    lastPressed = 'calc';
    updatePrecisionColor('white');
}

function updateDisplay() {  
    display.innerHTML = roundNumber(displayValue);
    resizeDisplay();
}

function resizeDisplay() {
    //Default display size
    display.style.fontSize = '48px';
    //Shrink the font size if the number gets too big
    if (display.innerHTML.length >= 13) {
        display.style.fontSize = '44px';
    }
    if (display.innerHTML.length >= 14) {
        display.style.fontSize = '41px';
    }
    if (display.innerHTML.length >= 15) {
        display.style.fontSize = '38px';
    }
    if (display.innerHTML.length >= 16) {
        display.style.fontSize = '34px';
    }
    if (display.innerHTML.length >= 18) {
        display.style.fontSize = '28px';
    }
    if (display.innerHTML.length >= 20) {
        display.style.fontSize = '25px';
    }
}

function numberWithCommas(x) {
    //Write numbers using commas to seperate thousands, millions, etc
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function roundNumber(num) {
    //Round out the decimal to a maximum
    let maxPrecision = roundToPrecision();
    let roundedNum = Math.round((num + Number.EPSILON) * (maxPrecision)) / (maxPrecision);
    return numberWithCommas(roundedNum);
}

function incPrecision() {
    if (precision < 9)
        precision++;
    updatePrecisionDisplay();
    checkPrecisionOverflow();
}

function decPrecision() {
    if (precision > 0)
        precision--;
    updatePrecisionDisplay();
    checkPrecisionOverflow();
}

function roundToPrecision() {
    let usePrecision = '1';
    for (let i = 0; i < precision; i++) {
        usePrecision += '0';
    }
    usePrecision = parseInt(usePrecision);
    return usePrecision;
}

function updateStoredWithDisplay() {
    stored.innerHTML = roundNumber(displayValue);
    resizeStoredDisplay();
}

function resizeStoredDisplay() {
    stored.style.fontSize = '16px';
    
    //Shrink font size if the numbers are too big
    if (stored.innerHTML.length > 32) {
        stored.style.fontSize = '14px';
    }
    if (stored.innerHTML.length > 36) {
        stored.style.fontSize = '12px';
    }
    if (stored.innerHTML.length > 40) {
        stored.style.fontSize = '10px';
    }
}

function updateStoredOperator() {
    switch(lastPressed) {
        case 'add': stored.innerHTML = roundNumber(storedValue) + ' + ';
        resizeStoredDisplay()
        break;
        case 'sub': stored.innerHTML = roundNumber(storedValue) + ' - ';
        resizeStoredDisplay()
        break;
        case 'mul': stored.innerHTML = roundNumber(storedValue) + ' &times ';
        resizeStoredDisplay()
        break;
        case 'div': stored.innerHTML = roundNumber(storedValue) + ' &divide ';
        resizeStoredDisplay()
        break;
        default: break;
    }
}

function updateStoredWithOperator(sym) {
    //account for edge case
    if (lastPressed === 'num' && lastOperator === 'sub' && storedValue === 0) {
        stored.innerHTML = numberWithCommas(inputValue.join(''))  + ` ${sym} ` + roundNumber(newDisplayValue) + ' = ';
    }
    else {
        stored.innerHTML = roundNumber(storedValue) + ` ${sym} ` + numberWithCommas(inputValue.join('')) + ' = ';
    }
    resizeStoredDisplay()
}

function checkSymbol(sym) {
    if (!stored.innerHTML.includes(sym)) {
        stored.innerHTML = roundNumber(displayValue);
        stored.innerHTML += ` ${sym} `;
        resizeStoredDisplay()
    }
}

function addSymbol(op) {
    switch(op) {
        case 'add': {
            stored.innerHTML += ' + ';
            storedValue = displayValue;
            resizeStoredDisplay();
        }; break;

        case 'sub': {
            stored.innerHTML += ' - ';
            storedValue = displayValue;
            resizeStoredDisplay();
        }; break;

        case 'mul': {
            stored.innerHTML += ' &times ';
            storedValue = displayValue;
            resizeStoredDisplay();
        }; break;

        case 'div': {
            stored.innerHTML += ' &divide ';
            storedValue = displayValue;
            resizeStoredDisplay();
        }; break;

        default: break;
    }
}

function enableOperators() {
    document.getElementById('add').disabled = false;
    document.getElementById('sub').disabled = false;
    document.getElementById('mul').disabled = false;
    document.getElementById('div').disabled = false;
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
    else if (lastOperator === 'mul' && storedValue !== 0) {
        multiply();
        updateDisplay();
    }
    else if (lastOperator === 'div') {
        divide();
    }
}

function repeatMath(op) {
    if (inputValue.length === 0) {
        inputValue.push(0);
    }
    switch(op) {
        case 'add': {
            newDisplayValue = inputValue.join('');
            newDisplayValue = parseFloat(newDisplayValue);
            storedValue = displayValue;
            displayValue += newDisplayValue;
            display.innerHTML = roundNumber(displayValue)

            stored.innerHTML = roundNumber(storedValue) + ' + ' + numberWithCommas(inputValue.join('')) + ' = ';
            resizeStoredDisplay();
        }; break;

        case 'sub': {
            newDisplayValue = inputValue.join('');
            newDisplayValue = parseFloat(newDisplayValue);
            storedValue = displayValue;
            displayValue -= newDisplayValue;
            display.innerHTML = roundNumber(displayValue)

            stored.innerHTML = roundNumber(storedValue) + ' - ' + numberWithCommas(inputValue.join('')) + ' = ';
            resizeStoredDisplay();
            
        }; break;

        case 'mul': {
            newDisplayValue = inputValue.join('');
            newDisplayValue = parseFloat(newDisplayValue);
            storedValue = displayValue;
            displayValue *= newDisplayValue;
            display.innerHTML = roundNumber(displayValue)

            stored.innerHTML = roundNumber(storedValue) + ' &times ' + numberWithCommas(inputValue.join('')) + ' = ';
            resizeStoredDisplay();
        }; break;

        case 'div': {
            newDisplayValue = inputValue.join('');
            newDisplayValue = parseFloat(newDisplayValue);
            storedValue = displayValue;
            if (displayValue !== 0) {
                displayValue = storedValue / newDisplayValue;
                display.innerHTML = roundNumber(displayValue)

                stored.innerHTML = roundNumber(storedValue) + ' &divide ' + numberWithCommas(inputValue.join('')) + ' = ';
                resizeStoredDisplay();
            }
            else {
                display.style.fontSize = '30px';
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
    if (lastPressed === 'num' && lastOperator === 'sub' && storedValue === 0) {
        displayValue -= newDisplayValue;
    }
    else {
        displayValue = storedValue - displayValue;
    }
    
}

function multiply() {
    displayValue = storedValue * displayValue;
}

function divide() {
    //Ensure there's no 'divide by zero' error.
    if (storedValue === 0) {
        updateDisplay();
    }
    else if (displayValue !== 0) {
        displayValue = storedValue / displayValue;
        updateDisplay();
    }
    else {
        display.style.fontSize = '30px';
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
        display.style.fontSize = '30px';
        display.innerHTML = 'Cannot divide by zero';
        inputValue = [];
        displayValue = 0;           
        storedValue = 0;
        lastPressed = null;
        lastOperator = null;
        disableOperators();
    }
}

function updatePrecisionDisplay() {
    precisionValue.innerHTML = precision;
    precisionValue.innerHTML += ' digits';
}

function updatePrecisionColor(color) {
    precisionValue.style.color = color;
}

function checkPrecisionOverflow() {
    let decNumIndex = inputValue.indexOf('.');
    let decimalNumbers = inputValue.slice(decNumIndex+1);
    if (decimalNumbers.length >= precision) {
        updatePrecisionColor('red');
        return true;
    }
    else {
        updatePrecisionColor('white');
        return false;
    }
}