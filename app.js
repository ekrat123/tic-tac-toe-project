const board = ["", "", "", "", "", "", "", "", ""];
const gameBoard = document.querySelector("#game-board");
const resetBtn = document.querySelector("#restart-button");
const body = document.querySelector("body");
let currentPlayer = "X";

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

function checkWinner() {
  const winningCombos = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      const scoreEl = document.createElement("h2");
      scoreEl.textContent = `Player ${board[a]} wins`;
      body.appendChild(scoreEl);
      gameBoard.removeEventListener("click", addMark);
      return board[a];
    }
  }
}

function isTie() {
  if (board.every((el) => el !== "")) {
    const scoreEl = document.createElement("h2");
    scoreEl.textContent = `Tie, noone win`;
    body.appendChild(scoreEl);
    gameBoard.removeEventListener("click", addMark);
  }
}

function addMark(e) {
  const targetID = e.target.dataset.id;

  if (!board[targetID]) {
    board[targetID] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    displayBoard();
    !checkWinner() ? isTie() : null;
  }
}

function resetGame() {
  board.fill("");
  displayBoard();
  currentPlayer = "X";
  const scoreEl = document.querySelector("h2");
  if (scoreEl) {
    scoreEl.remove();
  }
  gameBoard.addEventListener("click", addMark);
}

displayBoard();
gameBoard.addEventListener("click", addMark);
resetBtn.addEventListener("click", resetGame);
