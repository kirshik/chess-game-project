import "./Cell.css"
import { useDrop } from 'react-dnd'
import ChessPiece from "./ChessPiece";

function Cell(props) {
  const [{ isOver }, drop] = useDrop({
    accept: "chess-piece",
    drop: () => movePiece(),
    collect: (monitor) => ({
      isOver: !monitor.isOver(),
    }),
  });

  const background = isOver ? "green" : "red";
  function movePiece() { }

  return (
    <div ref={drop} className={'cell ' + props.squareColor} data-square={props.square}  >
      <ChessPiece type={props.type} color={props.color} square={props.square} />
    </div>
  );
}
export default Cell;