const socket = io("https://krkchat.glitch.me");

let groupData = {
  name: "",
  users: [],
  picture: "",
  discription: "",
};

window.addEventListener("resize", () => resizeBody());
function resizeBody() {
  document.body.style.setProperty(
    "height",
    `${window.innerHeight - 20}px`,
    "important"
  );
  document.body.style.setProperty(
    "width",
    `${window.innerWidth - 20}px`,
    "important"
  );
}
resizeBody();

let addedUID = [];

document.getElementById("addBtn").addEventListener("click", () => {
  const UID = document.getElementById("UID").value;
  if (addedUID.includes(UID)) return;
  exists(UID).then((result) => {
    if (!result) {
      const error = document.getElementById("errorMessage");
      error.style.opacity = "100";
      setTimeout(() => {
        {
          error.style.opacity = "0";
        }
      }, 2000);
      return;
    }
    document
      .getElementById("userList")
      .insertAdjacentHTML("beforeend", `<p class="UID" id="${UID}">${UID}</p>`);
    document.getElementById(UID).addEventListener("click", () => {
      document
        .getElementById("userList")
        .removeChild(document.getElementById(UID));
      addedUID.splice(addedUID.indexOf(UID));
    });
    addedUID.push(UID);
  });
});

function exists(UID) {
  return new Promise((resolve) => {
    socket.emit("IDExists", UID);
    socket.on("IDExistsServer", (result) => {
      resolve(result);
    });
  });
}

const attach = document.getElementById("pfpfile");

attach.addEventListener("input", function (event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.onload = function (e) {
      let imgSource = e.target.result;
      groupData.picture = imgSource;
      document.getElementById("pfp").src = imgSource;
    };

    reader.readAsDataURL(file);
  } else {
    alert("Please choose an image file");
  }
});

socket.emit("getUserId", localStorage.getItem("accessCode"));
socket.on("receiveUserId", (id) => {
  addedUID.push(id);
});

document.getElementById("createGroup").addEventListener("click", () => {
  groupData.name = document.getElementById("groupName").value;
  groupData.discription = document.getElementById("groupDisc").value;
  groupData.users = addedUID;
  socket.emit("createGroup", groupData);
  location.href = "../";
});
