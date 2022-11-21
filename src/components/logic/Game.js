import { Chess } from 'chess.js';

class Game {
  #chess
  #squares = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  constructor(game = undefined) {
    this.#chess = new Chess(game);

  }

  getBoard() {
    let board = this.#chess.board();
    console.log(board)
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      if (row.every(v => { return v === null })) {
        board[i] = row.map((cell, j = 0) => { return { square: `${this.#squares[j]}${Math.abs(8 - i)}`, type: 'empty' }; j += 1 })
        console.log(i)
      }

    }
    return board;
  }

  saveGame() {
    return this.#chess.fen();
  }
  getHistory() {
    return this.#chess.history();
  }
}
export default Game;