oconst Namen = ["Ali", "Linus", "Karam", "Thomas"];

function spin() {
  let counter = 0;
  let previousIndex = -1;

  let intervalId = setInterval(() => {
    if (counter < 40) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * Namen.length);
      } while (newIndex === previousIndex);
      previousIndex = newIndex;
      document.getElementById("name").textContent = Namen[newIndex];
      counter++;
    } else {
      clearInterval(intervalId);
    }
  }, 100);
}
