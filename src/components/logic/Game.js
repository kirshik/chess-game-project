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
    time == "infinity" ? this.time = Infinity : this.time = time;
    this.#chess = new Chess(game);
    this.moves = [];
    this.whiteTimeLeft = Number(time * 60000);
    this.blackTimeLeft = Number(time * 60000);
    this.whiteTimeStart = undefined;
    this.blackTimeStart = undefined;
    this.WhiteTimer = undefined;
    this.BlackTimer = undefined;
    this.isWhite = true;
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
    if (this.isWhite) {
      this.whiteTimeStart = this.whiteTimeStart ? this.whiteTimeStart : new Date();

      if (this.blackTimer) { clearTimeout(this.blackTimer) };
      this.blackTimeLeft = this.blackTimeStart ? this.blackTimeLeft - (new Date() - this.blackTimeStart) : this.blackTimeLeft;

      this.whiteTimer = setTimeout(() => { alert("White l0se"); }, this.whiteTimeLeft);
      this.whiteTimeStart = new Date();
    } else {
      this.blackTimeStart = this.blackTimeStart ? this.blackTimeStart : new Date();

      if (this.whiteTimer) { clearTimeout(this.whiteTimer) };
      this.whiteTimeLeft = this.whiteTimeStart ? this.whiteTimeLeft - (new Date() - this.whiteTimeStart) : this.whiteTimeLeft;

      this.blackTimer = setTimeout(() => { alert("black l0se") }, this.blackTimeLeft);
      this.blackTimeStart = new Date();
    }

  }

  makeMove(from, to) {
    if (!this.#isStart) {
      this.#isStart = true;
      this.#gameTime = new Date();
    }
    const move = this.#chess.move(`${from}-${to}`, { sloppy: true });
    if (move) {
      this.isWhite = !this.isWhite;
      this.setTimer();
      const moveTime = new Date().toLocaleTimeString();
      this.moves.push({ move: `${from}-${to}`, time: moveTime });
    }
    return move;

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