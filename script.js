document.addEventListener("DOMContentLoaded", function() {
  let count = 0;
  const maxCount = 6;
  const useless = document.getElementById("useless");
  
  const paragraphs = [
    "Go away.",
    "For fuck sake leave",
    "why ,why ,why ,why ",
    "fuck off",
    "this is the last warning"
  ];
  
  function changeContent() {
    if (count > 4){
      document.getElementById("notarickroll").src = "just_a_normal_video.mp4"
      document.getElementById("notarickroll").style.display = "block";
    }
    if (count >= maxCount) {
        clearInterval(intervalId);
    }
    useless.textContent = paragraphs[count];
    count++;
}
  
  const intervalId = setInterval(changeContent, 10000); 
  changeContent();
});





