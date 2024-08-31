document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("game-board");
  const boardSize = 20; // 20x20 grid
  const winLength = 5; // 5 in a row to win
  let currentPlayer = "X"; // X starts the game


  // Create a 2D array to represent the game state
  const gameState = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));

  // Generate the cells
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    cell.className = "cell bg-gray-400 hover:bg-green-400 border border-gray-200 flex items-center justify-center cursor-pointer rounded";
    cell.dataset.index = i; 
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  }

  // Handle cell click event
  function handleClick(event) {
    const cell = event.target;
    const index = parseInt(cell.dataset.index);
    const row = Math.floor(index / boardSize);  
    const col = index % boardSize;

    if (cell.textContent) return; // Do nothing if the cell is already filled

    // Update the cell and game state
    cell.textContent = currentPlayer;
    gameState[row][col] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    // Check for a win
    if (checkWin(row, col)) {
      if (currentPlayer === "X") {
        scoreX++;
        scoreXElement.textContent = scoreX;
      } else {
        scoreO++;
        scoreOElement.textContent = scoreO;
      }

      // Check for game over condition
      if (Math.abs(scoreX - scoreO) >= 3) {
        alert(`Game Over ! Player ${currentPlayer} wins !`);
        resetGame(true);
      } else {
        alert(`One Point to player ${currentPlayer}!${currentPlayer} to play again.`);
      }
    } else {
      // Switch player if no win
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
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

  // Reset the game
  function resetGame(isGameOver) {
    gameState.forEach(row => row.fill(null)); // Clear the game state
    currentPlayer = "X"; // Reset to Player X
    board.innerHTML = ""; // Clear the board

    // Regenerate the cells
    for (let i = 0; i < boardSize * boardSize; i++) {
      const cell = document.createElement("div");
      cell.className = "cell bg-gray-400 hover:bg-green-400 border border-gray-200 flex items-center justify-center cursor-pointer rounded";
      cell.dataset.index = i;
      cell.addEventListener("click", handleClick);
      board.appendChild(cell);
    }

    if (isGameOver) {
      scoreX = 0;
      scoreO = 0;
      scoreXElement.textContent = scoreX;
      scoreOElement.textContent = scoreO;
    }
  }
});
