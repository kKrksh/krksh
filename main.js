let current = 1;

let imageUrls = [
  '/media/image1white.jpeg',
  '/media/image2white.jpeg',
  '/media/image1black.jpeg',
  '/media/image2black.jpeg',
  '/media/image1blue.jpeg',
  '/media/image2blue.jpeg',
  '/media/image1red.jpeg',
  '/media/image2red.jpeg',
  '/media/All.jpeg'
];

// Function to preload images, may cause some preformance issues, !NOT WORKING FOR SOME REASON!.
function preloadImages(urls, callback) {
  let loaded = 0;
  let images = [];
  urls.forEach(function(url) {
      let img = new Image();
      img.onload = function() {
          loaded++;
          if (loaded == urls.length) {
              callback(images);
          }
      };
      img.src = url;
      images.push(img);
  });
}
preloadImages(imageUrls, function(images) {
  console.log('All images preloaded:', images);
});

const displayer = document.getElementById("display");
let color = "white"
function scrollForward() {
  document.getElementById(`c${current}`).style = "color:black;";
  if (current === 3) {
    current = 0;
  }
  current++;
  if (current === 3){
    displayer.src = `media/All.jpeg`;
  }
  else{
    displayer.src = `media/image${current}${color}.jpeg`;
  }
  document.getElementById(`c${current}`).style = "color:white;";
}
function scrollBackwards() {
  document.getElementById(`c${current}`).style = "color:black;";
  if (current === 1) {
    current = 4;
  }
  current--;
  if (current === 3){
    displayer.src = `media/All.jpeg`;
  }
  else{
    displayer.src = `media/image${current}${color}.jpeg`;
  }
  document.getElementById(`c${current}`).style = "color:white;";
}
function colorSelection(col) {
  color = col
  current = 1;
  displayer.src = `media/image${current}${color}.jpeg`;
  for (let i = 1; i < 4; i++) {
    document.getElementById(`c${i}`).style = "color:black;";
  }
  document.getElementById(`c${current}`).style = "color:white;";
  redirectColor();
}

//Stackoverflow code, essential for mobile usage:

let hasTouchScreen = false;

if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
} 
else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = navigator.msMaxTouchPoints > 0;
} 
else {
    var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
        hasTouchScreen = !!mQ.matches;
    } 
    else if ('orientation' in window) {
        hasTouchScreen = true; // deprecated, but good fallback
    } 
    else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouchScreen = (
            /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
            /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
        );
    }
}

if (hasTouchScreen){
  const displayElement = document.getElementById("display");
  const newWidth = 250;
  const originalWidth = displayElement.offsetWidth;
  const originalHeight = displayElement.offsetHeight;
  const newHeight = (originalHeight / originalWidth) * newWidth;

  displayElement.style.width = newWidth + "px";
  displayElement.style.height = newHeight + "px";
}


function redirectColor(){
  document.getElementById("buyBtn").href = `/buy/?color=${color}`;
}
redirectColor();
