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

const regexNum = /[\d]/;
const regexOperators = /[+\-*/]/;
const regexChange = /\d\s[+\-*/]\s\d/;
const regexDividebyZero = /\d\s\/\s0/;
const regexDecimal = /[.]/;

const display = document.querySelector("#calculatorScreen");
const buttonContainer = document.querySelector("#buttonContainer");

// let inputs = [];

function operate(operandOne, operator, operandTwo) {
    switch (operator) {
        case "+":
            return add(operandOne, operandTwo);
            
        
        case "-":
           return subtract(operandOne, operandTwo);

        case "*":
           return multiply(operandOne, operandTwo);

        case "/":
           return divide(operandOne, operandTwo);
    }
};

function updateDisplay(event) {
    const buttonClicked = event.target;
    if (buttonClicked.classList.contains("operand") && display.classList.contains("resultDisplayed")) {
        display.value = "";
        display.value += buttonClicked.textContent;
        display.classList.toggle("resultDisplayed");
    }
   
    else if (buttonClicked.classList.contains("operand")) {
         display.value += buttonClicked.textContent;
    }
    
    else if (buttonClicked.classList.contains("decimal") && !regexDecimal.test(display.value)) {
         display.value += buttonClicked.textContent;
    }
    
    else if (buttonClicked.classList.contains("decimal") && regexDecimal.test(display.value)) {
         display.value = display.value;
    }

    else if (buttonClicked.classList.contains("operator") && !regexOperators.test(display.value) && regexNum.test(display.value)) {      
         display.value += buttonClicked.textContent;   
    }

    else if (buttonClicked.classList.contains("operator") && regexOperators.test(display.value) && !regexChange.test(display.value) && !display.value.includes(buttonClicked.textContent)) {
        display.value = display.value.replace(regexOperators, buttonClicked.textContent.replace(/[\s]/g, ""));    
    } 

    else if (buttonClicked.classList.contains("operator") && regexChange.test(display.value) && !regexDividebyZero.test(display.value)) {
         let inputs = display.value.split(/[\s]/, 3);
         let operandOne = +inputs[0];
         let operandTwo = +inputs[2];
         let operator = inputs[1];
        
         let result = operate(operandOne, operator, operandTwo);
         display.value = parseFloat(result.toFixed(3)).toString() + buttonClicked.textContent;     
    }
    
    else if (buttonClicked.classList.contains("equals") && regexChange.test(display.value) && !regexDividebyZero.test(display.value)) {
         let inputs = display.value.split(/[\s]/, 3);
         let operandOne = +inputs[0];
         let operandTwo = +inputs[2];
         let operator = inputs[1];
        
         display.classList.toggle("resultDisplayed");
         let result = operate(operandOne, operator, operandTwo);
         display.value = parseFloat(result.toFixed(3)).toString();     
    }

    else if ((buttonClicked.classList.contains("operator") || buttonClicked.classList.contains("equals") ) && regexDividebyZero.test(display.value)) {
         display.value = "ERROR do not divide by 0!";   
    }

    else if (buttonClicked.classList.contains("clear")) {
        display.value = ""
    }

    else if (buttonClicked.classList.contains("backSpace") && display.value.endsWith(" ")) {
        display.value = display.value.slice(0, -3);
    }
    
    else if (buttonClicked.classList.contains("backSpace")) {
        display.value = display.value.slice(0, -1);
    }
};

function inputFilter(event) {
    const inputElement = event.target;
    const numericalCharacters = /[^0123456789+\-*/\s]/g;
    inputElement.value = inputElement.value.replace(numericalCharacters, "");
};

const zero = document.querySelector("#zero");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");
const addition = document.querySelector("#addition");
const point = document.querySelector("#point");
const subtraction = document.querySelector("#subtract");
const multiplication = document.querySelector("#multiply");
const division = document.querySelector("#divide");
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");
const backSpace = document.querySelector("#backSpace")

function keyBoardSupport(event) {
    switch (event.key) {
        case "0":
            event.preventDefault();
            zero.click()
            break;
        case "1":
            event.preventDefault();
            one.click()
            break;
        case "2":
            event.preventDefault();
            two.click()
            break;
        case "3":
            event.preventDefault();
            three.click()
            break;
        case "4":
            event.preventDefault();
            four.click()
            break;
        case "5":
            event.preventDefault();
            five.click()
            break;
        case "6":
            event.preventDefault();
            six.click()
            break;
        case "7":
            event.preventDefault();
            seven.click()
            break;
        case "8":
            event.preventDefault();
            eight.click()
            break;
        case "9":
            event.preventDefault();
            nine.click()
            break;
        case ".":
            event.preventDefault();
            point.click()
            break;
        case "+":
            event.preventDefault();
            addition.click();
            break;
        case "-":
            event.preventDefault();
            subtraction.click()
            break;
        case "*":
            event.preventDefault();
            multiplication.click()
            break;
        case "/":
            event.preventDefault();
            division.click()
            break;
        case "Enter":
            event.preventDefault();
            equals.click()
            break;
        case "Backspace":
            event.preventDefault();
            backSpace.click()
            break;

    }
}

buttonContainer.addEventListener("click", updateDisplay);
display.addEventListener("keydown", inputFilter);
display.addEventListener("keydown", keyBoardSupport);
