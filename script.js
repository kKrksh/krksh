document.addEventListener("DOMContentLoaded", function() {
  let count = 0;
  const maxCount = 6;
  const contentElement = document.getElementById("useless");
  
  const paragraphs = [
    "Go away.",
    "For fuck sake leave",
    "why ,why ,why ,why ",
    "fuck off",
    "this is the last warning"
  ];
  
  function changeContent() {
    if (count > 4){
      window.close()
    }
    if (count >= maxCount) {
        clearInterval(intervalId);
    }
    contentElement.textContent = paragraphs[count];
    count++;
}
  
  const intervalId = setInterval(changeContent, 10000); 
  changeContent();
});

