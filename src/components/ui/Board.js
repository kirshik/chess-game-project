import { Chess } from 'chess.js';

function Board(props) {
  const chess = new Chess();
  console.log(chess.ascii());
  console.log(chess.board());
  const board = chess.board.map((cell) => {
    return (
      <div>{cell}</div>
    );
  }
  );
  return (
    <>
      {board}
    </>
  );

}
export default Board;