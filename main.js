let current = 1;
const displayer = document.getElementById("display");
let color = "white"
function scrollForward() {
  document.getElementById(`c${current}`).style = "color:black;";
  if (current === 4) {
    current = 0;
  }
  current++;
  displayer.src = `media/image${current}${color}.jpg`;
  document.getElementById(`c${current}`).style = "color:white;";
}
function scrollBackwards() {
  document.getElementById(`c${current}`).style = "color:black;";
  if (current === 1) {
    current = 5;
  }
  current--;
  displayer.src = `media/image${current}${color}.jpg`;
  document.getElementById(`c${current}`).style = "color:white;";
}
function colorSelection(col) {
  color = col
  current = 1;
  displayer.src = `media/image${current}${color}.jpg`;
}
