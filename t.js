// Add your JavaScript code here
let currentPlayer = 'X';
let board = [['', '', ''], ['', '', ''], ['', '', '']];
let gameOver = false;
let gameType = '';

function makeMove(row, col) {
  if (gameOver || board[row][col] !== '') {
    return;
  }

  board[row][col] = currentPlayer;
  document.getElementById('game').children[row].children[col].textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    endGame(currentPlayer + ' wins!');
  } else if (checkDraw()) {
    endGame('It\'s a draw!');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameType === 'computer' && currentPlayer === 'O') {
      makeComputerMove();
    }
  }
}

function makeComputerMove() {
  if (gameOver) {
    return;
  }

  let availableMoves = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        availableMoves.push([i, j]);
      }
    }
  }

  if (availableMoves.length > 0) {
    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    makeMove(randomMove[0], randomMove[1]);
  }
}

function checkWin(player) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
      return true;
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {
      return true;
    }
  }

  // Check diagonals
  if (
    (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
    (board[0][2] === player && board[1][1] === player && board[2][0] === player)
  ) {
    return true;
  }

  return false;
}

function checkDraw() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        return false;
      }
    }
  }
  return true;
}

function endGame(message) {
  gameOver = true;
  alert(message);
}

function restart() {
  currentPlayer = 'X';
  board = [['', '', ''], ['', '', ''], ['', '', '']];
  gameOver = false;
  let cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
  }
}

function setGameType(type) {
  gameType = type;
  restart();

  if (gameType === 'computer' && currentPlayer === 'O') {
    makeComputerMove();
  }
}

// Set the game type
setGameType('player');  // Set the default game type as player versus player

