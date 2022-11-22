import Cell from './Cell'
import Game from '../logic/Game';
import "./Board.css";


function Board(props) {
  const game = new Game();
  if (game.isValidMove("b2", "b4")) {
    game.makeMove("b4");
  };



  let board = <div id='board' >{displayBoard()}</div>;

  function displayBoard() {
    return game.getBoard().map((row, i = 0) => {
      i += 1;
      return (row.map((cell, j = 0) => {
        j += 1;
        const squareColor = (i + j) % 2 === 1 ? "b" : "w";
        return (
          < Cell key={cell.square} color={cell.color} type={cell.type} square={cell.square} squareColor={squareColor} />
        );

      }))
    })


  }

  return (
    <>
      {board}
    </>
  );

}
export default Board;