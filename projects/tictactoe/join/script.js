let counter = 1;
let pills = document.querySelectorAll(".pill");
let joinButton = document.getElementById("join");

let allowedInputs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
document.getElementById(counter).style.border = "2px solid red";
document.getElementById(counter).focus();
pills.forEach((pill) => {
  pill.addEventListener("keydown", (event) => {
    if (allowedInputs.includes(event.key)) {
      if (counter === 0) {
        counter++;
      }
      resetStyle();
      pill.value = event.key;
      event.preventDefault();
      if (counter < 4) {
        counter++;
      }
      document.getElementById(counter).focus();
      document.getElementById(counter).style.border = "2px solid red";
    } else if (event.key === "Backspace" && counter !== 0) {
      resetStyle();
      document.getElementById(counter).focus();
      document.getElementById(counter).style.border = "2px solid red";
      counter--;
    } else {
      event.preventDefault();
    }
  });
});

function resetStyle() {
  pills.forEach((pill) => {
    pill.style.border = "1px solid #000000";
  });
}

function join() {
  let room = "";
  pills.forEach((pill) => {
    room += pill.value;
  });
  console.log(room);
  if (room.length === 4) {
    window.location = `http://krksh.site/tictactoe?room=${room}`;
  } else {
    alert("Please enter a valid room number");
  }
}

joinButton.addEventListener("click", () => {
  join();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    join();
  }
});
