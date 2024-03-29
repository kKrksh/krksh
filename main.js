let current = 1;
const displayer = document.getElementById("display");
let color = "white"
function scrollForward() {
  if (current === 4) {
    current = 0;
  }
  current++;
  displayer.src = `media/image${current}${color}.jpg`;
}
function scrollBackwards() {
  if (current === 1) {
    current = 5;
  }
  current--;
  displayer.src = `media/image${current}${color}.jpg`;
}
function colorSelection(col) {
  color = col
  current = 1;
  displayer.src = `media/image${current}${color}.jpg`;
}
