class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand!== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

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
            case '/': 
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
  getdisplay(number){
    const stringnumber=number.toString()
    const integerdigits=parseFloat(stringnumber.split('.')[0])
    const decimaldigits=stringnumber.split('.')[1]
    let integerDisplay
    if(isNaN(integerdigits)) {
        integerDisplay=''
    }
    else{
        integerDisplay =integerdigits.toLocaleString('en',{maximumFractionDigits})
        }

     if (decimaldigits !=null) {
        return `${integerDisplay}.${decimaldegits}`
     }   
    }
  


    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
       this.getdisplay(this.currentOperand)
        this.previousOperandTextElement.innerText = this.previousOperand; 
    if(this.operation !=null){
        this.previousOperandTextElement.innerText=`${this.previousOperand}${this.operation}`
    } else{
        this.previousOperandTextElement.innerText=''
    }
    
  }
}

const numberButtons = document.querySelectorAll('[data-numbers]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => { 
        calculator.appendNumber(button.innerText); 
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => { 
        calculator.chooseOperation(button.innerText); 
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {  
    calculator.compute();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => { 
    calculator.clear();
    calculator.updateDisplay();
});