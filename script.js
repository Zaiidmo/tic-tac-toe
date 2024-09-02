document.addEventListener('contextmenu', event => {
  event.preventDefault();
});

document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("game-board");
  const resetBtn = document.getElementById("reset-button");
  const currentPlayerSpan = document.getElementById("current-player");
  const scoreXElement = document.getElementById("scoreX");
  const scoreOElement = document.getElementById("scoreO");

  const boardSize = 20; // 20x20 grid
  const winLength = 5; // 5 in a row to win
  let currentPlayer = "X"; // X starts the game
  const maxScore = 3; // Maximum score to win the game

  // Initialize scores from localStorage or set defaults
  let scoreX = parseInt(localStorage.getItem("scoreX")) || 0;
  let scoreO = parseInt(localStorage.getItem("scoreO")) || 0;

  // Create a 2D array to represent the game state
  const gameState = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));

  // Generate cells on board and update UI
  createCells();
  updateCurrentPlayerDisplay();
  updateScores();

  // Create cells and add event listeners
  function createCells() {
    for (let i = 0; i < boardSize * boardSize; i++) {
      const cell = document.createElement("div");
      cell.className = "cell bg-gray-400 hover:bg-green-400 border border-gray-200 flex items-center justify-center cursor-pointer rounded";
      cell.dataset.index = i;
      cell.addEventListener("click", handleClick);
      board.appendChild(cell);
    }
  }

  // Handle cell click event
  function handleClick(event) {
    const cell = event.target;
    const index = parseInt(cell.dataset.index);
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;

    if (cell.textContent) return; // Do nothing if the cell is already filled

    updateCell(cell, row, col);

    if (checkWin(row, col)) {
      updateScore(currentPlayer);
      if (Math.abs(scoreX - scoreO) >= maxScore) {
        showWinAlert();
      } else {
        showRoundOverAlert();
      }
    } else if (isBoardFull()) {
      showDrawAlert();
    } else {
      // Switch player if no win
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateCurrentPlayerDisplay();
    }
  }

  // Update the cell and game state
  function updateCell(cell, row, col) {
    cell.textContent = currentPlayer;
    gameState[row][col] = currentPlayer;
    cell.classList.remove('cursor-pointer', 'hover:bg-green-400');
    cell.classList.add('bg-green-500', currentPlayer.toLowerCase());
  }

  // Update the score and localStorage
  function updateScore(winner) {
    if (winner === "X") {
      scoreX++;
    } else {
      scoreO++;
    }
    localStorage.setItem("scoreX", scoreX);
    localStorage.setItem("scoreO", scoreO);
    updateScores();
  }

  // Check for a win in all directions
  function checkWin(row, col) {
    return (
      checkLine(row, col, 0, 1) + checkLine(row, col, 0, -1) >= winLength - 1 || // Horizontal
      checkLine(row, col, 1, 0) + checkLine(row, col, -1, 0) >= winLength - 1 || // Vertical
      checkLine(row, col, 1, 1) + checkLine(row, col, -1, -1) >= winLength - 1 || // Diagonal /
      checkLine(row, col, 1, -1) + checkLine(row, col, -1, 1) >= winLength - 1   // Diagonal \
    );
  }

  // Count consecutive symbols in one direction
  function checkLine(row, col, rowStep, colStep) {
    let count = 0;
    let r = row + rowStep;
    let c = col + colStep;

    while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && gameState[r][c] === currentPlayer) {
      count++;
      r += rowStep;
      c += colStep;
    }
    return count;
  }

  // Check if the board is full
  function isBoardFull() {
    return gameState.flat().every(cell => cell !== null);
  }

  // Display the SweetAlert2 popup when a round is over
  function showRoundOverAlert() {
    Swal.fire({
      title: 'Round Over!',
      text: `Player ${currentPlayer} wins this round!`,
      icon: 'info',
      showCancelButton: true, 
      confirmButtonText: 'Next Round', 
      cancelButtonText: 'Play Again'
    }).then((result) => {
      if (result.isConfirmed) {
        resetBoard(); // Reset the board for the next round
      } else {
        resetGame(); // Reset the game entirely
      }
    });
  }

  // Display the SweetAlert2 popup when a player wins
  function showWinAlert() {
    Swal.fire({
      title: 'Game Over!',
      text: `Player ${currentPlayer} wins the game!`,
      icon: 'success',
      confirmButtonText: 'Play Again'
    }).then(() => {
      resetGame(); // Reset the game after the alert
    });
  }

  // Display the SweetAlert2 popup when the game is a draw
  function showDrawAlert() {
    Swal.fire({
      title: 'Draw!',
      text: "The game is a draw!",
      icon: 'warning',
      confirmButtonText: 'Play Again'
    }).then(() => {
      resetBoard(); // Reset the board for the next round
    });
  }

  // Update Current Player Display 
  function updateCurrentPlayerDisplay() {
    currentPlayerSpan.textContent = currentPlayer;
  }

  // Update scores on the scoreboard
  function updateScores() {
    scoreXElement.textContent = scoreX;
    scoreOElement.textContent = scoreO;
  }

  // Reset the game board for a new round
  function resetBoard() {
    gameState.forEach(row => row.fill(null)); // Clear the game state
    currentPlayer = "X"; // Reset to Player X
    board.innerHTML = ""; // Clear the board
    createCells(); // Regenerate the cells
    updateCurrentPlayerDisplay();
  }

  // Reset the entire game
  function resetGame() {
    scoreX = 0;
    scoreO = 0;
    localStorage.setItem("scoreX", scoreX);
    localStorage.setItem("scoreO", scoreO);
    updateScores();
    resetBoard();
  }

  // Attach event listener to reset button
  resetBtn.addEventListener('click', resetGame);
});
