// Module for gameboard

const GameBoard = (function () {
  const board = Array(9).fill("");
  const getBoard = () => board;

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
        return board[a];
      }
    }

    if (board.every((el) => el !== "")) {
      return "tie";
    }

    return null;
  };

  const makeMove = (index, currentPlayer) => {
    if (board[index]) {
      return;
    }
    board[index] = currentPlayer;
  };

  const reset = () => {
    board.fill("");
  };

  return { getBoard, checkWinner, makeMove, reset };
})();

const Player = function (name, marker) {
  return { name, marker };
};

const DisplayController = (function () {
  const gameBoard = document.querySelector("#game-board");
  const resetBtn = document.querySelector("#restart-button");

  const player1 = Player("PlayerX", "X");
  const player2 = Player("PlayerO", "O");

  let currentPlayer = player1;
  let gameIsOver = false;

  const createCell = function (val, i) {
    const cellEL = document.createElement("div");
    cellEL.classList.add("cell");
    cellEL.dataset.id = i;
    cellEL.textContent = val;
    return cellEL;
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
    const scoreEl = document.createElement("h2");
    scoreEl.textContent =
      win === "tie" ? "It is a tie" : `Player ${currentPlayer.marker} win`;
    gameIsOver = true;

    document.body.appendChild(scoreEl);
  };

  const clickHandler = (e) => {
    if (gameIsOver) {
      return;
    }
    const targetID = e.target.dataset.id;
    GameBoard.makeMove(targetID, currentPlayer.marker);
    displayBoard();

    winner = GameBoard.checkWinner();
    winner ? declareWinner(winner) : null;
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const resetGame = () => {
    GameBoard.reset();
    displayBoard();
    currentPlayer = player1;
    document.querySelector("h2") ? document.querySelector("h2").remove() : null;
    gameIsOver = false;
  };

  gameBoard.addEventListener("click", clickHandler);
  resetBtn.addEventListener("click", resetGame);
})();
