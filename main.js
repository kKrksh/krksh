let current = 1;
const displayer = document.getElementById("display");
let color = "white"
function scrollForward() {
  document.getElementById(`c${current}`).style = "color:black;";
  if (current === 4) {
    current = 0;
  }
  current++;
  displayer.src = `media/image${current}${color}.jpg`;
  document.getElementById(`c${current}`).style = "color:white;";
}
function scrollBackwards() {
  document.getElementById(`c${current}`).style = "color:black;";
  if (current === 1) {
    current = 5;
  }
  current--;
  displayer.src = `media/image${current}${color}.jpg`;
  document.getElementById(`c${current}`).style = "color:white;";
}
function colorSelection(col) {
  color = col
  current = 1;
  displayer.src = `media/image${current}${color}.jpg`;
}

let hasTouchScreen = false;

if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
} else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = navigator.msMaxTouchPoints > 0;
} else {
    var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
        hasTouchScreen = !!mQ.matches;
    } else if ('orientation' in window) {
        hasTouchScreen = true; // deprecated, but good fallback
    } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouchScreen = (
            /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
            /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
        );
    }
}

if (hasTouchScreen) {
    document.getElementById("display").style.height = "400px";
}


