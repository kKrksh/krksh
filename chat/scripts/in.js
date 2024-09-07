const socket = io("https://krkchat.glitch.me");
const error = document.getElementById("error");
const signinButton = document.getElementById("sign");
const password = document.getElementById("password");
const username = document.getElementById("username");

signinButton.addEventListener("click", signin);

let userName;

function signin() {
  error.style.opacity = "0";
  const user = username.value;
  const pass = password.value;

  if (user === "" || pass === "") {
    error.innerHTML = "Fields can't be empty";
    error.style.opacity = "100";
  } else {
    userName = user;
    socket.emit("signin", user, pass);
  }
}

socket.on("userDoesntExist", () => {
  error.innerHTML = "User doesn't exist";
  error.style.opacity = "100";
});

socket.on("incorrectPassword", () => {
  error.innerHTML = "Incorrect password";
  error.style.opacity = "100";
});

socket.on("signedIn", (code) => {
  error.innerHTML = "Signed in";
  error.style.opacity = "100";

  localStorage.setItem("accessCode", code);
  window.location.href = `../?username=${userName}`;
});

username.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    password.focus();
  }
});

password.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    signin();
  }
});
