const grid = document.getElementById("grid");
let turn = true;
let run = true;
let resetBool = true;
const player = document.getElementById("player");
const message = document.getElementById("message");
const resetDiv = document.getElementById("resetDiv");
for (let i = 0; i < 9; i++) {
  let newDiv = document.createElement("div");
  newDiv.id = i;
  newDiv.className = "cell";
  grid.appendChild(newDiv);
}

function reset(self = true) {
  if (self) {
    socket.emit("resetClient", room);
  }
  cells.forEach((cell) => {
    cell.style.color = "black";
    cell.style.backgroundColor = "white";
    cell.innerHTML = "";
    run = true;
    turn = true;
    message.innerHTML =
      'Player &nbsp; <span id="player"> X </span> &nbsp; to move';
    resetDiv.innerHTML = "";
    resetBool = true;
  });
}

function addReset() {
  if (resetBool) {
    const resetButton = document.createElement("button");
    resetButton.innerHTML = "Reset";
    resetButton.id = "reset";
    resetDiv.appendChild(resetButton);
    resetButton.addEventListener("click", reset);
    resetBool = false;
  }
}

const cells = document.querySelectorAll(".cell");
function handleClick(cellId, self = true) {
  if (run) {
    if (self) {
      socket.emit("move", cellId, room);
    }

    let cell = document.getElementById(cellId);
    if (cell.innerHTML === "" && run) {
      cell.innerHTML = turn ? "X" : "O";
      if (turn) {
        cell.style.color = "red";
        player.innerHTML = "O";
        player.style.color = "blue";
      } else {
        cell.style.color = "blue";
        player.innerHTML = "X";
        player.style.color = "red";
      }
      checkWin();
      turn = !turn;
    }
  }
}

function addEL() {
  cells.forEach((cellC) => {
    cellC.addEventListener("click", function () {
      handleClick(cellC.id);
    });
  });
}
addEL();

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin() {
  winningCombos.forEach((combo) => {
    if (
      document.getElementById(combo[0]).innerHTML ===
        document.getElementById(combo[1]).innerHTML &&
      document.getElementById(combo[1]).innerHTML ===
        document.getElementById(combo[2]).innerHTML &&
      document.getElementById(combo[0]).innerHTML !== ""
    ) {
      document.getElementById(combo[0]).style.backgroundColor =
        "rgba(0, 255, 0, 0.533)";
      document.getElementById(combo[1]).style.backgroundColor =
        "rgba(0, 255, 0, 0.533)";
      document.getElementById(combo[2]).style.backgroundColor =
        "rgba(0, 255, 0, 0.533)";
      let color = turn ? "red" : "blue";
      let tempPlayer = turn ? "X" : "O";
      console.log(color, tempPlayer);
      message.innerHTML = `<span style= "color: ${color}">${tempPlayer}</span> &nbsp; Wins`;
      run = false;
      addReset();
    }
  });
}

//MULTIPLAYER HANDLING
const socket = io("https://tictactoe-server-krksh.glitch.me/");
socket.on("connection", () => {
  console.log(socket.id)
})
//MAIN
socket.on("send", (id, self) => {
  console.log("receieved");
  handleClick(id, self);
});

socket.on("resetServer", () => {
  reset(false);
});

//ROOM HANDLING
let Terminate = false;

const params = new URLSearchParams(window.location.search);
const room = params.get("room");
if (room === null) {
  window.location = "https://krksh.site/projects/tictactoe/join";
} else {
  join();
}
function join() {
  socket.emit("join", room);
}
socket.on("terminate", () => {
  Terminate = true;
  window.location = "https://krksh.site/projects/tictactoe/join";
});

function leave() {
  if (!Terminate) {
    socket.emit("leave", room);
  }
}

window.addEventListener("beforeunload", leave);

//ROOM HANDLING
