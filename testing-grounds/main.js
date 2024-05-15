/*let turn = false;
function main(){
  const elements = document.getElementsByClassName("button");
  if (turn === false){
    for (let i = 0; i < elements.length; i++){
      elements[i].style.color = "red";
    }
    turn = true;
  }
  else{
    for (let i = 0; i < elements.length; i++){
      elements[i].style.color = "black";
    }
    turn = false;
  }
}
document.getElementById("test").onkeydown = function(event){
  if (event.key === "Enter"){
    console.log("yes")
  }
  else{
    console.log("no")
  }
}
let testArray = ["hello", ["hello", "banana"], 154, 19]
console.log(testArray.splice(0 , 1))*/

//to do project:
let number = 1;
const container = document.getElementById('todos') 
function add(){
  let todo = document.getElementById("input").value;
  let date = String(document.getElementById("date").value);
  newTodo(date, todo, number)
  number++;
}
function newTodo(date, todo, number){
  let createTodo = document.createElement("div");
  createTodo.id = `todo${number}`;
  createTodo.className = "js-todo";
  let createTodoParagraph = document.createElement("p");
  createTodoParagraph.innerText = todo;
  let createDate = document.createElement("div");
  createDate.id = `date${number}`;
  createDate.className = "js-date center";
  let createDateParagraph = document.createElement("p");
  createDateParagraph.innerText = date;
  let createDelete = document.createElement("div");
  createDelete.className = "center js-delete-div"
  createDelete.id = `delete${number}`
  let createDeleteButton = document.createElement("button");
  createDeleteButton.innerText = "Delete";
  createDeleteButton.className = "js-delete";
  createDeleteButton.id = `js-delete${number}`
  container.appendChild(createTodo);
  createTodo.appendChild(createTodoParagraph);
  container.appendChild(createDate);
  createDate.appendChild(createDateParagraph);
  container.appendChild(createDelete);
  createDelete.innerHTML = `<button id="delete${number}" onclick="deleteFunc(${number})" class="js-delete">Delete</button>` ;
}
function deleteFunc(number){
  container.removeChild(document.getElementById(`todo${number}`));
  container.removeChild(document.getElementById(`date${number}`));
  container.removeChild(document.getElementById(`delete${number}`));
  number--;
}
