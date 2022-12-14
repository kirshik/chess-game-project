import { useDrag } from 'react-dnd'
import "./ChessPiece.css"

function ChessPiece(props) {
  const [{ isDragging }, drag] = useDrag({
    type: "chess-piece",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isDragging) {
    props.onDragPiece(props.square);
  }
  const piece = props.type !== "empty" ?
    <div className='chess-cotainer'>
      <img
        ref={drag}
        src={require(`../../images/${props.color}${props.type.toUpperCase()}.png`)}
        alt={props.square}
        className="chess-piece" /></div>
    : <></>;
  return (
    <>
      {piece}
    </>
  )
}

export default ChessPiece;