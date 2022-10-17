import {padNumbers, padOperators} from './data.js';
const numberPad = document.getElementById('numberPad');
const operatorPad = document.getElementById('operatorPad');
const screenText = document.getElementById('screenText');

// Build buttons
const buildPadNumbers = () => {
    for(const prop in padNumbers) {
        const createDiv = document.createElement('div');
        if(Object.hasOwn(padNumbers, prop)) {
            createDiv.setAttribute('class', 'button');
            createDiv.setAttribute('id', padNumbers[prop].key);
            createDiv.setAttribute('keydata', padNumbers[prop].keyData)
            createDiv.textContent = `${padNumbers[prop].key}`;
            numberPad.append(createDiv);
        }
    }
}
buildPadNumbers()

const buildPadOperators = () => {
    for(const prop in padOperators) {
        const createDiv = document.createElement('div');
        if(Object.hasOwn(padOperators, prop)) {
            createDiv.setAttribute('class', 'button');
            createDiv.setAttribute('id', padOperators[prop].key);
            createDiv.setAttribute('keydata', padOperators[prop].keyData)
            createDiv.textContent = `${padOperators[prop].key}`;
            operatorPad.append(createDiv);
        }
    }
}
buildPadOperators()


// Events 

// Get numberPad ids by mapping out the children
const numberChildren = Array.from(numberPad.children);
const getNumberIds = numberChildren.map(element => {
    return element.id
})
// Get operatorPad ids by mapping out the children
const operatorChildren = Array.from(operatorPad.children);
const getOperatorIds = operatorChildren.map(element => {
    return element.id
})

// Get key Event finds key push and adds to number List
const getKey = (e) => {
    const key = e.target.textContent;
    keyArray.push(key);
    characters = keyArray.join('')
    screenText.textContent = characters;
}
let keyArray = [];
let characters = ""
const getKeyDown = (e) => {
    const key = document.querySelector(`div[keydata="${e.keyCode}"]`);
    const storeKey = key.textContent;
    keyArray.push(storeKey);
    characters = keyArray.join('')
    screenText.textContent = characters;
}
// Iterate through Ids to add Events
const createNumberEvents = (e) => {
    for(let i = 0; i < getNumberIds.length; i ++) {
        const addEvents = document.getElementById(getNumberIds[i]);
        addEvents.addEventListener('click', getKey);
    }
}
const createOperatorEvents = (e) => {
    for(let i = 0; i < getOperatorIds.length; i ++) {
        const addEvents = document.getElementById(getOperatorIds[i]);
        addEvents.addEventListener('click', getKey);
    }
}
createNumberEvents()
createOperatorEvents()
window.addEventListener('keydown', getKeyDown);