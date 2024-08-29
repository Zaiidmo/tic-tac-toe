document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("game-board");
  const resetButton = document.getElementById("reset-button");
  const scoreXElement = document.getElementById("score-x");
  const scoreOElement = document.getElementById("score-o");

  let currentPlayer = "X";
  let scoreX = 0;
  let scoreO = 0;
  const winLength = 5;
  const boardSize = 20;

  // Generate cells
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    cell.className =
      "cell hover:bg-green-600 bg-gray-400 border border-gray-200 flex items-center justify-center cursor-pointer rounded";
    cell.dataset.index = i; // Track cells
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  }
  // Handle click event
  function handleClick(event) {
    const cell = event.target;
    if (cell.textContent) return; // If cell is already filled
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin(cell.dataset.index)) {
      if (currentPlayer === "X") {
        scoreX++;
        scoreXElement.textContent = scoreX;
      } else {
        scoreO++;
        scoreOElement.textContent = scoreO;
      }
      if (Math.abs(scoreX - scoreO) >= 3) {
        alert(`Game Over ! Player ${currentPlayer} wins`);
        resetGame(true);
      } else { 
        alert(`One Point to player ${currentPlayer} .. ${currentPlayer} to play again ` );
      }
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }

  
});
