const socket = io("https://krkchat.glitch.me");
const error = document.getElementById("error");

socket.on("connect", () => {
  console.log("connected with id " + socket.id);
});

function signUp() {
  error.style.opacity = 0;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;
  const confirmPassword = document.getElementById("cpass").value;
  if (password !== confirmPassword) {
    error.innerHTML = "Passwords must match";
    error.style.opacity = "100";
    return;
  } else if (
    username === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    error.innerHTML = "Fields can't be empty";
    error.style.opacity = "100";
    return;
  } else {
    socket.emit("addNewUser", username, email, password);
  }
}

document.getElementById("sign").addEventListener("click", signUp);

socket.on("invalidEmail", () => {
  error.innerHTML = "Invalid Email";
  error.style.opacity = "100";
});

socket.on("userExists", () => {
  error.innerHTML = "Username or Email already in use";
  error.style.opacity = "100";
});

socket.on("success", (accessCode) => {
  localStorage.setItem("access_code", accessCode);
  location.href = "./client/";
});
