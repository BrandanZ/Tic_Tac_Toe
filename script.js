// Module for the gameboard
const GameBoard = (() => {
    let board = Array(9).fill(null); // Initialize a 3x3 tic-tac-toe board
  
    const getBoard = () => board;
  
    const setMark = (index, mark) => {
        if (board[index] === null) { // if the spot is free
            board[index] = mark;
            return true;
          }
          return false; // if the spot is taken
    };
  
    const resetBoard = () => {
      board = Array(9).fill(null);
    };

    const render = () => {
        const cells = document.querySelectorAll('.cell');
        for(let i = 0; i < cells.length; i++) {
          cells[i].textContent = board[i];
        }
    };

    return { getBoard, setMark, resetBoard, render };
})();
  
// Factory function for creating players
const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
  
    return { getName, getMark };
};
  
// Module for the game controller
const GameController = (() => {
    let currentPlayer = null;
    let player1 = Player('Player 1', 'X');
    let player2 = Player('Player 2', 'O');

    // Winning combinations
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWin = (player) => {
        const board = GameBoard.getBoard();
        return winCombinations.some(combination =>
        combination.every(index => board[index] === player.getMark())
        );
    };

    const checkTie = () => {
        const board = GameBoard.getBoard();
        return board.every(cell => cell !== null);
    };

    const gameOver = (message) => {
        const gameOverMessage = document.querySelector('#game-over-message');
        const restartButton = document.querySelector('#restart-button');
        gameOverMessage.textContent = message;
        gameOverMessage.hidden = false;
        restartButton.hidden = false;
    };

    const switchPlayer = () => {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    };
    
    const playTurn = (event) => {
        const index = Array.from(document.querySelector('#game-board').children).indexOf(event.target);
        if (GameBoard.setMark(index, currentPlayer.getMark())) {
          GameBoard.render();
    
          if (checkWin(currentPlayer)) {
            gameOver(`${currentPlayer.getName()} wins!`);
          } else if (checkTie()) {
            gameOver('The game is a tie!');
          } else {
            switchPlayer();
          }
        }
    };

    const cellCheck = () => {
        const player1Name = document.querySelector('#player1-name').value;
        const player2Name = document.querySelector('#player2-name').value;
        const defaultText = 'Add name here...';
    
        if (!player1Name || player1Name === defaultText || !player2Name || player2Name === defaultText) {
            document.querySelector('#player1-name').classList.add('error');
            document.querySelector('#player2-name').classList.add('error');
            document.querySelector('#error-message').textContent = 'Please enter names for both players before starting the game.';
            document.querySelector('#error-message').style.color = 'red';
        }
    };

    // Add cellCheck event listener to cells
    Array.from(document.querySelectorAll('.cell')).forEach(cell => {
        cell.addEventListener('click', cellCheck);
    });

    const startGame = () => {
        const player1Name = document.querySelector('#player1-name').value;
        const player2Name = document.querySelector('#player2-name').value;
        const defaultText = "Add name here...";
        
        if (!player1Name || player1Name === defaultText || !player2Name || player2Name === defaultText) {
          document.querySelector('#player1-name').classList.add('error');
          document.querySelector('#player2-name').classList.add('error');
          document.querySelector('#error-message').textContent = 'Please enter names for both players before starting the game.';
          document.querySelector('#error-message').style.color = 'red';
          return;
        } else {
          document.querySelector('#player1-name').classList.remove('error');
          document.querySelector('#player2-name').classList.remove('error');
          document.querySelector('#error-message').textContent = '';
        }
    
        player1 = Player(player1Name, 'X');
        player2 = Player(player2Name, 'O');
        currentPlayer = player1;
    
        GameBoard.resetBoard();
        GameBoard.render();
    
        // Remove cellCheck event listener from cells and add playTurn event listener
        Array.from(document.querySelectorAll('.cell')).forEach(cell => {
            cell.removeEventListener('click', cellCheck);
            cell.addEventListener('click', playTurn, { once: true });
        });
    
        // Hide game over message and restart button
        document.querySelector('#game-over-message').hidden = true;
        document.querySelector('#restart-button').hidden = true;
    };
  
      return { cellCheck, startGame, playTurn };
})();

Array.from(document.querySelectorAll('.cell')).forEach(cell => {
    cell.addEventListener('click', GameController.cellCheck);
});

// To start the game when the script loads:
document.querySelector('#start-button').addEventListener('click', GameController.startGame);
document.querySelector('#restart-button').addEventListener('click', GameController.startGame);