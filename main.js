const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

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
        board[randomTile.row][randomTile.col] = Math.random() < 0.9 ? 2 : 4;
    }
}

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

function moveLeft() {
    for (let row = 0; row < 4; row++) {
        let newRow = board[row].filter(val => val); // Remove zeroes
        for (let col = 0; col < newRow.length - 1; col++) {
            if (newRow[col] === newRow[col + 1]) {
                newRow[col] *= 2;  // Merge tiles
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
        let newRow = board[row].filter(val => val); // Remove zeroes
        for (let col = newRow.length - 1; col > 0; col--) {
            if (newRow[col] === newRow[col - 1]) {
                newRow[col] *= 2;
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
            if (newCol[row] === newCol[row - 1
