import Cell from './Cell';
import Game from '../logic/Game';
import "./Board.css";
import { useState, useEffect } from "react";
import { squares_letters, squares_numbers } from '../strings';
import { nanoid } from 'nanoid';
import Controller from './Controller';


function Board(props) {
  const [board, setBoard] = useState();
  const [game, setGame] = useState(new Game());
  const [dragPosition, setDragPosition] = useState();
  const [dropType, setDropType] = useState("");
  const [isPieceChoosen, setIsPiceChoosen] = useState(false);
  const [pickedPiece, setPickedPiece] = useState();
  const [moves, setMoves] = useState(game.getMoves());

  function handleMoveByClick(e) {
    e.preventDefault();
    if (!isPieceChoosen) {
      if (e.target.className === "chess-piece") {
        const square = e.target.parentNode.parentNode;
        setIsPiceChoosen(true);
        e.target.parentNode.style.backgroundColor = "var(--first-click-color)";
        setDragPosition(square.dataset.square);
        setPickedPiece(square);
        setDropType(square.dataset.type);

      }
    } else if (e.target === pickedPiece || e.target.parentNode.parentNode === pickedPiece) {
      setIsPiceChoosen(false);
    } else if (e.target.dataset.square || e.target.parentNode.dataset.square) {
      const move = e.target.dataset.square ? e.target.dataset.square : e.target.parentNode.dataset.square;
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
    console.log("DROPPPPTYPE", dropType)
    if (dropType === "p" && type !== "empty") {
      isDropType = dragPosition[0];
    } else if (dropType === "p" && type === "empty") {
      isDropType = "";
    } else {
      isDropType = dropType.toUpperCase();
    }

    move = isDropType + move;

    if (game.isValidMove(dragPosition, move)) {
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

    <div className='board-container'>
      <div className='num-column'>{numbersColumnLeft}</div>
      <div id="board" onClick={handleMoveByClick}>
        {lettersRowTop}
        {displayBoard()}
        {lettersRowBottom}
      </div>
      <div className='num-column'>{numbersColumnRight}</div>
      <aside><Controller moves={moves} whiteName={props.whiteName}></Controller></aside>
    </div>


  );

}
export default Board;