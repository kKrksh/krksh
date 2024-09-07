const chatList = document.getElementById("chatList");
const attached = document.getElementById("attached");
let loaded = [];

setInterval(() => {
  let timeDate = new Date();
  time = `${timeDate.getUTCHours() + 1}:${timeDate.getMinutes()} CET`;
}, 1000);

let oldHTML = "";

messagePlaceholder.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && messagePlaceholder.value.trim() !== "") {
    sendMessage(messagePlaceholder.value);
  }
});

attached.addEventListener("input", function (event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.onload = function (e) {
      imgSource = e.target.result;
      oldHTML = messageWindow.innerHTML;
      showpreview();
    };

    reader.readAsDataURL(file);
  } else {
    alert(
      "Currently only images are supported, please share other files through cloud like Google Drive or OneDrive"
    );
  }
});

function showpreview() {
  document.getElementById("sendWrapper").innerHTML =
    '<i class="fa-solid fa-paper-plane" id = "send"></i>';
  document.getElementById("sendWrapper").addEventListener("click", sendImage);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sendImage();
    }
  });

  messageWindow.innerHTML = `
    <div class="center messagePreview">
      <div>
        <div class="imageMessage">
          <img
            src="${imgSource}"
            alt="IMAGE NOT LOADED, CHECK INTERNET CONNECTION"
            class="innerImage"
          />
        </div>
      </div>
    </div>
  `;
}

messagePlaceholder.addEventListener("input", () => {
  let message = messagePlaceholder.value;
  if (message.trim() !== "") {
    document.getElementById("sendWrapper").innerHTML =
      '<i class="fa-solid fa-paper-plane" id = "send"></i>';
    document.getElementById("send").addEventListener("click", () => {
      sendMessage(message);
    });
  } else {
    document.getElementById("sendWrapper").innerHTML =
      '<i class="fa-solid fa-microphone"></i>';
  }
});

function sendImage(ignore = false) {
  if (!ignore) {
    socket.emit("image", imgSource, time);
  } else {
    oldHTML = messageWindow.innerHTML;
  }
  messageWindow.innerHTML = oldHTML;

  messageWindow.insertAdjacentHTML(
    "beforeend",
    `
    <div class="selfMessageAlign">
      <div class="messageSelf">
        <div class="imageMessage">
          <img
            src="${imgSource}"
            alt="IMAGE NOT LOADED, CHECK INTERNET CONNECTION"
            class="innerImage"
          />
          <span class="tiny messageInfo">
            <p class="noMargin timeStamp">${time}</p>
            <p class="noMargin readRecipt">read</p>
          </span>
        </div>
      </div>
    </div>
  `
  );
}

function changeProfileHref() {
  document.getElementById("profileHref").href = "./account/";
}

function processMessages(messages) {
  for (let message in messages) {
    if (!loaded.includes(message)) {
      loadMessage(messages[message]);
      loaded.push(message);
    }
  }
}

const optBtn = document.getElementById("optionsMain");
const options = document.getElementById("optDropdown");

optBtn.addEventListener("click", openOptions);

function openOptions() {
  options.className = "dropDown openDropdown";
  optBtn.removeEventListener("click", openOptions);
  optBtn.addEventListener("click", closeOptions);
}

function closeOptions() {
  options.className = "dropDown closeDropdown";
  optBtn.addEventListener("click", openOptions);
  optBtn.removeEventListener("click", closeOptions);
}

function logout() {
  localStorage.clear();
  window.location.href = "./sign-in";
}

document.getElementById("redirectLogout").addEventListener("click", logout);

document
  .getElementById("redirectNGC")
  .addEventListener("click", () => (location.href = "./create-group"));
