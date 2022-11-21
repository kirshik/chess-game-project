import "./Cell.css";
function Cell(props) {
  const img = props.type !== 'empty' ? <img src={require(`../../images/${props.color}${props.type.toUpperCase()}.png`)} alt={props.square} /> : <></>;
  return (
    <div className={'cell ' + props.squareColor}  >
      {img}
    </div>
  );
}
export default Cell;