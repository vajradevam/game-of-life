const rows = 50;
const cols = 50;
let grid = createEmptyGrid();

function createEmptyGrid() {
    let arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
        arr[i] = new Array(cols).fill(false);
    }
    return arr;
}

function createGridElements() {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', toggleCell);
            gridContainer.appendChild(cell);
        }
    }
}

function toggleCell() {
    const row = parseInt(this.dataset.row);
    const col = parseInt(this.dataset.col);
    grid[row][col] = !grid[row][col];
    this.classList.toggle('alive');
}

function updateGrid() {
    let nextGrid = createEmptyGrid();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const neighbors = countNeighbors(i, j);
            if (grid[i][j]) {
                if (neighbors === 2 || neighbors === 3) {
                    nextGrid[i][j] = true;
                }
            } else {
                if (neighbors === 3) {
                    nextGrid[i][j] = true;
                }
            }
        }
    }
    grid = nextGrid;
    renderGrid();
}

function countNeighbors(row, col) {
    let count = 0;
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < rows && j >= 0 && j < cols && !(i === row && j === col)) {
                if (grid[i][j]) {
                    count++;
                }
            }
        }
    }
    return count;
}

function renderGrid() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        if (grid[row][col]) {
            cell.classList.add('alive');
        } else {
            cell.classList.remove('alive');
        }
    });
}

let intervalId;

function startGame() {
    intervalId = setInterval(updateGrid, 100);
}

function stopGame() {
    clearInterval(intervalId);
}

function clearGrid() {
    grid = createEmptyGrid();
    renderGrid();
}

document.addEventListener('DOMContentLoaded', function() {
    createGridElements();
});
