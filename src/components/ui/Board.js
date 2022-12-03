import Cell from './Cell';
import Game from '../logic/Game';
import "./Board.css";
import { useState, useEffect } from "react";
import { squares_letters, squares_numbers } from '../strings';
import { nanoid } from 'nanoid';
import Controller from './Controller';
import ChoosePiece from './ChoosePiece';
import EndGameModal from './EndGameModal';


function Board(props) {

  let isTimeLimit = isNaN(game.time);

  const [board, setBoard] = useState();
  const [game, setGame] = useState(props.game);
  const [dragPosition, setDragPosition] = useState();
  const [isPieceChoosen, setIsPiceChoosen] = useState(false);
  const [pickedPiece, setPickedPiece] = useState();
  const [moves, setMoves] = useState(game.getMoves());
  const [next, setNext] = useState();
  const [isWhiteMove, setIsWhiteMove] = useState(true);

  // Choose Piece
  const [promotion, setPromotion] = useState();
  const [show, setShow] = useState(false);
  const [promotionMove, setPromotionMove] = useState();

  useEffect(() => { movePiece(promotionMove) }, [promotion])



  function handleMoveByClick(e) {
    e.preventDefault();
    if (!isPieceChoosen) {
      if (e.target.className === "chess-piece") {
        const square = e.target.parentNode;
        setIsPiceChoosen(true);
        e.target.parentNode.classList.add("picked");
        setDragPosition(square.parentNode.dataset.square);
        setPickedPiece(square);

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



  function movePiece(move) {
    let currentMove;
    if (game.isPromotion(dragPosition)) {
      if (promotion) {
        currentMove = game.makeMove(dragPosition, move, promotion);
        setPromotion(undefined);
      } else {
        setShow(true);
        setPromotionMove(move);
      }
    } else {
      currentMove = game.makeMove(dragPosition, move);
    }

    if (game.type === "human" && currentMove) { setIsWhiteMove(!isWhiteMove) };
    if (currentMove) {

      let newNext = !isWhiteMove ? game.whiteTimeLeft : game.blackTimeLeft;

      const date = new Date();
      const minutes = Math.floor(Math.floor(newNext / 1000) / 60);
      const seconds = Math.floor(newNext / 1000) % 60;

      let oppositeMinutes = Math.floor(Math.floor((isWhiteMove ? game.whiteTimeLeft : game.blackTimeLeft) / 1000) / 60);
      let oppositeSeconds = Math.floor((isWhiteMove ? game.whiteTimeLeft : game.blackTimeLeft) / 1000) % 60;



      date.setSeconds(date.getSeconds() + seconds);
      date.setMinutes(date.getMinutes() + minutes);

      setNext([newNext, oppositeMinutes, oppositeSeconds]);




      setMoves([...moves, `${dragPosition}-${move}`]);
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
            squareColor={squareColor} onDragPiece={onDragPiece} onDrop={movePiece} />
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
      <ChoosePiece color={isWhiteMove ? "w" : "b"} show={show} handleClose={setShow} promotion={setPromotion} />
      <EndGameModal text={"you WIN!"} show={false} />
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
        time={game.time} next={next} isWhiteMove={isWhiteMove} isTimeLimit={isTimeLimit}>
      </Controller></aside>
    </div>


  );

}
export default Board;