document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("game-board");
  const resetBtn = document.getElementById("reset-button");
  const boardSize = 20; // 20 x 20 grid
  const winLength = 5 // 5 in a row to win 
  let currentPlayer = "X" ; // 'x' starts the game  

  // Create a 2D array to represent the game's states 
  const gameState = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));

  //Generate The Cells 
  generateCells();

  //Create cells and add event listeners 
  function generateCells(){
    for(let i = 0; i < boardSize * boardSize; i++) { 
      const cell = document.createElement("div");
      cell.className = "cell bg-gray-400 hover:bg-green-400 border border-gray-200 flex items-center justify-center cursor-pointer rounded";
      cell.dataset.index = i;
      cell.addEventListener("click", handleClick);
      board.appendChild(cell);
    }
  }

  // Handle cell click event 
  function handleClick(event) {
    const cell = event.target ;
    const index = parseInt(cell.dataset.index);
    const row = Math.floor(index / boardSize);
    const col = index % boardSize ;

    if(cell.textContent) return; // Do nothing if the cell is already filled 

    updateCell(cell, row, col);

    if(checkWin(row, col)) {
      alert('Game Over ! Player ${currentPlayer} wins !');
      resetGame();
    } else {
      // Switch player if no win 
      currentPlayer = currentPlayer === "X" ? "O" : "X" ;
    }
  }
})