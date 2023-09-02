// Module for gameboard
const GameBoard = (function () {
  const board = Array(9).fill(""); // Create an array to represent the game board
  const getBoard = () => board; // Function to get the current game board

  const checkWinner = function () {
    const winnerCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winnerCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a]; // If a player wins, return their marker
      }
    }

    if (board.every((el) => el !== "")) {
      return "tie"; // If there's a tie, return "tie"
    }

    return null; // If the game is still ongoing, return null
  };

  const makeMove = (index, currentPlayer) => {
    if (board[index]) {
      return; // If the cell is already occupied, do nothing
    }
    board[index] = currentPlayer; // Set the cell to the current player's marker
  };

  const reset = () => {
    board.fill(""); // Reset the game board by clearing all cells
  };

  return { getBoard, checkWinner, makeMove, reset };
})();

const Player = function (name, marker) {
  return { name, marker }; // Create a player object with a name and marker
};

const DisplayController = (function () {
  const gameBoard = document.querySelector("#game-board");
  const resetBtn = document.querySelector("#restart-button");
  const scoreEl = document.createElement("h2");

  const player1 = Player("Player-X", "X"); // Create player 1
  const player2 = Player("Player-O", "O"); // Create player 2

  let currentPlayer = player1; // Initialize the current player as player 1
  let gameIsOver = false; // Initialize the game state as not over

  const createCell = function (val, i) {
    const cellEl = document.createElement("div");
    cellEl.classList.add("cell");
    cellEl.dataset.id = i;
    cellEl.textContent = val;
    return cellEl;
  };

  const displayBoard = () => {
    gameBoard.innerHTML = "";
    board = GameBoard.getBoard();
    board.forEach((val, i) => {
      gameBoard.appendChild(createCell(val, i));
    });
  };
  displayBoard();

  const declareWinner = (win) => {
    scoreEl.textContent =
      win === "tie" ? "It is a tie" : `Game Over! ${currentPlayer.name} wins`;
    gameIsOver = true;
    document.body.appendChild(scoreEl);
  };

  const declareTurn = () => {
    changePlayer();
    scoreEl.textContent = `${currentPlayer.name}'s turn`;
    document.body.appendChild(scoreEl);
  };

  const changePlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const clickHandler = (e) => {
    if (gameIsOver) {
      return;
    }
    const targetID = e.target.dataset.id;
    GameBoard.makeMove(targetID, currentPlayer.marker);
    displayBoard();

    winner = GameBoard.checkWinner();
    winner ? declareWinner(winner) : declareTurn();
  };

  const resetGame = () => {
    GameBoard.reset();
    displayBoard();
    currentPlayer = player1;
    scoreEl ? document.querySelector("h2").remove() : null;
    gameIsOver = false;
  };

  gameBoard.addEventListener("click", clickHandler);
  resetBtn.addEventListener("click", resetGame);
})();
