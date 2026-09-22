const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restart = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let player = "X";
let gameOver = false;

const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(function(cell) {
    cell.addEventListener("click", function() {

        const index = cell.dataset.index;

        // Don't allow clicking an occupied square
        if (board[index] !== "" || gameOver) {
            return;
        }

        // Put X or O
        board[index] = player;
        cell.textContent = player;
        cell.classList.add(player.toLowerCase());

        checkGame();
    });
});

function checkGame() {

    // Check for winner
    for (let combination of wins) {

        const a = combination[0];
        const b = combination[1];
        const c = combination[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {

            status.textContent = "Player " + player + " Wins!";

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            gameOver = true;
            return;
        }
    }

    // Check draw
    if (!board.includes("")) {
        status.textContent = "It's a Draw!";
        gameOver = true;
        return;
    }

    // Change player
    if (player === "X") {
        player = "O";
    } else {
        player = "X";
    }

    status.textContent = "Player " + player + "'s Turn";
}


// Restart
restart.addEventListener("click", function() {

    board = ["", "", "", "", "", "", "", "", ""];
    player = "X";
    gameOver = false;

    status.textContent = "Player X's Turn";

    cells.forEach(function(cell) {
        cell.textContent = "";
        cell.classList.remove("x", "o", "winner");
    });
});