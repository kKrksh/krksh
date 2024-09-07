const socket = io("https://krkchat.glitch.me");
let reload = false;
let accessCode;

const userName = new URLSearchParams(window.location.search).get("username");

let connected = false;

socket.on("connect", () => {
  console.log("Connected to server with id: " + socket.id);
  connected = true;
  if (reload) {
    location.reload();
  }
});

setTimeout(() => {
  if (!connected) {
    document.body.innerHTML =
      "Failed to connect to server. <br> Retrying to connect............";
    document.body.style = "font-family: sans-serif; font-size: 20px";
    document.body.className = "center";
    reload = true;
  } else {
    if (userName !== null) {
      localStorage.setItem("userName", userName);
    }

    if (localStorage.getItem("accessCode") !== null) {
      accessCode = localStorage.getItem("accessCode");
    } else {
      location.href = "./sign-in";
    }

    socket.emit("getSessions", accessCode);
    socket.emit("getUserInfo", accessCode);
  }
}, 1000);

function tempInitializeSession(users) {
  socket.emit("TIS", users);
}

socket.on("receiveSessions", (sessions) => {
  sessions.forEach((session) => loadSession(session));
});

function requestMessages(id) {
  console.time("requestMessages");
  awaiting = id;
  socket.emit("requestMessages", id);
}

socket.on("receiveMessages", (messages) => {
  processMessages(messages);
});

function sendMessage(message) {
  messagePlaceholder.value = "";
  socket.emit("sendMessage", message, accessCode, openSession);
}

socket.on("requestMessages", (id) => {
  requestMessages(id);
});

socket.on("receiveUserInfo", (account) => {
  document.getElementById("profile").src = account.pfp;
});

function getUserPfp(username) {
  return new Promise((resolve) => {
    socket.emit("getUserPfp", username);
    socket.on("receiveUserPfp", (pfp) => {
      resolve(pfp);
    });
  });
}
