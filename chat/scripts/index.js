const socket = io("https://krkchat.glitch.me");
let reload = false;
let accessCode;

const userName = new URLSearchParams(window.location.search).get("username");

if (userName !== null) {
  localStorage.setItem("userName", userName);
}

if (localStorage.getItem("accessCode") !== null) {
  accessCode = localStorage.getItem("accessCode");
} else {
  location.href = "https://krksh.site/chat/sign-in";
}

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
  }
}, 1000);

/*function messageServer(content, time) {
  socket.emit("message", content, time);
}

socket.on("recieve", (content, time) => {
  message(false, time, content);
});

socket.on("recieveImage", (source, MessageTime) => {
  time = MessageTime;
  imgSource = source;
  sendImage(true);
});*/

socket.on("retutrnData", (data) => {
  localStorage.setItem("account", data);
  changeProfileHref();
});

function tempInitializeSession(users) {
  socket.emit("TIS", users);
}

socket.emit("getSessions", accessCode);

socket.on("receiveSessions", (sessions) => {
  sessions.forEach((session) => loadSession(session));
});

function requestMessages(id) {
  awaiting = id;
  socket.emit("requestMessages", id);
}

socket.on("receiveMessages", (messages) => {
  for (let message in messages) {
    loadMessage(messages[message]);
  }
});

function sendMessage(message) {
  messagePlaceholder.value = "";
  socket.emit("sendMessage", message, accessCode, openSession);
}

socket.on("requestMessages", (id) => {
  messageWindow.innerHTML = "";
  requestMessages(id);
});
