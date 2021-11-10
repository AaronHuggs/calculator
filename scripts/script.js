let displayValue = [];
let storedValues = [];
let storedOperations = [];
let resultValue = 0;


const display = document.getElementById('display');
window.onload = clearDisplay;

function clickHandler(number) {
    if (displayValue[0] === 0)
        displayValue.pop();
    displayValue.push(number);
    display.innerHTML = displayValue.join('');
}

function clearDisplay() {
    displayValue = [];
    displayValue.push(0);
    display.innerHTML = displayValue.join('');
    storedValues = [];
    storedOperations = [];
}


function add() {
    storedOperations.push('+');
    storedValues.push(displayValue.join(''));
    storedValues = storedValues.map(Number);
    displayValue = [];
}

function subtract() {
    storedOperations.push('-');
    storedValues.push(displayValue.join(''));
    storedValues = storedValues.map(Number);
    displayValue = [];
}

function operate() {
    let savedDisplay = parseInt(displayValue.join(''));
    if (isNaN(savedDisplay)) savedDisplay = 0;
    let result = storedValues[0];
    for (let i = 0; i < storedOperations.length-1; i++) {
        
        if (storedOperations[i] === '+') {
            result += storedValues[i+1];
        }
        else if (storedOperations[i] === '-') {
            result -= storedValues[i+1];
        }
    }
    if (storedOperations[storedOperations.length-1] === '+') {
        result += savedDisplay;
    }
    if (storedOperations[storedOperations.length-1] === '-') {
        result -= savedDisplay;
    }
    resultValue = result;
    displayResult();
}


function displayResult() {
    display.innerHTML = resultValue;
}