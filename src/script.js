import {padNumbers, padOperators} from './data.js';
const numberPad = document.getElementById('numberPad');
const operatorPad = document.getElementById('operatorPad');
const screenText = document.getElementById('screenText');
const firstArgumentScreen = document.getElementById('firstArgument');
const secondArgumentScreen = document.getElementById('secondArgument');

// Initialize keys
let keyArray = [];
let characters = ""
let firstArgument = "";
let secondArgument = "";
let operator = "";
let pushedKey = "";
let answer = "";

// Change the operator
const applyOperator = (op, a, b) =>
{ switch (op)
  { case "+": return a + b
    case "-": return a - b
    case "*": return a * b
    case "/": return a / b
    case "%": return a % b
    case "^": return Math.pow(a, b)
    case "=": return 'unsupported operator';
    default: return 'unsupported operator';
  }
}

// Main Calculator Logic
const operate = (e, pushedKey) => {
    if(pushedKey === "=" && firstArgument === "" && secondArgument === "") {
        return;
    }
    for(const value in padOperators) {
        // Accepts the changing of operator if mistyped
        if(pushedKey === padOperators[value] && operator !== "" && pushedKey !== "=") {
            if(pushedKey !== operator && pushedKey !== "c") {
                operator = pushedKey;
                keyArray.shift();
                let joinArgument = keyArray.join('');
                let parseArg = parseFloat(joinArgument);
                keyArray = [];
                secondArgument = parseArg;
                decimalButton.addEventListener('click', getKey);
                decimalButton.addEventListener('keydown', getKeyDown);
            }
        }
        // set firstArgument after calculations, to answer so you can make additional operations
        if(answer !== "" && pushedKey === padOperators[value] && pushedKey !== "=") {
            operator = pushedKey;
            firstArgument = answer;
            screenText.textContent = answer;
            firstArgumentScreen.textContent = `${answer} ${operator}`;
            decimalButton.addEventListener('click', getKey);
            decimalButton.addEventListener('keydown', getKeyDown);
            
        }
        // sets the firstArgument after a operator is selected
        if(pushedKey === padOperators[value] && firstArgument === "") {
            operator = pushedKey;
            let joinArgument = keyArray.join('');
            let parseArg = parseFloat(joinArgument);
            keyArray = [];
            firstArgument = parseArg;
            firstArgumentScreen.textContent = parseArg;
            screenText.textContent = "";
            decimalButton.addEventListener('click', getKey);
            decimalButton.addEventListener('keydown', getKeyDown);
        }
    }
    if(screenText.textContent.includes('.')) {
        decimalButton.removeEventListener('click', getKey);
        decimalButton.removeEventListener('keydown', getKeyDown);
    }

    // Runs calculations
    if(pushedKey === "=") {
        keyArray.shift();
        let joinArgument = keyArray.join('');
        let parseArg = parseFloat(joinArgument);
        if(isNaN(parseArg)) {
            alert('We don\'t add the second argument back on repeatedly')
            return;
        }
        keyArray = [];
        secondArgument = parseArg;
        secondArgumentScreen.textContent = "";
        answer = applyOperator(operator, firstArgument, secondArgument);
        if(answer === 'unsupported operator') {
            firstArgument = 0;
            secondArgument = 0;
            answer = 0;
            screenText.textContent = 'Please enter an argument first'
        }
        screenText.textContent = answer;
        firstArgumentScreen.textContent = `${firstArgument} ${operator} ${secondArgument} =`;
        firstArgument = answer;
        decimalButton.addEventListener('click', getKey);
        decimalButton.addEventListener('keydown', getKeyDown);
        return;
    }
    if(pushedKey === "c") {
        answer = "";
        firstArgument = "";
        secondArgument = "";
        operator = "";
        firstArgumentScreen.textContent = "";
        secondArgumentScreen.textContent = "";
        screenText.textContent = "";
        decimalButton.addEventListener('click', getKey);
        decimalButton.addEventListener('keydown', getKeyDown);
        return;
    }
    keyArray.push(pushedKey);
    characters = keyArray.join('')
    screenText.innerHTML = characters;
}

// Events
// Push the buttons on the screen baby
const getKey = (e) => {
    pushedKey = e.target.textContent;
    operate(e, pushedKey)
}

// Type in the numbers
const getKeyDown = (e) => {
    let storeKey = document.querySelector(`div[keydata="${e.keyCode}"]`);
    pushedKey = storeKey.textContent;
    operate(e, pushedKey);
    return;
}

// Build buttons
// Numbers
const buildPadNumbers = () => {
    for(const value in padNumbers) {
        const createDiv = document.createElement('div');
        createDiv.setAttribute('class', 'button');
        createDiv.setAttribute('id', padNumbers[value]);
        createDiv.addEventListener('click', getKey)
        createDiv.setAttribute('keydata', value);
        createDiv.textContent = padNumbers[value];
        numberPad.append(createDiv);
    }
}
buildPadNumbers()

// Operators
const buildPadOperators = () => {
    for(const value in padOperators) {
        const createDiv = document.createElement('div');
        createDiv.setAttribute('class', 'button');
        createDiv.setAttribute('id', padOperators[value]);
        createDiv.addEventListener('click', getKey)
        createDiv.setAttribute('keydata', value)
        createDiv.textContent = padOperators[value];
        operatorPad.append(createDiv);
    }
}
buildPadOperators();
const decimalButton = document.getElementById(`.`);
// Call to Create the Window Event for typing on keyboard
window.addEventListener('keydown', getKeyDown);