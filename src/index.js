import Calculator from "./Calculator.js";

// Create an instance of the Calculator class
const calculator = new Calculator();

// Get display elements
const display = document.getElementById("display");
const memory = document.getElementById("memory");

// Get all buttons
const keys = document.querySelectorAll(".key");

// Function to update the display
function updateDisplay() {
    display.textContent = calculator.getMainDisplay();
        memory.textContent = calculator.getMemoryDisplay(); // Display current expression in memory
}

// Add event listener to all buttons
keys.forEach(key => {
    key.addEventListener("click", () => {
        const digit = key.dataset.digit;
        const action = key.dataset.action;

        if (digit !== undefined) {
            // Add digit or decimal point
            calculator.appendDigit(digit);
        } else if (action !== undefined) {
            // Perform operation based on action
            switch(action) {
                case "clear":
                    calculator.reset();
                    break;
                case "neg":
                    calculator.toggleSign();
                    break;
                case "percent":
                    calculator.percent();
                    break;
                case "=":
                    calculator.calculate();
                    break;
                case "+": case "-": case "*": case "/":
                    calculator.appendOperator(action);
                    break;
            }
        }

        // Update display after each click
        updateDisplay();
    });
});

// Initial display update
updateDisplay();