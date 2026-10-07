class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.currentOperandTextElement.classList.remove('error-shake');
    }

    delete() {
        if (this.currentOperand === 'Error') {
            this.clear();
            return;
        }
        if (this.currentOperand === '0') return;
        
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
    }

    appendNumber(number) {
        if (this.currentOperand === 'Error') this.clear();
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === 'Error') return;
        if (this.currentOperand === '0' && this.previousOperand === '') return;
        
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        // Handle case where user just wants to change operation
        if (this.currentOperand === '0' && this.previousOperand !== '') {
             this.operation = operation;
             return;
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    this.currentOperand = 'Error';
                    this.previousOperand = '';
                    this.operation = undefined;
                    this.currentOperandTextElement.classList.add('error-shake');
                    setTimeout(() => {
                        this.currentOperandTextElement.classList.remove('error-shake');
                    }, 400);
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        // Format to avoid long decimals like 0.1 + 0.2 = 0.30000000000000004
        computation = Math.round(computation * 10000000000) / 10000000000;
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        if (number === 'Error') return number;
        
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '0';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.getElementById('equals');
const deleteButton = document.getElementById('delete');
const clearButton = document.getElementById('clear');
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operation);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

// Keyboard support
document.addEventListener('keydown', e => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
        calculator.appendNumber(e.key);
        calculator.updateDisplay();
    }
    if (e.key === '=' || e.key === 'Enter') {
        e.preventDefault(); // prevent form submission or default button click
        calculator.compute();
        calculator.updateDisplay();
    }
    if (e.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }
    if (e.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }
    if (e.key === '+' || e.key === '-' || e.key === '*') {
        calculator.chooseOperation(e.key);
        calculator.updateDisplay();
    }
    if (e.key === '/') {
        e.preventDefault(); // prevent quick find in firefox
        calculator.chooseOperation('÷');
        calculator.updateDisplay();
    }
});
