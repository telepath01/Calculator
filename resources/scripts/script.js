"use strict";

// Element calls from index.heml
const outputDisplay = document.querySelector(".screen-output");
const operatorsBtn = document.querySelectorAll(".num-operator");
const numberBtn = document.querySelectorAll(".num-btn");
const clearBtn = document.querySelector(".clear-btn");
const backSpace = document.querySelector(".backspace-btn");
// Global variables
let firstNumber = "";
let secondNumber = "";
let operator = "";
let firstNumberBool = false;
let inputSection = "";

// Functions
function sum(num1, num2) {
  firstNumber = Number(num1) + Number(num2);
  secondNumber = "";
  return firstNumber;
}

function minus(num1, num2) {
  firstNumber = Number(num1) - Number(num2);
  secondNumber = "";
  return firstNumber;
}

function multiply(num1, num2) {
  firstNumber = Number(num1) * Number(num2);
  secondNumber = "";
  return firstNumber;
}
function devide(num1, num2) {
  firstNumber = Number(num1) / Number(num2);
  secondNumber = "";
  return firstNumber;
}

function outOfRange() {
  if (outputDisplay.textContent.length > 20) {
    outputDisplay.textContent = "OUT OF RANGE!!!";
  }
}

function resetCalculator() {
  firstNumber = "";
  secondNumber = "";
  outputDisplay.textContent = 0;
  operator = "";
  firstNumberBool = false;
}

// Application
numberBtn.forEach((button) => {
  button.addEventListener("click", (element) => {
    if (!firstNumberBool) {
      inputSection = "firstValue";
      firstNumber = firstNumber + element.target.innerText;
      outputDisplay.textContent = firstNumber;
      outOfRange();
    } else {
      inputSection = "secondValue";
      secondNumber += element.target.innerText;
      outputDisplay.textContent = firstNumber + operator + secondNumber;
      outOfRange();
    }

    //
  });
});

operatorsBtn.forEach((button) => {
  button.addEventListener("click", (element) => {
    if (button.textContent != "=") {
      firstNumberBool = true;
      operator = button.textContent;
      inputSection = "operator";

      outOfRange();
    } else if (operator === "+") {
      inputSection = "operator";
      outOfRange();
      sum(firstNumber, secondNumber);
      outputDisplay.textContent = firstNumber;
      operator = "";
    } else if (operator === "-") {
      outOfRange();
      minus(firstNumber, secondNumber);
      outputDisplay.textContent = firstNumber;
      operator = "";
    } else if (operator === "x") {
      outOfRange();
      multiply(firstNumber, secondNumber);
      outputDisplay.textContent = firstNumber;
      operator = "";
    } else if (operator === "÷") {
      outOfRange();
      devide(firstNumber, secondNumber);
      outputDisplay.textContent = firstNumber;
      operator = "";
    }
  });
});

clearBtn.addEventListener("click", () => {
  resetCalculator();
});

backSpace.addEventListener("click", () => {
  if (inputSection === "firstValue" && !firstNumberBool) {
    if (firstNumber.length <= 0) {
      firstNumber = "";
      outputDisplay.textContent = 0;
    } else if (firstNumber.length >= 1) {
      firstNumber = firstNumber.slice(0, -1);
      outputDisplay.textContent = firstNumber;
    }
  } else if (inputSection === "operator") {
    operator = "";
    inputSection = "firstValue";
    outputDisplay.textContent = firstNumber;
  } else if (inputSection === "secondValue" && firstNumberBool) {
    if (secondNumber.length <= 0) {
      inputSection = "operator";
      secondNumber = "";
      outputDisplay.textContent = firstNumber + operator;
    } else if (firstNumber.length >= 1) {
      secondNumber = secondNumber.slice(0, -1);
      outputDisplay.textContent = firstNumber + operator + secondNumber;
    }
  }
});
