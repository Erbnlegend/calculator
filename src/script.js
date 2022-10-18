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

// Change the operator
const applyOperator = (op, a, b) =>
{ switch (op)
  { case "+": return a + b
    case "-": return a - b
    case "*": return a * b
    case "/": return a / b
    case "%": return a % b
    case "^": return Math.pow(a, b)
    default: throw Error(`unsupported operator: ${op}`)
  }
}

// Events
// Push the buttons on the screen baby
const getKey = (e) => {
    for(const value in padOperators) {
        if(e.target.textContent === padOperators[value] && firstArgument === "") {
            operator = e.target.textContent;
            let joinArgument = keyArray.join('');
            let parseArg = parseInt(joinArgument);
            keyArray = [];
            firstArgument = parseArg;
            firstArgumentScreen.textContent = parseArg;
        }
    }
    if(e.target.textContent === "=") {
        keyArray.shift();
        let joinArgument = keyArray.join('');
        let parseArg = parseInt(joinArgument);
        keyArray = [];
        secondArgument = parseArg;
        secondArgumentScreen.textContent = operator + ' ' + parseArg;
        let answer = applyOperator(operator, firstArgument, secondArgument);
        screenText.textContent = answer;
        firstArgument = "";
        secondArgument = "";
        return;
    }
    const pushedKey = e.target.textContent;
    keyArray.push(pushedKey);
    characters = keyArray.join('')
    screenText.innerHTML = characters;
}

// Type in the numbers
const getKeyDown = (e) => {
    const pushedKey = document.querySelector(`div[keydata="${e.keyCode}"]`);
    const storeKey = pushedKey.textContent;
    for(const value in padOperators) {
        if(storeKey === padOperators[value] && firstArgument === "") {
            operator = storeKey;
            let joinArgument = keyArray.join('');
            let parseArg = parseInt(joinArgument);
            keyArray = [];
            firstArgument = parseArg;
            firstArgumentScreen.textContent = parseArg;
        }
    }
    if(storeKey === "=") {
        keyArray.shift();
        let joinArgument = keyArray.join('');
        let parseArg = parseInt(joinArgument);
        keyArray = [];
        secondArgument = parseArg;
        secondArgumentScreen.textContent = operator + ' ' + parseArg;
        let answer = applyOperator(operator, firstArgument, secondArgument);
        screenText.textContent = answer;
        firstArgument = "";
        secondArgument = "";
        return;
    }
    keyArray.push(storeKey);
    characters = keyArray.join('')
    screenText.innerHTML = characters;
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

// Call to Create the Window Event for typing on keyboard
window.addEventListener('keydown', getKeyDown);