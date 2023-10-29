// script.js
const board = document.getElementById("tic-tac-toe");
const cells = document.querySelectorAll("[data-cell]");
const resetButton = document.getElementById("reset-button");
const result = document.getElementById("result");
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = (player) => {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent === player && cells[b].textContent === player && cells[c].textContent === player) {
            return true;
        }
    }
    return false;
};

const checkDraw = () => {
    return [...cells].every((cell) => cell.textContent !== "");
};

const minimax = (board, depth, isMaximizing) => {
    const scores = {
        X: -1,
        O: 1,
        draw: 0,
    };

    if (checkWinner("O")) return scores["O"];
    if (checkWinner("X")) return scores["X"];
    if (checkDraw()) return scores["draw"];

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent === "") {
                cells[i].textContent = "O";
                bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
                cells[i].textContent = "";
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent === "") {
                cells[i].textContent = "X";
                bestScore = Math.min(bestScore, minimax(board, depth + 1, true));
                cells[i].textContent = "";
            }
        }
        return bestScore;
    }
};

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (cell.textContent === "" && gameActive) {
            cell.textContent = "X";
            cell.setAttribute("data-cell", "X");
            if (checkWinner("X")) {
                result.innerText = "You (X) win!";
                gameActive = false;
            } else if (!checkDraw()) {
                makeComputerMove();
            } else {
                result.innerText = "It's a draw!";
                gameActive = false;
            }
        }
    });
});

// ...

const makeComputerMove = () => {
    if (gameActive) {
        let bestMove;
        let bestScore = -Infinity;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent === "") {
                cells[i].textContent = "O";
                cells[i].setAttribute("data-cell", "O"); 
                const score = minimax(cells, 0, false);
                cells[i].textContent = "";
                cells[i].removeAttribute("data-cell"); 
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        cells[bestMove].textContent = "O";
        cells[bestMove].setAttribute("data-cell", "O"); 
        if (checkWinner("O")) {
            result.innerText = "Computer (O) wins!";
            gameActive = false;
        } else if (checkDraw()) {
            result.innerText = "It's a draw!";
            gameActive = false;
        }
    }
};



resetButton.addEventListener("click", () => {
    cells.forEach((cell) => {
        cell.textContent = "";
    });
    result.innerText = "";
    currentPlayer = "X";
    gameActive = true;
});


