function moveToNextInput(currentInput) {
  if (currentInput.value.length === 1) {
    const nextInput = currentInput.nextElementSibling;
    if (nextInput) {
      nextInput.focus();
    }
  }
}
function moveToPreviousInput(event, currentInput) {
  if (event.key === 'Backspace' && currentInput.value.length === 0) {
    const previousInput = currentInput.previousElementSibling;
    if (previousInput) {
      previousInput.focus();
    }
  }
}
function generateCode(){
  let num = "";
  for (let i = 0; i < 4; i++) {
    let randomNum = Math.floor(Math.random() * 10);
    num += randomNum.toString();
  }
  console.log(num);
}
