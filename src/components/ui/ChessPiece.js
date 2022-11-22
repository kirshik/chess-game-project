import { useDrag } from 'react-dnd'
import "./ChessPiece.css"

function ChessPiece(props) {
  const [{ isDragging }, drag] = useDrag({
    type: "chess-piece",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const background = isDragging ? "transparent" : "transparent";
  const piece = props.type !== "empty" ?
    <div style={{ backgroundColor: "transparent" }}>
      <img
        style={{ backgroundColor: background }}
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