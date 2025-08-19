// Operation functions
function add(x, y) {
    return x + y;
};

function subtract(x, y) {
    return x - y;
};

function multiply(x, y) {
    return x * y;
};

function divide(x, y) {
    return x / y;
};

let operandOne;
let operandTwo;
let operator;

const regexNum = /[\d]/g;
const regexOperators = /[+\-*/]/g;
const regexChange = /\d[+\-*/]\d/g;
const regexDividebyZero = /\d\/0/g;

const display = document.querySelector("#calculatorScreen");
const buttonContainer = document.querySelector("#buttonContainer");

let inputs = [];

function operate(operandOne, operator, operandTwo) {
    switch (operator) {
        case "+":
            add(operandOne, operandTwo);
            break;
        
        case "-":
            subtract(operandOne, operandTwo);
            break;

        case "*":
            multiply(operandOne, operandTwo);
            break;

        case "/":
            divide(operandOne, operandTwo);
            break;
    }
};

function updateDisplay(event) {
    const buttonClicked = event.target;
    if (buttonClicked.classList.contains("operand")) {
         display.value += buttonClicked.textContent;
    }

    else if (buttonClicked.classList.contains("operator") && !regexOperators.test(display.value) && regexNum.test(display.value)) {      
         display.value += buttonClicked.textContent;   
    }

    else if (buttonClicked.classList.contains("operator") && regexOperators.test(display.value) && !regexChange.test(display.value) && !display.value.includes(buttonClicked.textContent)) {
         display.value.replace(regexOperators, buttonClicked.textContent);    
    } 

    else if ((buttonClicked.classList.contains("operator") || buttonClicked.classList.contains("equals") ) && regexChange.test(display.value) && !regexDividebyZero.test(display.value)) {
         let inputs = display.value.split(/[\s]/, 3);
         let operandOne = +inputs[0];
         let operandTwo = +inputs[2];
         let operator = inputs[1];

         let result = operate(operandOne, operator, operandTwo);
         display.value = result.toString();     
    }

    else if ((buttonClicked.classList.contains("operator") || buttonClicked.classList.contains("equals") ) && regexDividebyZero.test(display.value)) {
         display.value = "ERROR do not divide by 0!";   
    };
};