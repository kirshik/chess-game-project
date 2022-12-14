import { useState } from "react";
import { noTimeLimit } from "../globals";
import { bullet, blitz3, blitz5, rapid, classical, noLimit, bulletSpan, blitz3Span, blitz5Span, rapidSpan, classicalSpan } from "../strings";
import AskForBlackNameModal from "./AskForBlackNameModal";
import MainButton from "./MainButton";
import "./TypeMenu.css";

function TypeMenu(props) {
  const [showChooseName, setShowChooseName] = useState(props.type === "human" ? true : false);
  return (
    <div className="TypeMenu">
      <AskForBlackNameModal setBlackName={props.setblackName} show={showChooseName} handleClose={setShowChooseName} />
      <MainButton onClick={() => { props.setTime(1) }} type="button" title={bullet} secondInner={bulletSpan} path="/board" />
      <MainButton onClick={() => { props.setTime(3) }} type="button" title={blitz3} secondInner={blitz3Span} path="/board" />
      <MainButton onClick={() => { props.setTime(5) }} type="button" title={blitz5} secondInner={blitz5Span} path="/board" />
      <MainButton onClick={() => { props.setTime(10) }} type="button" title={rapid} secondInner={rapidSpan} path="/board" />
      <MainButton onClick={() => { props.setTime(30) }} type="button" title={classical} secondInner={classicalSpan} path="/board" />
      <MainButton onClick={() => { props.setTime(noTimeLimit) }} type="button" title={noLimit} path="/board" />
    </div>
  );
}
export default TypeMenu;