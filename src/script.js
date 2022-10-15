const padNumbers = [7,8,9,4,5,6,1,2,3,".",0,"^"];
const padOperators = ["/","x","+","-","="];
const numberPad = document.getElementById('numberPad');
const operatorPad = document.getElementById('operatorPad');

// Build buttons
const buildPadNumbers = () => {
    for(let i = 0; i < padNumbers.length; i++) {
    const createDiv = document.createElement('div');
    createDiv.setAttribute('class', 'button');
    createDiv.setAttribute('id', padNumbers[i]);
    createDiv.textContent = padNumbers[i];
    numberPad.appendChild(createDiv);
    }
}
buildPadNumbers();

const buildPadOperators = () => {
    for(let i = 0; i < padOperators.length; i++) {
    const createDiv = document.createElement('div');
    createDiv.setAttribute('class', 'button');
    createDiv.setAttribute('id', padOperators[i]);
    createDiv.textContent = padOperators[i]
    operatorPad.appendChild(createDiv);
    }
}
buildPadOperators();

// Events 
const events = () => {

}
events();