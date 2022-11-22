import { Chess } from 'chess.js';

class Game {
  #chess
  #squares = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  constructor(game = undefined) {
    this.#chess = new Chess(game);

  }

  getBoard() {
    let board = this.#chess.board();
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      if (row.some(v => { return v === null })) {
        board[i] = row.map((cell, j = 0) => {
          if (cell !== null) {
            return cell;
            j += 1;
          } else {
            return { square: `${this.#squares[j]}${Math.abs(8 - i)}`, type: 'empty' };
            j += 1;
          }
        }
        )
      }

    }
    return board;
  }
  makeMove(move) {
    const newMove = this.#chess.move(move);

  }

  isValidMove(moveFrom, moveTo) {
    if (this.#chess.moves({ square: moveFrom }).includes(moveTo)) {
      return true;
    }
    return false;
  }

  saveGame() {
    return this.#chess.fen();
  }
  getHistory() {
    return this.#chess.history();
  }
}
export default Game;