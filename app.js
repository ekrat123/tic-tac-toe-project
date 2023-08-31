const board = ["", "", "", "", "", "", "", "", ""];

const gameBoard = document.querySelector("#game-board");
const ResetBn = document.querySelector("#restart-button");
const body = document.querySelector("body");

function displayBoard() {
  gameBoard.innerHTML = "";
  board.forEach((val, i) => {
    const cellEl = document.createElement("div");
    cellEl.classList.add("cell");
    cellEl.dataset.id = i;
    cellEl.textContent = val;
    gameBoard.appendChild(cellEl);
  });
}

displayBoard();

const playerX = "X";
const playerO = "O";
let changePlayer = true;

function checkWinner() {
  for (let i = 0; i < 7; i += 3) {
    if (
      board[i] === board[i + 1] &&
      board[i + 1] === board[i + 2] &&
      board[i]
    ) {
      let scoreEl = document.createElement("h2");
      scoreEl.textContent = `Player ${board[i]} win`;
      body.appendChild(scoreEl);
    }
  }
  for (let i = 0; i < 5; i += 4) {
    if (
      board[i] === board[i + 4] &&
      board[i + 4] === board[i + 8] &&
      board[i]
    ) {
      let scoreEl = document.createElement("h2");
      scoreEl.textContent = `Player ${board[i]} win`;
      body.appendChild(scoreEl);
    }
  }
  for (let i = 0; i < 3; i += 1) {
    if (
      board[i] === board[i + 3] &&
      board[i + 3] === board[i + 6] &&
      board[i]
    ) {
      let scoreEl = document.createElement("h2");
      scoreEl.textContent = `Player ${board[i]} win`;
      body.appendChild(scoreEl);
    }
  }
}
function addMark(e) {
  if (e.target.textContent) {
    return;
  }
  let targetID = e.target.getAttribute("data-id");

  if (changePlayer) {
    board[targetID] = "X";
    displayBoard();
    changePlayer = false;
  } else if (!changePlayer) {
    board[targetID] = "O";
    displayBoard();
    changePlayer = true;
  }
  console.log(board);
  checkWinner();
}

function resetGame() {
  board.forEach((_, i, arr) => {
    arr[i] = "";
  });

  displayBoard();
  changePlayer = true;
  document.querySelector("h2").remove();
}

gameBoard.addEventListener("click", addMark);

ResetBn.addEventListener("click", resetGame);
