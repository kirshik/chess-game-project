import "./MainButton.css";
function MainButton(props) {
  return (
    <button
      type={props.type}
      className="MainButton btn btn-primary"
      onClick={props.onClick}>
      {props.title}
    </button>
  );
};
export default MainButton;