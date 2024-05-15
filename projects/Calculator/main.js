let display = document.getElementById("display");
let expression = "";
let displayExpression = "";
document.getElementById('pareOpen').onclick = function() {
  main("(");
};
document.getElementById('pareClose').onclick = function() {
  main(")");
};

function main(input){
  switch (input){
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      expression += input;
      displayExpression += input;
      display.textContent = displayExpression;
      break;
    case "+":
    case "-":
    case "*":
    case "/":
    case "(":
    case ")":
      expression += " " + input + " ";
      if (input === "*"){
        displayExpression += " x ";
      }
      else if (input === "-"){
        displayExpression += " - ";
      }
      else if (input === "+"){
        displayExpression += " + ";
      }
      else if (input === "/"){
        displayExpression += " ÷ ";
      }
      else if (input === "("){
        displayExpression += "(";
      }
      else if (input === ")"){
        displayExpression += ")";
      }
      display.textContent = displayExpression;
      break;
    case ".":
      expression += input;
      display.textContent = displayExpression;
      break;
    case "delete":
      expression = expression.slice(0, -1)
      displayExpression = displayExpression.slice(0, -1)
      if (expression.length === 0){
        display.textContent = 0;
      }
      else{
        display.textContent = displayExpression;
      }
      break;
    case "clear":
      display.textContent = "0";
      expression = "";
      displayExpression = "";
      break;
    case "=":
      if (expression.length === 0){
        display.textContent = 0;
      }
      else if (eval(expression) === Infinity){
        display.textContent = "Error";
      }
      else{
        display.textContent = eval(expression);
      }
      expression = "";
      displayExpression = "";
      break;
  }
}


