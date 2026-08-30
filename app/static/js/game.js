console.log("game.js loaded");


const gameMode = document.querySelector("#game-mode");
const difficulty = document.querySelector("#difficulty");
const difficultyOption = document.querySelector("#difficulty-container");

difficultyOption.style.display = "none";


let mode = gameMode.value;
let board = ["", "", "", "", "", "", "", "", ""];
let gameover = false;
let currentPlayer = "X";

const cells = document.querySelectorAll(".cell");
// Find an HTML element whose class is cell and store it in a variable called cell
console.log(cells)

const gameResult = document.querySelector("#game-result");
console.log("gameResult:", gameResult);

const restart = document.querySelector("#start-game")


gameMode.addEventListener("change", function() {
    console.log("Selected mode:", gameMode.value);

    if (gameMode.value === "single-player") {

        difficultyOption.style.display = "flex";

    } else {

        difficultyOption.style.display = "none";

    }
});


function hasWinner(board, player) {

    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningPatterns.some(function(pattern) {

        return (
            board[pattern[0]] === player &&
            board[pattern[1]] === player &&
            board[pattern[2]] === player
        );

    });
}

function findWinningMove(player) {

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {

            board[i] = player;

            if (hasWinner(board, player)) {
                board[i] = "";
                return i;
            }

            board[i] = "";
        }
    }

    return -1;
}



function easyaimove() {
    
    console.log("EASY AI STARTED");
    // 1. Try to win
    let winningMove = findWinningMove("O");

    if (winningMove !== -1) {

        board[winningMove] = "O";
        cells[winningMove].textContent = "O";

        return;
    }


    // 2. Try to block X
    let blockingMove = findWinningMove("X");

    if (blockingMove !== -1) {

        board[blockingMove] = "O";
        cells[blockingMove].textContent = "O";

        return;
    }


    // 3. No winning or blocking move → random move

    let emptyCells = [];

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {
            emptyCells.push(i);
        }
    }

    let randomIndex =
        Math.floor(Math.random() * emptyCells.length);

    let move = emptyCells[randomIndex];

    board[move] = "O";
    cells[move].textContent = "O";
}

function hardaimove() {

    console.log("Hard AI STARTED");

    let move = bestMove();

    console.log("Hard AI chose:", move);

    board[move] = "O";
    cells[move].textContent = "O";
}



function minimax(board, depth, isMaximizing) {

    //These three conditions are the base cases for recursion
    // because minimax should stop exploring board if any of this condition is reached
    //condition for  O is the winner
   if (hasWinner(board, "O")) {
        return 10;
    }
    
    // condition for X is the winner
    if (hasWinner(board, "X")) {
        return -10;
    }
    

    //condition for draw
    if (board.every(function(cell) {
        return cell !== "";
    })) {
        return 0;
    }

     // AI's turn
    if (isMaximizing) {

        let bestScore = -Infinity;

        for (let i = 0; i < board.length; i++) {

            if (board[i] === "") {

                board[i] = "O";

                let score = minimax(board, depth + 1, false);

                board[i] = "";

                bestScore = Math.max(bestScore, score);
            }
        }

        return bestScore;
    }


    // Human's turn
    else {

        let bestScore = Infinity;

        for (let i = 0; i < board.length; i++) {

            if (board[i] === "") {

                board[i] = "X";

                let score = minimax(board, depth + 1, true);

                board[i] = "";

                bestScore = Math.min(bestScore, score);
            }
        }

        return bestScore;
    }
}

function bestMove() {

    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {

            board[i] = "O";

            let score = minimax(board, 0, false);

            board[i] = "";

            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    return move;
}


function startGame() {

    board = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(function(cell) {
        cell.textContent = "";
    });

    gameResult.textContent = "";

    gameover = false;

    currentPlayer = "X";
}

function checkwinner(board, winner){
                       if (
            (board[0] === board[1] && board[1] === board[2] && board[0] !== "") ||
            (board[3] === board[4] && board[4] === board[5] && board[3] !== "") ||
            (board[6] === board[7] && board[7] === board[8] && board[6] !== "") ||

            (board[0] === board[3] && board[3] === board[6] && board[0] !== "") ||
            (board[1] === board[4] && board[4] === board[7] && board[1] !== "") ||
            (board[2] === board[5] && board[5] === board[8] && board[2] !== "") ||

            (board[0] === board[4] && board[4] === board[8] && board[0] !== "") ||
            (board[2] === board[4] && board[4] === board[6] && board[2] !== "")
        ) {
            
            console.log("Winner:", winner);
            gameResult.textContent = (`${winner} is the winner`);
            gameover = true;
        }
             //draw logic when board is full
         else if (
                 board.every(function (cell)
                            {
                                return cell !== "";
                            }
                            )             
                 ) 
            {

            console.log("Draw!");
            gameResult.textContent = ("It's a draw!!");
            gameover = true;

             }
        
}

restart.addEventListener("click", startGame);

// cells.addEventListener("click", function () {
//     cell.textContent = "X";
// });


cells.forEach(function (cell, index) {

    cell.addEventListener("click", function () {

                if (!gameover && gameMode.value === "two-player" && cell.textContent === "") {
                    

                    cell.textContent = currentPlayer;
                    board[index] = currentPlayer;

                    //checking winner
                    checkwinner(board, currentPlayer);
                    if (!gameover){
                            if (currentPlayer === "X") {
                                currentPlayer = "O";
                            } else {
                                currentPlayer = "X";
                            }
                        }

                } 
                else if (!gameover && gameMode.value === "single-player") {

                        if (currentPlayer === "X") {

                            cell.textContent = currentPlayer;
                            board[index] = currentPlayer;
                            
                            console.log(currentPlayer);

                            checkwinner(board, currentPlayer);

                            if (!gameover) {

                                currentPlayer = "O";

                                console.log("Difficulty:", difficulty.value);

                                if (difficulty.value === "easy") 
                                        {

                                            easyaimove();
                                            

                                        }

                                         else if (difficulty.value === "hard") 
                                        {

                                            hardaimove();

                                        }

                                checkwinner(board, currentPlayer);
                                currentPlayer = 'X';
                            }
                        
                    }
                }

            })

    });




//012, 345, 678, 036, 147, 258, 048, 246




