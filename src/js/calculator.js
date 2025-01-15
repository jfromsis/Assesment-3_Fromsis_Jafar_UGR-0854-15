// src/js/calc.js

document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    const clearButton = document.getElementById("clear");
    const equalsButton = document.getElementById("equals");

    let currentInput = "";
    let operator = "";
    let previousInput = "";

    // Handle button clicks
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");

            if (["+", "-", "*", "/"].includes(value)) {
                // Handle operator
                if (currentInput !== "") {
                    operator = value;
                    previousInput = currentInput;
                    currentInput = "";
                }
            } else {
                // Handle numbers
                currentInput += value;
            }

            updateDisplay();
        });
    });

    // Handle equals
    equalsButton.addEventListener("click", () => {
        if (currentInput !== "" && previousInput !== "" && operator !== "") {
            currentInput = calculate(previousInput, currentInput, operator).toString();
            previousInput = "";
            operator = "";
            updateDisplay();
        }
    });

    // Handle clear
    clearButton.addEventListener("click", () => {
        currentInput = "";
        previousInput = "";
        operator = "";
        updateDisplay();
    });

    // Update the calculator display
    function updateDisplay() {
        display.value = currentInput || previousInput || "0";
    }

    // Perform calculation
    function calculate(a, b, operator) {
        const numA = parseFloat(a);
        const numB = parseFloat(b);

        switch (operator) {
            case "+":
                return numA + numB;
            case "-":
                return numA - numB;
            case "*":
                return numA * numB;
            case "/":
                return numB !== 0 ? numA / numB : "Error";
            default:
                return 0;
        }
    }
});
