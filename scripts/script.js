function Cell() {
    let value = '';
    return {
        addToken: (player) => { value = player; },
        getValue: () => value
    };
}

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

    return { getBoard, placeToken };
}

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

    return { board, players, getActivePlayer, switchPlayer };
}
