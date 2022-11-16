import { signInlabel, signInLoginHelp, signInButton } from "../strings";
import { useState } from "react";
import "./SignIn.css";
import MainButton from "./MainButton";



function SignIn(props) {
  const [userName, setUserName] = useState("");

  // TO-DO
  function handleClick(e) {
    e.preventDefault();
    props.saveLogin(userName);
  }
  return (
    <div className="sign-in-container">
      <div className="background-block"></div>
      <div className="SignIn">
        <form className="sign-in-form">
          <div className="form-group">
            <label htmlFor="login">{signInlabel}</label>
            <input
              required
              autoFocus
              type="text"
              className="form-control"
              id="login"
              aria-describedby="loginHelp"
              placeholder="Enter username"
              onChange={e => setUserName(e.target.value)}
            />
            <small id="loginHelp" className="form-text text-muted">{signInLoginHelp}</small>
          </div>
          <MainButton type="submit" title={signInButton} onClick={handleClick} />
        </form>
      </div>
    </div>
  );
}
export default SignIn;