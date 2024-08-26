//FIXME: Fix UI stutter (unimportant)

const sidebar = document.getElementById("sidebar");
const chatwindow = document.getElementById("chatWindow");
const messagePlaceholder = document.getElementById("messageInput");

sidebar.style.gridTemplateRows = `60px ${window.innerHeight - 135}px 60px`;
chatwindow.style.gridTemplateRows = `60px ${window.innerHeight - 135}px 60px`;

window.addEventListener("resize", () => {
  chatwindow.style.gridTemplateRows = `60px ${window.innerHeight - 135}px 60px`;
  sidebar.style.gridTemplateRows = `60px ${window.innerHeight - 134}px 60px`;

  if (window.innerWidth < 800) {
    chatwindow.style.width = "calc(100vw - 20px) ";
    sidebar.style.display = "none";
  } else {
    chatwindow.style.width = "calc(100vw - 420px) ";
    sidebar.style.display = "grid";
  }
});

if (window.innerWidth < 800) {
  chatwindow.style.width = "calc(100vw - 20px) ";
  sidebar.style.display = "none";
} else {
  chatwindow.style.width = "calc(100vw - 420px) ";
  sidebar.style.display = "grid";
}
