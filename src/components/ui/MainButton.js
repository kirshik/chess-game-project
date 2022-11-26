import { Link } from "react-router-dom";
import "./MainButton.css";
function MainButton(props) {
  const innerElement = props.path ? <Link to={props.path}>{props.title}</Link> : props.title;
  return (
    <button
      type={props.type}
      className="MainButton btn btn-primary"
      onClick={props.onClick}>
      {innerElement}
    </button>
  );
};
export default MainButton;