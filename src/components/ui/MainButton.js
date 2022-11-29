import { Link } from "react-router-dom";
import "./MainButton.css";
function MainButton(props) {
  const secondInerElement = props.secondInner ? <span>{props.secondInner}</span> : <></>;
  const innerElement = props.path ? <Link to={props.path}>{props.title}{secondInerElement}</Link> : props.title;

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