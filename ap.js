const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const updateCell = (index, player) => {
    if (board[index] === "") {
      board[index] = player;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board.fill("");
  };

  const checkWinner = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const isTie = () => {
    return board.every((el) => el !== "");
  };

  return { getBoard, updateCell, resetBoard, checkWinner, isTie };
})();

// Player Factory
const Player = (name, marker) => {
  return { name, marker };
};

// Game Module
const Game = (() => {
  const playerX = Player("Player X", "X");
  const playerO = Player("Player O", "O");
  let currentPlayer = playerX;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const makeMove = (index) => {
    if (Gameboard.updateCell(index, currentPlayer.marker)) {
      switchPlayer();
      displayBoard();
      const winner = Gameboard.checkWinner();
      if (winner) {
        showWinner(winner);
      } else if (Gameboard.isTie()) {
        showTie();
      }
    }
  };

  return { makeMove };
})();

function displayBoard() {
  const gameBoardCells = document.querySelectorAll(".cell");
  const board = Gameboard.getBoard();

  gameBoardCells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

function showWinner(winner) {
  const scoreEl = document.createElement("h2");
  scoreEl.textContent = `Player ${winner} wins`;
  document.body.appendChild(scoreEl);
  gameBoard.removeEventListener("click", addMark);
}

function showTie() {
  const scoreEl = document.createElement("h2");
  scoreEl.textContent = "Tie, no one wins";
  document.body.appendChild(scoreEl);
  gameBoard.removeEventListener("click", addMark);
}

function addMark(e) {
  const targetID = e.target.dataset.id;
  if (!Gameboard.getBoard()[targetID]) {
    Game.makeMove(targetID);
  }
}

function resetGame() {
  Gameboard.resetBoard();
  currentPlayer = Game.playerX;
  const scoreEl = document.querySelector("h2");
  if (scoreEl) {
    scoreEl.remove();
  }
  gameBoard.addEventListener("click", addMark);
  displayBoard();
}

const gameBoard = document.querySelector("#game-board");
const resetBtn = document.querySelector("#restart-button");

displayBoard();
gameBoard.addEventListener("click", addMark);
resetBtn.addEventListener("click", resetGame);
