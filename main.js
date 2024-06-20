let counter = 5

setInterval(function () {
  counter--
  document.getElementById("counter").innerHTML = counter

  if (counter === 0){
    window.location = "https://krksh.site/chat"
  }
}, 1000)
