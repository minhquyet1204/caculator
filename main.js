const caculator = {
  displayValue: "0",
  displayOpe: "",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

const updateDisplay = () => {
  const display = document.querySelector(".screen");

  display.value = caculator.displayValue;
};

updateDisplay();

const keys = document.querySelector(".keys");
keys.addEventListener("click", (event) => {
  const { target } = event;

  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.value);

    updateDisplay();
    return;
  }

  if (target.classList.contains("all-clear")) {
    resetCaculator();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});

const inputDigit = (digit) => {
  const { displayValue, waitingForSecondOperand } = caculator;

  if (waitingForSecondOperand === true) {
    caculator.displayValue = digit;
    caculator.waitingForSecondOperand = false;
  } else {
    caculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
};

const inputDecimal = (dot) => {
  if (caculator.waitingForSecondOperand === true) {
    caculator.displayValue = "0.";
    caculator.waitingForSecondOperand === false;

    return;
  }

  if (!caculator.displayValue.includes(dot)) {
    caculator.displayValue += dot;
  }
};

const handleOperator = (nextOperator) => {
  const { firstOperand, displayValue, operator } = caculator;
  const inputValue = parseFloat(displayValue);

  if (operator && caculator.waitingForSecondOperand) {
    caculator.operator = nextOperator;
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    caculator.firstOperand = inputValue;
  } else if (operator) {
    const result = caculate(firstOperand, inputValue, operator);

    caculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    caculator.firstOperand = result;
  }

  caculator.waitingForSecondOperand = true;
  caculator.operator = nextOperator;
};

const caculate = (firstOperand, secondOperand, operator) => {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }

  return secondOperand;
};

const resetCaculator = () => {
  caculator.displayValue = "0";
  caculator.firstOperand = null;
  caculator.waitingForSecondOperand = false;
  caculator.operator = null;
};
