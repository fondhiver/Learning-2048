let score = 0;  // Current game score
let highScore = localStorage.getItem('highScore') || 0;  // Retrieve high score from localStorage (or set to 0 if none exists)

// Function to update the score and check the high score
function updateScore(points) {
    score += points;  // Add points from merged tiles to the current score
    document.getElementById('current-score').textContent = score;  // Update score display on the screen

    // If the current score is higher than the high score, update the high score
    if (score > highScore) {
        highScore = score;
        document.getElementById('high-score').textContent = highScore;
        localStorage.setItem('highScore', highScore);  // Save the new high score to localStorage
    }
}

// Game board setup
const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

// Function to add a new tile (2 or 4) in a random empty cell
function addNewTile() {
    let emptyTiles = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) {
                emptyTiles.push({ row, col });
            }
        }
    }
    if (emptyTiles.length > 0) {
        let randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[randomTile.row][randomTile.col] = Math.random() < 0.9 ? 2 : 4;  // 90% chance for 2, 10% chance for 4
    }
}

// Function to render the game board
function renderBoard() {
    const grid = document.querySelector('.grid');
    grid.innerHTML = '';  // Clear grid before re-rendering

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const tile = document.createElement('div');
            tile.classList.add('cell');
            tile.textContent = board[row][col] === 0 ? '' : board[row][col];
            if (board[row][col] !== 0) {
                tile.setAttribute('data-value', board[row][col]);
            }
            grid.appendChild(tile);
        }
    }
}

// Movement Functions
function moveLeft() {
    for (let row = 0; row < 4; row++) {
        let newRow = board[row].filter(val => val);  // Remove zeroes
        for (let col = 0; col < newRow.length - 1; col++) {
            if (newRow[col] === newRow[col + 1]) {
                newRow[col] *= 2;  // Merge tiles
                updateScore(newRow[col]);  // Update score for merged tiles
                newRow[col + 1] = 0;
            }
        }
        newRow = newRow.filter(val => val);  // Remove zeroes again
        while (newRow.length < 4) newRow.push(0);  // Add zeroes to the right
        board[row] = newRow;
    }
}

function moveRight() {
    for (let row = 0; row < 4; row++) {
        let newRow = board[row].filter(val => val);  // Remove zeroes
        for (let col = newRow.length - 1; col > 0; col--) {
            if (newRow[col] === newRow[col - 1]) {
                newRow[col] *= 2;
                updateScore(newRow[col]);  // Update score for merged tiles
                newRow[col - 1] = 0;
            }
        }
        newRow = newRow.filter(val => val);  // Remove zeroes again
        while (newRow.length < 4) newRow.unshift(0);  // Add zeroes to the left
        board[row] = newRow;
    }
}

function moveUp() {
    for (let col = 0; col < 4; col++) {
        let newCol = [];
        for (let row = 0; row < 4; row++) {
            if (board[row][col] !== 0) newCol.push(board[row][col]);
        }
        for (let row = 0; row < newCol.length - 1; row++) {
            if (newCol[row] === newCol[row + 1]) {
                newCol[row] *= 2;
                updateScore(newCol[row]);  // Update score for merged tiles
                newCol[row + 1] = 0;
            }
        }
        newCol = newCol.filter(val => val);
        while (newCol.length < 4) newCol.push(0);
        for (let row = 0; row < 4; row++) {
            board[row][col] = newCol[row];
        }
    }
}

function moveDown() {
    for (let col = 0; col < 4; col++) {
        let newCol = [];
        for (let row = 0; row < 4; row++) {
            if (board[row][col] !== 0) newCol.push(board[row][col]);
        }
        for (let row = newCol.length - 1; row > 0; row--) {
            if (newCol[row] === newCol[row - 1]) {
                newCol[row] *= 2;
                updateScore(newCol[row]);  // Update score for merged tiles
                newCol[row - 1] = 0;
            }
        }
        newCol = newCol.filter(val => val);  // Remove zeroes again
        while (newCol.length < 4) newCol.unshift(0);  // Add zeroes to the top
        for (let row = 0; row < 4; row++) {
            board[row][col] = newCol[row];
        }
    }
}

// Listen for key presses and move tiles accordingly
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
    addNewTile();  // Add a new tile after each move
    renderBoard(); // Re-render the board after each move
});

// Initialize the game with two tiles and render the initial board
addNewTile();
addNewTile();
renderBoard();

// Initialize the score display when the game loads
document.getElementById('high-score').textContent = highScore;
document.getElementById('current-score').textContent = score;
