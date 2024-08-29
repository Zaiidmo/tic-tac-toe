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
});