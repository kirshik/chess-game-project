import { Chess } from 'chess.js';
import { squares_letters } from '../strings';

class Game {
  #chess;
  #gameTime;
  #result;
  #isStart = false;
  #squares = squares_letters;
  constructor(time, whiteName = "Kirill", blackName = "Name", type = "human", game = undefined) {
    this.whiteName = whiteName;
    this.blackName = blackName;
    this.type = type;
    this.time = time;
    this.#chess = new Chess(game);
    this.moves = [];
    this.timer = undefined;

  }

  getMoves() {
    return this.moves.map((move) => { return move.move });
  }

  getBoard() {
    let board = this.#chess.board();
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      if (row.some(v => { return v === null })) {
        board[i] = row.map((cell, j = 0) => {
          if (cell !== null) {
            return cell;
          } else {
            return { square: `${this.#squares[j]}${Math.abs(8 - i)}`, type: 'empty' };
          }
          j += 1;
        }
        )
      }

    }
    return board;
  }

  setTimer() {
    clearInterval(this.timer);
    this.timer = setTimeout(() => { alert("Game Over") }, this.time * 60000)
  }

  makeMove(move) {
    if (!this.#isStart) {
      this.#isStart = true;
      this.#gameTime = new Date();
    }
    this.setTimer();
    const moveTime = new Date().toLocaleTimeString();
    this.moves.push({ move: move, time: moveTime });
    this.#chess.move(move);

  }

  isValidMove(moveFrom, moveTo) {
    if (this.#chess.moves({ square: moveFrom }).filter(pos => pos.includes(moveTo)).length > 0) {
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
  getResult() {
    const endGameTime = new Date();
    const timeOfGame = endGameTime - this.#gameTime;
    return {
      startTime: this.#gameTime,
      timeOfGame: timeOfGame,
      whiteName: this.whiteName,
      blackName: this.blackName,
      moves: this.moves,
      result: this.#result
    }

  }


  //test func
  showBoard() {
    console.log(this.#chess.ascii());
  }
}
export default Game;