// Module for Gameboard
const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

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

    if (board.every((el) => el !== "")) {
      return "Tie";
    }

    return null;
  };

  const makeMove = (index, currentPlayer) => {
    if (!board[index]) {
      board[index] = currentPlayer;
      return true; // Move is valid
    }
    return false; // Move is invalid
  };

  const reset = () => {
    board.fill("");
  };

  return { getBoard, checkWinner, makeMove, reset };
})();

// Module for Players
const Player = (name, marker) => {
  return { name, marker };
};

// Module for Display
const DisplayController = (() => {
  const gameBoard = document.querySelector("#game-board");
  const resetBtn = document.querySelector("#restart-button");
  const body = document.querySelector("body");

  let currentPlayer;
  let gameOver = false;

  const updateDisplay = () => {
    const board = Gameboard.getBoard();
    gameBoard.innerHTML = "";
    board.forEach((val, i) => {
      const cellEl = document.createElement("div");
      cellEl.classList.add("cell");
      cellEl.dataset.id = i;
      cellEl.textContent = val;
      gameBoard.appendChild(cellEl);
    });
  };

  const declareWinner = (winner) => {
    const scoreEl = document.createElement("h2");
    if (winner === "Tie") {
      scoreEl.textContent = `It's a Tie!`;
    } else {
      scoreEl.textContent = `Player ${winner.name} wins!`;
    }
    body.appendChild(scoreEl);
    gameBoard.removeEventListener("click", handleClick);
    gameOver = true;
  };

  const handleClick = (e) => {
    if (gameOver) return;
    const targetID = e.target.dataset.id;
    if (Gameboard.makeMove(targetID, currentPlayer.marker)) {
      updateDisplay();
      const winner = Gameboard.checkWinner();
      if (winner) {
        declareWinner(winner === "Tie" ? winner : currentPlayer);
      } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
      }
    }
  };

  const resetGame = () => {
    Gameboard.reset();
    updateDisplay();
    gameBoard.addEventListener("click", handleClick);
    currentPlayer = player1;
    body.querySelector("h2").remove();
    gameOver = false;
  };

  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");

  resetBtn.addEventListener("click", resetGame);
  updateDisplay();
  gameBoard.addEventListener("click", handleClick);
  currentPlayer = player1;
})();
