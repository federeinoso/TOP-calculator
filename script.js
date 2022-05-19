//SELECT BUTTONS
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-all-clear]");
//SELECT DISPLAY
const currentDisplay = document.querySelector("[data-current-operand]");
const previousDisplay = document.querySelector("[data-previous-operand]");

//ENTRY VARIABLES

let currentOperand = "";
let previousOperand = "";
let operation = null;

//LISTENERS

numberButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentOperand === 0 ? (currentOperand = "") : "";
    if (btn.textContent === "." && currentOperand.includes(".")) return;
    currentOperand += btn.textContent;
    updateDisplay();
  });
});

operatorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentOperand === "") return;
    operation = btn.textContent;
    operate();
    updateDisplay();
  });
});

clearButton.addEventListener("click", () => {
  currentOperand = 0;
  previousOperand = "";
  operation = null;
  updateDisplay();
});

deleteButton.addEventListener("click", () => {
  let temp;
  if (currentOperand === "Error") {
    currentOperand = 0;
    temp = currentOperand;
  } else {
    temp = currentOperand.toString().slice(0, -1);
  }
  if (temp === "" || temp === "0") {
    temp = 0;
    currentOperand = temp;
    updateDisplay();
  } else {
    currentOperand = parseFloat(temp);
    updateDisplay();
  }
});

equalsButton.addEventListener("click", () => {
  calculateResults();
  updateDisplay();
});

//FUNCTIONS

function updateDisplay() {
  currentDisplay.textContent = currentOperand;
  previousDisplay.textContent = previousOperand;
}

function operate() {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    calculateResults();
  }
  previousOperand = `${currentOperand} ${operation}`;
  currentOperand = "";
}

function calculateResults() {
  let curr = parseFloat(currentOperand);
  let prev = parseFloat(previousOperand);
  let results;

  if (isNaN(prev) || isNaN(curr)) return;

  operation === "+"
    ? (results = prev + curr)
    : operation === "-"
    ? (results = prev - curr)
    : operation === "x"
    ? (results = prev * curr)
    : operation === "÷" && curr === 0
    ? (results = "Error")
    : operation === "÷"
    ? (results = prev / curr)
    : "";

  currentOperand = results;
  operation = null;
  previousOperand = "";
}
