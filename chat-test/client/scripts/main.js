/*const socket = io("http://localhost:3000");
socket.on("connect", () => {
  console.log("Connected to server with id") + socket.id;
});*/

const chatList = document.getElementById("chatList");

for (let i = 0; i < 15; i++) {
  chatList.innerHTML += `
  <div class="group">
            <div style="height: 100%; width: 60px; display: inline">
              <div class="userImage center">
                <img
                  src="https://placeholder.co/50"
                  alt="userImage"
                  class="userImageInner"
                />
              </div>
            </div>
            <div class="secondary">
              <div style="height: 50%; width: 100%">
                <div class="centerV groupText">Group Name / User</div>
              </div>
              <div style="height: 50%; width: 100%">
                <div class="centerV groupText">New Message</div>
              </div>
            </div>
          </div>
  `;
}
