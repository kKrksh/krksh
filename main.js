let current = 1;
const displayer = document.getElementById("display");
function scrollForward() {
  if (current === 4) {
    current = 0;
  }
  current++;
  displayer.src = `media/image${current}.jpg`;
}
function scrollBackwards() {
  if (current === 1) {
    current = 5;
  }
  current--;
  displayer.src = `media/image${current}.jpg`;
}
