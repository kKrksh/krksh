const sidebar = document.getElementById("sidebar");
const chatwindow = document.getElementById("chatWindow");

sidebar.style.gridTemplateRows = `60px ${window.innerHeight - 135}px 60px`;
chatwindow.style.gridTemplateRows = `60px ${window.innerHeight - 135}px 60px`;

window.addEventListener("resize", () => {
  chatwindow.style.gridTemplateRows = `60px ${window.innerHeight - 135}px 60px`;
  sidebar.style.gridTemplateRows = `60px ${window.innerHeight - 134}px 60px`;
});

window.addEventListener("resize", () => {
  if (window.innerWidth < 151) {
    console.log(window.innerWidth);
    console.log("small");
    sidebar.width = sidebar.width / 2;
    chatwindow.width = chatwindow.width / 2;
  }
});
