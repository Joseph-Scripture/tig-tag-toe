// ────────── Game Logic (same as before) ──────────
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

    const isFull = () => {
        return board.every(row => 
            row.every(cell => cell.getValue() !== '')
        );
    };

    const checkWin = (playerToken) => {
        for (let i = 0; i < 3; i++) {
            if (board[i].every(cell => cell.getValue() === playerToken)) return true;
        }
        for (let j = 0; j < 3; j++) {
            if (board.every(row => row[j].getValue() === playerToken)) return true;
        }
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

function GameController(playerOneName, playerTwoName) {
    const board = Gameboard();
    const players = [
        { name: playerOneName, token: 'X' },
        { name: playerTwoName, token: 'O' },
    ];

    let activePlayer = players[0];
    let gameOver = false;

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const playRound = (row, column) => {
        if (gameOver) return;

        const placed = board.placeToken(row, column, activePlayer.token);
        if (!placed) return;

        renderBoard();

        if (board.checkWin(activePlayer.token)) {
            gameOver = true;
            document.getElementById('message').textContent = `${activePlayer.name} wins!`;
            return;
        }

        if (board.isFull()) {
            gameOver = true;
            document.getElementById('message').textContent = "It's a draw!";
            return;
        }

        switchPlayer();
        document.getElementById('message').textContent = `It's ${activePlayer.name}'s turn`;
    };

    const renderBoard = () => {
        const boardDiv = document.getElementById('board');
        boardDiv.innerHTML = '';
        board.getBoard().forEach((row, i) => {
            row.forEach((cell, j) => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.textContent = cell.getValue();
                cellDiv.addEventListener('click', () => playRound(i, j));
                boardDiv.appendChild(cellDiv);
            });
        });
    };

    return { board, players, getActivePlayer, playRound, renderBoard };
}

// ────────── UI Logic ──────────
document.getElementById('startBtn').addEventListener('click', () => {
    const p1 = document.getElementById('player1').value.trim() || 'Player 1';
    const p2 = document.getElementById('player2').value.trim() || 'Player 2';

    window.game = GameController(p1, p2);
    game.renderBoard();
    document.getElementById('message').textContent = `It's ${game.getActivePlayer().name}'s turn`;

    // hide inputs after starting
    document.querySelector('.player-inputs').style.display = 'none';
});
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

startBtn.addEventListener('click', () => {
    const p1 = document.getElementById('player1').value.trim() || 'Player 1';
    const p2 = document.getElementById('player2').value.trim() || 'Player 2';

    window.game = GameController(p1, p2);
    game.renderBoard();
    document.getElementById('message').textContent = `It's ${game.getActivePlayer().name}'s turn`;

    document.querySelector('.player-inputs').style.display = 'none';
    restartBtn.style.display = 'inline-block';
});

restartBtn.addEventListener('click', () => {
    // Reset UI
    document.querySelector('.player-inputs').style.display = 'block';
    restartBtn.style.display = 'none';
    document.getElementById('board').innerHTML = '';
    document.getElementById('message').textContent = '';
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
});
