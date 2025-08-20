document.addEventListener('DOMContentLoaded', ()=>{
    // ────────── Cell ──────────
    function Cell() {
    let value = '';
    return {
        addToken: (player) => { value = player; },
        getValue: () => value
    };
    }

    // ────────── Gameboard ──────────
    function Gameboard() {
    const row = 3;
    const column = 3;
    const board = [];

    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < column; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeToken = (row, column, player) => {
        if (board[row][column].getValue() !== '') {
            return false; // already taken
        }
        board[row][column].addToken(player);
        return true;
    };

    const isFull = () => {
        return board.every(row => 
            row.every(cell => cell.getValue() !== '')
        );
    };

    const checkWin = (playerToken) => {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (board[i].every(cell => cell.getValue() === playerToken)) {
                return true;
            }
        }

        // Check columns
        for (let j = 0; j < 3; j++) {
            if (board.every(row => row[j].getValue() === playerToken)) {
                return true;
            }
        }

        // Check diagonals
        if (
            board[0][0].getValue() === playerToken &&
            board[1][1].getValue() === playerToken &&
            board[2][2].getValue() === playerToken
        ) return true;

        if (
            board[0][2].getValue() === playerToken &&
            board[1][1].getValue() === playerToken &&
            board[2][0].getValue() === playerToken
        ) return true;

        return false;
    };

    return { getBoard, placeToken, isFull, checkWin };
    }

    // ────────── GameController ──────────
    function GameController(playerOneName, playerTwoName) {
    const board = Gameboard();
    const players = [
        { name: playerOneName, token: 'x' },
        { name: playerTwoName, token: 'o' },
    ];

    let activePlayer = players[0];
    let gameOver = false;

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const playRound = (row, column) => {
        if (gameOver) {
            console.log("Game is already over!");
            return;
        }

        const placed = board.placeToken(row, column, activePlayer.token);
        if (!placed) {
            console.log("Cell already taken, try again!");
            return;
        }

        // Check win first
        if (board.checkWin(activePlayer.token)) {
            gameOver = true;
            console.log(`${activePlayer.name} wins!`);
            return;
        }

        // Then check draw
        if (board.isFull()) {
            gameOver = true;
            console.log("It's a draw!");
            return;
        }

        // Switch turns
        switchPlayer();
        console.log(`It's now ${activePlayer.name}'s turn`);
    };

    return { board, players, getActivePlayer, switchPlayer, playRound };
    }
   

})
