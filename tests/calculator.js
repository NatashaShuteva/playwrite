// Function to add two numbers
function add(a, b) {
    return a + b;
}

// Function to subtract two numbers
function subtract(a, b) {
    return a - b;
}

// Function to multiply two numbers
function multiply(a, b) {
    return a * b;
}

// Function to divide two numbers
function divide(a, b) {
    if (b === 0) {
        return 'Error: Cannot divide by zero';
    }
    return a / b;
}

// Test the functions
const num1 = 10;
const num2 = 5;

console.log(`Addition: ${num1} + ${num2} = ${add(num1, num2)}`);
console.log(`Subtraction: ${num1} - ${num2} = ${subtract(num1, num2)}`);
console.log(`Multiplication: ${num1} * ${num2} = ${multiply(num1, num2)}`);
console.log(`Division: ${num1} / ${num2} = ${divide(num1, num2)}`);