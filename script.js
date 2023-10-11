
const displayElement = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const decimalButton = document.querySelector('.decimal');
const percentageButton = document.querySelector('.percentage');
const backspaceButton = document.querySelector('.backspace');
const memoryAddButton = document.querySelector('.memory-add');
const memorySubtractButton = document.querySelector('.memory-subtract');
const memoryRecallButton = document.querySelector('.memory-recall');
const memoryClearButton = document.querySelector('.memory-clear');
const darkModeToggle = document.querySelector('.dark-mode-toggle');

let currentInput = '';
let previousInput = '';
let operator = null;
let memoryValue = 0;
let darkMode = false;


function updateDisplay() {
    displayElement.textContent = currentInput;
}

function clear() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay();
}

function handleNumberClick(number) {
    if (currentInput === '0' || currentInput === '-0') {
        currentInput = number.toString();
    } else {
        currentInput += number.toString();
    }
    updateDisplay();
}

// Function to handle operator button clicks
function handleOperatorClick(op) {
    if (currentInput !== '') {
        if (previousInput !== '') {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }
}

// Function to perform the calculation
function calculate() {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    if (isNaN(num1) || isNaN(num2)) return;

    switch (operator) {
        case '+':
            currentInput = (num1 + num2).toString();
            break;
        case '-':
            currentInput = (num1 - num2).toString();
            break;
        case '*':
            currentInput = (num1 * num2).toString();
            break;
        case '/':
            currentInput = (num2 !== 0 ? (num1 / num2).toString() : 'Error');
            break;
    }

    updateDisplay();
    previousInput = '';
    operator = null;
}

// Function to handle the equals button click
function handleEqualsClick() {
    calculate();
}

// Function to handle the decimal button click
function handleDecimalClick() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function handlePercentageClick() {
    const num = parseFloat(currentInput);
    if (!isNaN(num)) {
        currentInput = (num / 100).toString();
        updateDisplay();
    }
}

function handleBackspaceClick() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0';
    }
    updateDisplay();
}

// Function to handle memory add button click
function handleMemoryAddClick() {
    const num = parseFloat(currentInput);
    if (!isNaN(num)) {
        memoryValue += num;
    }
}

function handleMemorySubtractClick() {
    const num = parseFloat(currentInput);
    if (!isNaN(num)) {
        memoryValue -= num;
    }
}


function handleMemoryRecallClick() {
    currentInput = memoryValue.toString();
    updateDisplay();
}


function handleMemoryClearClick() {
    memoryValue = 0;
}


function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    darkMode = !darkMode;
}


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleNumberClick(button.textContent);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleOperatorClick(button.textContent);
    });
});

equalsButton.addEventListener('click', handleEqualsClick);

clearButton.addEventListener('click', clear);

decimalButton.addEventListener('click', handleDecimalClick);

percentageButton.addEventListener('click', handlePercentageClick);

backspaceButton.addEventListener('click', handleBackspaceClick);

// memoryAddButton.addEventListener('click', handleMemoryAddClick);

// memorySubtractButton.addEventListener('click', handleMemorySubtractClick);

// memoryRecallButton.addEventListener('click', handleMemoryRecallClick);

// memoryClearButton.addEventListener('click', handleMemoryClearClick);

darkModeToggle.addEventListener('click', toggleDarkMode);

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        handleNumberClick(key);
    } else if (key === '.') {
        handleDecimalClick();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleOperatorClick(key);
    } else if (key === 'Enter') {
        handleEqualsClick();
    } else if (key === '%') {
        handlePercentageClick();
    } else if (key === 'Backspace') {
        handleBackspaceClick();
    }
});