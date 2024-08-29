document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("game-board");
  const boardSize = 20; // 20x20 grid
  const winLength = 5; // 5 in a row to win
  let currentPlayer = "X"; // X starts the game

  // Generate the cells
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    cell.className =
      "cell bg-gray-400 hover:bg-green-400 border border-gray-200 flex items-center justify-center cursor-pointer rounded";
    cell.dataset.index = i; // Store the index for reference
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }

  // Handle cell click event
  function handleCellClick(event) {
    const cell = event.target;
    if (cell.textContent !== "") return; // If the cell is already filled, do nothing
    cell.textContent = currentPlayer; // Mark the cell with the current player's symbol
    cell.classList.add("bg-green-500") ; // Change background color to green
    cell.classList.remove("hover:bg-green-400");
    cell.classList.remove("bg-gray-400");
    cell.classList.remove('cursor-pointer');

    // Check for a win
    if (checkWin(cell)) {
        alert(currentPlayer + " wins!");
        updateScore(currentPlayer);
        resetGame();
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch players
    }
}
  //Reset the game
  function resetGame() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.add("hover:bg-green-500");
      cell.classList.remove("bg-green-500");
      cell.classList.add("bg-gray-400");
    });
    currentPlayer = "X";
  }

  // Add event listener to the reset button
  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", resetGame);
});
