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
  
    const startGame = () => {
      currentPlayer = player1;
      GameBoard.resetBoard();
      GameBoard.render();
      Array.from(document.querySelectorAll('.cell')).forEach(cell => {
        cell.addEventListener('click', playTurn, { once: true });
      });
    };
  
    const playTurn = (event) => {
      const index = Array.from(document.querySelector('#game-board').children).indexOf(event.target);
      if (GameBoard.setMark(index, currentPlayer.getMark())) {
        GameBoard.render();
        switchPlayer();
      }
    };
  
    const switchPlayer = () => {
      currentPlayer = (currentPlayer === player1) ? player2 : player1;
    };
  
    return { startGame, playTurn };
  })();

// To start the game when the script loads:
window.onload = GameController.startGame;