import { io } from '../node_modules/socket.io-client/dist/socket.io.esm.min.js';

//Set up connection to server
const socket = io("http://localhost:3000");
socket.on('connect', () => {
  send(`you connected with id ${socket.id}`,false,false);
})

//idk what to label this part as

const roomInput = document.getElementById("roomId");
const joinInput = document.getElementById("join");
let room = "";

//Send function, responsible for sending messages, duh

function send(message = document.getElementById('message').value, publicMessage = true, self = true){
  let newMessage = document.createElement("p");
  newMessage.className = "message";
  if (self){
    newMessage.innerHTML = "You: " + message;
  } else {
    newMessage.innerHTML = message;
  }
  document.getElementById("display").appendChild(newMessage);
  if (publicMessage){
    socket.emit('send', message, room);
  }
}
window.send = send;

//join function, responsible for connecting with a certain client

joinInput.addEventListener('click', () => {
  let joinId = document.getElementById("roomId").value;
  let newJoin = document.createElement("p");
  newJoin.className = "joinMessage";
  newJoin.innerHTML = "You joined room: " + joinId;
  document.getElementById("display").appendChild(newJoin);
  room = roomInput.value;
  socket.emit('join', room)
})

window.join = join;

//Message reviever

socket.on('recieve', (message,self) => {
  send(message, false, self);
})
