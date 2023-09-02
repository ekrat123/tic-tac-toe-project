// Module for gameboard
const GameBoard = (function () {
  const board = Array(9).fill(""); // Create an array to represent the game board
  const getBoard = () => board; // Function to get the current game board

  const checkWinner = function () {
    const winnerCombos = [
      // Define winning combinations
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

  const player1 = Player("PlayerX", "X"); // Create player 1
  const player2 = Player("PlayerO", "O"); // Create player 2

  let currentPlayer = player1; // Initialize the current player as player 1
  let gameIsOver = false; // Initialize the game state as not over

  const createCell = function (val, i) {
    const cellEL = document.createElement("div"); // Create a cell element
    cellEL.classList.add("cell"); // Add a CSS class to the cell
    cellEL.dataset.id = i; // Set the data attribute to the cell's index
    cellEL.textContent = val; // Set the cell's content to the marker
    return cellEL;
  };

  const displayBoard = () => {
    gameBoard.innerHTML = ""; // Clear the game board
    board = GameBoard.getBoard(); // Get the current game board
    board.forEach((val, i) => {
      gameBoard.appendChild(createCell(val, i)); // Create and add cells to the game board
    });
  };
  displayBoard(); // Initial display of the game board

  const declareWinner = (win) => {
    const scoreEl = document.createElement("h2"); // Create an h2 element for displaying the result
    scoreEl.textContent =
      win === "tie" ? "It is a tie" : `Player ${currentPlayer.marker} win`; // Display the appropriate message
    gameIsOver = true; // Set the game state to over

    document.body.appendChild(scoreEl); // Add the result message to the page
  };

  const clickHandler = (e) => {
    if (gameIsOver) {
      return; // If the game is over, ignore clicks
    }
    const targetID = e.target.dataset.id; // Get the clicked cell's index
    GameBoard.makeMove(targetID, currentPlayer.marker); // Make a move in the game board
    displayBoard(); // Update the game board display

    winner = GameBoard.checkWinner(); // Check if there's a winner
    winner ? declareWinner(winner) : null; // Declare the winner or continue the game
    currentPlayer = currentPlayer === player1 ? player2 : player1; // Switch to the other player
  };

  const resetGame = () => {
    GameBoard.reset(); // Reset the game board
    displayBoard(); // Update the game board display
    currentPlayer = player1; // Reset the current player to player 1
    document.querySelector("h2") ? document.querySelector("h2").remove() : null; // Remove the result message if it exists
    gameIsOver = false; // Set the game state to not over
  };

  gameBoard.addEventListener("click", clickHandler); // Add a click event listener to the game board
  resetBtn.addEventListener("click", resetGame); // Add a click event listener to the reset button
})();
