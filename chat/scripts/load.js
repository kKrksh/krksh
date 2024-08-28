const messageWindow = document.getElementById("messageWindow");
let openSession;
let outerClassName = "";
let innerClassName = "";
let firstSelf = true;
let firstNSelf = true;
let messageId = 1;

let loadedSessionIds = [];

function loadSession(session) {
  let imgSrc =
    session.imgSrc !== "" ? session.imgSrc : "https://placeholder.co/50";

  chatList.innerHTML += `
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
                <div class="centerV groupText"> ${session.name} </div>
              </div>
              <div style="height: 50%; width: 100%">
                <div class="centerV groupText">New Message</div>
              </div>
            </div>
          </div>
  `;
  loadedSessionIds.push(session.id);

  loadedSessionIds.forEach((id) => {
    let sessionElement = document.getElementById(id);
    console.log(id);

    sessionElement.addEventListener("click", () => {
      loaded = [];
      firstSelf = true;
      firstNSelf = true;
      messageWindow.innerHTML = "";
      requestMessages(id);
      openSession = id;
    });
  });
}

function loadMessage(message) {
  let { content, from, status, time, type } = message;

  let self = from === localStorage.getItem("userName") ? true : false;

  if (type === "policy message") {
    messageWindow.innerHTML += `
    <div class="center">
      <div class="firstM">The following chat is private and secured.</div>
    </div>
    `;
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

      messageWindow.innerHTML += `
      <div class="bodyPFP">
      <img
      src="https://placehold.co/30"
      alt=""
      class="userImageInnerTiny"
      />
      <p class="bodyUser">Username</p>
      </div>
      `;
    }
    firstNSelf = false;
  }

  messageWindow.innerHTML += `
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
  `;
  setTimeout(() => {
    messageWindow.scrollTop = messageWindow.scrollHeight;
  }, 50);
}
