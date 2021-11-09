let currentOperator = null; //<-- Stores current operator
let displayValue = []; //<-- Stores currently displayed value
let storedValue = []; //<-- Stores numbers in memory to be operated on
displayValue.push(0); //<-- Default displayed value is 0, cleared on first number entry
let displayPopulated = false; //<-- Whether there's already an important value in the display

const display = document.getElementById('display'); //<-- The display for the current displayValue
display.innerHTML = displayValue;

//=============MATH FUNCTIONS============================

//When + is pressed
document.getElementById('+').addEventListener('click',function() {
  add(displayValue,storedValue);
});
function add(displayValue,storedValue) {
  //If statement stops the button from doubling the stored value
  if (currentOperator !== 'add') {
    currentOperator = 'add'; //<-- Set current operator to 'add', to be used by operate().
    storedValue.push(displayValue.join('')); //<-- Push the current display value into the stored value array.
    displayPopulated = false; //<-- Have next number entry overwrite the display.
  }
}

//When - is pressed
document.getElementById('-').addEventListener('click',function() {
  sub(displayValue,storedValue);
});
function sub(displayValue,storedValue) {
  //If statement stops the button from doubling the stored value
  if (currentOperator !== 'sub') {
    currentOperator = 'sub'; //<-- Set current operator to 'add', to be used by operate().
    storedValue.push(displayValue.join('')); //<-- Push the current display value into the stored value array.
    displayPopulated = false; //<-- Have next number entry overwrite the display.
  }
}

function mul(displayValue,storedValue) {
  return displayValue * storedValue;
}

function div(displayValue,storedValue) {
  return displayValue / storedValue;
}

//When = is pressed.
document.getElementById('=').addEventListener('click',function(){
  operate(currentOperator,displayValue,storedValue);
})
//Takes the displayed value and stored values, and performs an operation based on the current operator.
function operate(operator,displayed,stored) {
    //Combine displayed digits into a single number, and convert from string to integer.
    displayed = displayed.join('');
    switch(operator) {
      case 'add': 
      //If statement prevents repeated = presses to cause a logic error.
      if (stored.length !== 0) {
        stored = stored.map(Number); //<-- Convert values in stored to integers.
        const add = (previousValue, currentValue) => previousValue + currentValue;
        stored = stored.reduce(add,0) //<-- Add all the values in stored.
        displayed = parseInt(displayed);
        displayed += stored; //<-- Add the value in stored to the value currently displayed.
        display.innerHTML = displayed; //<-- Display the new value.
        displayValue = [];
        displayValue.push(displayed);
        storedValue = []; //<-- Clear storedValue, as the new sum is in displayValue.
        displayPopulated = false; //<-- Next number entry will overwrite the display.
      }
      else {
        //If stored is already cleared, just display what's already being displayed.
        display.innerHTML = displayed[0]; 
        displayPopulated = false;
      }
        //Reset the current operator to avoid doubling stored values.
        currentOperator = null;
        break;

      case 'sub': 
        //If statement prevents repeated = presses to cause a logic error.
        if (stored.length !== 0) {
          stored = stored.map(Number); //<-- Convert values in stored to integers.
          const add = (previousValue, currentValue) => previousValue + currentValue;
          stored = stored.reduce(add,0) //<-- Add all the values in stored.
          displayed = parseInt(displayed);
          displayed = stored - displayed; //<-- Add the value in stored to the value currently displayed.
          display.innerHTML = displayed; //<-- Display the new value.
          displayValue = [];
          displayValue.push(displayed);
          storedValue = []; //<-- Clear storedValue, as the new sum is in displayValue.
          displayPopulated = false; //<-- Next number entry will overwrite the display.
        }
        else {
          //If stored is already cleared, just display what's already being displayed.
          display.innerHTML = displayed[0]; 
          displayPopulated = false;
        }
          //Reset the current operator to avoid doubling stored values.
          currentOperator = null;
          break;
      case 'mul': return mul(displayValue,storedValue);break;
      case 'div': return div(displayValue,storedValue);break;
      default:break;
    }
}

function clickHandler(num) {
  if (displayPopulated){
    displayValue.push(num);
  }
  else {
    displayValue = []
    displayPopulated = true;
    clickHandler(num);
  } 
  display.innerHTML = displayValue.join('');
  
}

function clearDisplay() {
  storedValue = [];
  displayValue = [];
  displayValue.push(0);
  displayPopulated = false;
  display.innerHTML = displayValue;
}



