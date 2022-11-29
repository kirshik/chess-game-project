import Cell from './Cell';
import Game from '../logic/Game';
import "./Board.css";
import { useState, useEffect } from "react";
import { squares_letters, squares_numbers } from '../strings';
import { nanoid } from 'nanoid';
import Controller from './Controller';


function Board(props) {
  const [board, setBoard] = useState();
  const [game, setGame] = useState(props.game);
  const [dragPosition, setDragPosition] = useState();
  const [dropType, setDropType] = useState("");
  const [isPieceChoosen, setIsPiceChoosen] = useState(false);
  const [pickedPiece, setPickedPiece] = useState();
  const [moves, setMoves] = useState(game.getMoves());
  const [next, setNext] = useState();
  const [isWhiteMove, setIsWhiteMove] = useState(true);

  function handleMoveByClick(e) {
    e.preventDefault();
    if (!isPieceChoosen) {
      if (e.target.className === "chess-piece") {
        const square = e.target.parentNode;
        setIsPiceChoosen(true);
        e.target.parentNode.classList.add("picked");
        setDragPosition(square.parentNode.dataset.square);
        setPickedPiece(square);
        setDropType(square.parentNode.dataset.type);

      }
    } else if (e.target === pickedPiece.parentNode || e.target.parentNode === pickedPiece) {
      pickedPiece.classList.remove('picked');
      setIsPiceChoosen(false);
    } else if (e.target.dataset.square || e.target.parentNode.parentNode.dataset.square) {
      pickedPiece.classList.remove('picked');
      const move = e.target.dataset.square ? e.target.dataset.square : e.target.parentNode.parentNode.dataset.square;
      movePiece(move, e.target.dataset.type);
      setIsPiceChoosen(false);

    }

  }

  function onDragPiece(move) {
    setDragPosition(move);
  };

  function setTypeOfPiece(type) {
    setDropType(type)
  }

  function movePiece(move, type) {

    let isDropType;
    move = type === "empty" ? move : "x" + move;
    if (dropType === "p" && type !== "empty") {
      isDropType = dragPosition[0];
    } else if (dropType === "p" && type === "empty") {
      isDropType = "";
    } else {
      isDropType = dropType.toUpperCase();
    }

    move = isDropType + move;
    if (game.isValidMove(dragPosition, move)) {
      let newNext = new Date();
      newNext.setMinutes(new Date().getMinutes() + game.time);
      setNext(newNext);
      if (game.type === "human") { setIsWhiteMove(!isWhiteMove) };
      game.makeMove(move);
      setMoves([...moves, move]);
      setBoard(displayBoard());
    }
  };


  function displayBoard() {
    return game.getBoard().map((row, i = 0) => {
      i += 1;
      return (row.map((cell, j = 0) => {
        j += 1;
        const squareColor = (i + j) % 2 === 1 ? "b" : "w";
        return (
          < Cell key={cell.square} color={cell.color} type={cell.type} square={cell.square}
            squareColor={squareColor} onDragPiece={onDragPiece} onDrop={movePiece} setDropType={setTypeOfPiece} />
        );

      }))
    })
  }
  function createDataCell(data) {
    return <div className='data-cell' key={nanoid()}>{data}</div>;
  }

  const lettersRowTop = squares_letters.map(createDataCell);
  const lettersRowBottom = squares_letters.reverse().map(createDataCell);
  const numbersColumnLeft = squares_numbers.map(createDataCell);
  const numbersColumnRight = squares_numbers.reverse().map(createDataCell);

  return (
    <div className='board-screen-container'>
      <div className={isWhiteMove ? 'board-container' : "board-container black-move"}>
        <div className='num-column'>{numbersColumnLeft}</div>
        <div id="board" onClick={handleMoveByClick}>
          {lettersRowTop}
          {displayBoard()}
          {lettersRowBottom}
        </div>
        <div className='num-column'>{numbersColumnRight}</div>
      </div>
      <aside><Controller
        moves={moves} whiteName={game.whiteName} blackName={game.blackName}
        time={game.time} next={next} isWhiteMove={isWhiteMove}>
      </Controller></aside>
    </div>


  );

}
export default Board;