const messageWindow = document.getElementById("messageWindow");
let openSession;
let outerClassName = "";
let innerClassName = "";
let firstSelf = true;
let firstNSelf = true;
let messageId = 1;

let loadedSessionIds = [];

async function loadSession(session) {
  let imgSrc;
  let name;
  if (session.type === "group") {
    name = session.name;
    imgSrc =
      session.imgSrc !== ""
        ? session.imgSrc
        : "./assets/images/deafult_user.png";
  } else if (session.type === "private") {
    for (let user in session.users) {
      if (user !== localStorage.getItem("userName")) {
        imgSrc = await getUserPfp(user);
        name = user;
      }
    }
  }
  let lastMessage =
    session.messages[session.messages.length - 1].content.length < 36
      ? session.messages[session.messages.length - 1].content
      : session.messages[session.messages.length - 1].content.slice(0, 35) +
        "...";

  chatList.insertAdjacentHTML(
    "beforeend",
    `
  <div class="group" data-id=${session.id} id="${session.id}">
            <div style="height: 100%; width: 60px; display: inline">
              <div class="userImage center">
                <img
                  src="${imgSrc}"
                  alt="userImage"
                  class="userImageInner"
                />
              </div>
            </div>
            <div class="secondary">
              <div style="height: 50%; width: 100%">
                <div class="centerV groupText"> ${name} </div>
              </div>
              <div style="height: 50%; width: 100%">
                <div class="centerV groupText">${lastMessage}</div>
              </div>
            </div>
          </div>
  `
  );
  loadedSessionIds.push(session.id);

  loadedSessionIds.forEach((id) => {
    let sessionElement = document.getElementById(id);

    sessionElement.addEventListener("click", () => {
      if (openSession === id) {
        return;
      }
      loaded = [];
      firstSelf = true;
      firstNSelf = true;
      messageWindow.innerHTML = "";
      requestMessages(id);
      loadSessionData(session);
      openSession = id;
    });
  });
}

async function loadSessionData(session) {
  if (session.type === "group") {
    document.getElementById("windowImg").src = session.imgSrc;
    document.getElementById("windowName").innerText = session.name;
  } else {
    for (let user in session.users) {
      if (user !== localStorage.getItem("userName")) {
        console.log(user);
        imgSrc = await getUserPfp(user);
        let name = user;
        document.getElementById("windowImg").src = imgSrc;
        document.getElementById("windowName").innerText = name;
        break;
      }
    }
  }
}
async function loadMessage(message) {
  let { content, from, status, time, type } = message;
  let self = from === localStorage.getItem("userName") ? true : false;
  let testSrc = await getUserPfp(from);

  if (type === "policy message") {
    messageWindow.insertAdjacentHTML(
      "beforeend",
      `
    <div class="center">
      <div class="firstM">The following chat is private and secured.</div>
    </div>
    `
    );
    return;
  }

  document.getElementById("sendWrapper").innerHTML =
    '<i class="fa-solid fa-microphone"></i>';
  document.getElementById("messageInput").value = "";
  document.getElementById("messageInput").focus();

  if (self) {
    outerClassName = "selfMessageAlign";
    innerClassName = "messageSelf";
    firstSelf === true ? (innerClassName += " messageFirstSelf") : "";
    firstSelf = false;
    firstNSelf = true;
  } else {
    outerClassName = "";
    innerClassName = "messageNSelf";
    firstSelf = true;

    if (firstNSelf) {
      innerClassName += " messageFirstNSelf";
      firstNSelf = false;
      messageWindow.insertAdjacentHTML(
        "beforeend",
        `
      <div class="bodyPFP">
      <img
      src="${testSrc}"
      alt=""
      class="userImageInnerTiny"
      />
      <p class="bodyUser">${from}</p>
      </div>
      `
      );
    }
  }

  messageWindow.insertAdjacentHTML(
    "beforeend",
    `
          <div id="${messageId}">
            <div class="${outerClassName}">
              <div class="${innerClassName}">
                ${content}
                <span class="tiny messageInfo">
                  <p class="noMargin timeStamp">${time}</p>
                  <p class="noMargin readRecipt">sent</p>
                </span>
              </div>
            </div>
          </div>
  `
  );
  setTimeout(() => {
    messageWindow.scrollTop = messageWindow.scrollHeight;
  }, 50);
}
