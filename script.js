document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById('game-board');

    // Create cells (20x20)
    for (let i = 0; i < 400; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell hover:bg-blue-600 bg-gray-400 border border-gray-200 flex items-center justify-center cursor-pointer';
        cell.dataset.index = i; // Track cells index
        // cell.addEventListener('click', handleClick);
        board.appendChild(cell);
    }
});
