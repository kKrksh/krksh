const socket = io("https://krkchat.glitch.me");
let currentPfp;
let unsavedOptions = {
  displayName: "",
  src: "",
  status: "",
};
let localUID;
let localAccount;
let attach = document.getElementById("pfpfile");

setInterval(() => {
  document.getElementById("saveBtn").addEventListener("click", saveOptions);
});

socket.on("connect", () => {
  console.log("connected with id " + socket.id);
});

socket.emit("getUserInfo", localStorage.getItem("accessCode"));

socket.on("receiveUserInfo", (account) => {
  localAccount = account;
  processAccount(account);
});

function processAccount(account) {
  let { userId, email, pfp, displayName, status } = account;
  const userName = localStorage.getItem("userName");
  status = status === undefined ? "" : status;
  localUID = userId;

  document.getElementById("pfp").src = pfp;
  document.getElementById("userName").innerHTML = userName;
  document.getElementById("UID").innerHTML =
    userId + ' <span id="copyIcon"><i class="fa-solid fa-copy"></i></span';
  document.getElementById("displayName").value = displayName;
  document.getElementById("status").value = status;
}

attach.addEventListener("input", function (event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.onload = function (e) {
      let imgSource = e.target.result;
      unsavedOptions.src = imgSource;
      previewPfp(imgSource);
    };

    reader.readAsDataURL(file);
  } else {
    alert("Please choose an image file");
  }
});

function previewPfp(imgSource) {
  const pfpPreview = document.getElementById("pfp");
  currentPfp = pfpPreview.src;
  pfpPreview.src = imgSource;
}

document
  .getElementById("displayName")
  .addEventListener(
    "input",
    () =>
      (unsavedOptions.displayName =
        document.getElementById("displayName").value)
  );
document
  .getElementById("status")
  .addEventListener(
    "input",
    () => (unsavedOptions.status = document.getElementById("status").value)
  );

function saveOptions() {
  const accessCode = localStorage.getItem("accessCode");
  socket.emit("editUserOptions", accessCode, unsavedOptions);
}

const confirm = document.getElementById("confirmBtn");

confirm.addEventListener("click", () => {
  const current = document.getElementById("previous").value;
  const newPass = document.getElementById("new").value;
  socket.emit(
    "changePass",
    current,
    newPass,
    localStorage.getItem("accessCode")
  );
});

socket.on("passChanged", () => logout);
socket.on("incorrectCredentials", () => {
  document.getElementById("error").style.opacity = "100";
});

document
  .getElementById("passBtn")
  .addEventListener(
    "click",
    () => (document.getElementById("rpw").style.display = "flex")
  );

document
  .getElementById("escape")
  .addEventListener(
    "click",
    () => (document.getElementById("rpw").style.display = "none")
  );

function logout() {
  localStorage.clear();
  window.location.href = "../sign-in";
}

document.getElementById("footer").addEventListener("click", logout);
document.getElementById("UID").addEventListener("click", () => {
  let popupMessage = document.getElementById("popupMessage");
  popupMessage.className = "visible";
  setInterval(() => (popupMessage.className = "hidden"), 2000);
  navigator.clipboard.writeText(localUID);
});
