const email = document.getElementById("email");
const next = document.getElementById("send");
const fstep = document.getElementById("firstStep");
const sestep = document.getElementById("secondStep");
const label = document.getElementById("label");

let tempEmail;

const socket = io("http://localhost:3000");

next.addEventListener("click", () => {
  const scopeEmail = email.value;
  tempEmail = scopeEmail;
  socket.emit("checkForExistingEmail", scopeEmail);
});

socket.on("existingEmail", (result) => {
  if (result) {
    sstep();
  } else {
    error();
  }
});

function sstep() {
  fstep.style.display = "none";
  sestep.style.display = "block";
}

function error() {
  label.innerHTML = "Please enter a registered email address";
  label.style.color = "red ";
}
