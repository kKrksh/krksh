let player = document.getElementById('player').textContent;
let message = document.getElementById('message').textContent;
let turn = "X";

function resetBoard() {
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
  });
  turn = "X";

}
function main(rowColumn){
  message.textCotent = `Player ${turn} to move`; 
  document.getElementById(rowColumn).textContent = turn;
  if(turn == "X"){
    turn = "O";
  }else{
    turn = "X";
  }
  checkWinner();
}
function checkWinner(){
  if ((document.getElementById('a1').textContent === document.getElementById('a2').textContent && document.getElementById('a2').textContent === document.getElementById('a3').textContent && document.getElementById('a1').textContent !== "") ||
      (document.getElementById('b1').textContent === document.getElementById('b2').textContent && document.getElementById('b2').textContent === document.getElementById('b3').textContent && document.getElementById('b1').textContent !== "") ||
      (document.getElementById('c1').textContent === document.getElementById('c2').textContent && document.getElementById('c2').textContent === document.getElementById('c3').textContent && document.getElementById('c1').textContent !== "") ||
      (document.getElementById('a1').textContent === document.getElementById('b1').textContent && document.getElementById('b1').textContent === document.getElementById('c1').textContent && document.getElementById('a1').textContent !== "") ||
      (document.getElementById('a2').textContent === document.getElementById('b2').textContent && document.getElementById('b2').textContent === document.getElementById('c2').textContent && document.getElementById('a2').textContent !== "") ||
      (document.getElementById('a3').textContent === document.getElementById('b3').textContent && document.getElementById('b3').textContent === document.getElementById('c3').textContent && document.getElementById('a3').textContent !== "") ||
      (document.getElementById('a1').textContent === document.getElementById('b2').textContent && document.getElementById('b2').textContent === document.getElementById('c3').textContent && document.getElementById('a1').textContent !== "") ||
      (document.getElementById('a3').textContent === document.getElementById('b2').textContent && document.getElementById('b2').textContent === document.getElementById('c1').textContent && document.getElementById('a3').textContent !== "")) {
    if (turn === "X"){
      alert("Player O Wins!");
    }
    else{
     alert("Player X Wins!");
    }
    resetBoard();
  }
}

