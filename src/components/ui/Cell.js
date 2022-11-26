import "./Cell.css"
import { useDrop } from 'react-dnd'
import ChessPiece from "./ChessPiece";


function Cell(props) {

  const [{ isOver }, drop] = useDrop({
    accept: "chess-piece",
    drop: () => props.onDrop(props.square, props.type),
    collect: (monitor) => ({
      isOver: !monitor.isOver(),
    }),
  });

  const background = isOver ? "green" : "red";



  return (
    <div ref={drop} className={'cell ' + props.squareColor} data-square={props.square} data-type={props.type}>
      <ChessPiece type={props.type} onDragPiece={props.onDragPiece}
        color={props.color} square={props.square} setDropType={props.setDropType} />
    </div>
  );
}
export default Cell;