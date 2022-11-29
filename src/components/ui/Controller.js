import { useEffect, useState } from "react";
import Countdown, { CountdownApi } from "react-countdown";
import "./Controller.css";
import MainButton from "./MainButton";
import { nanoid } from 'nanoid';
function Controller(props) {

  const [timeLeft, setTimeLeft] = useState();


  function getTimeLeft() {
    if (props.next) {
      const distance = props.next - new Date();
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        return "you loose";
      }
      return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
    } else {
      return (`${props.time}:00`);
    }

  }
  useEffect(() => {
    setTimeout(() => { setTimeLeft(getTimeLeft()) }, 1000);
  });

  const moves = props.moves.map((move) => {
    return (<p key={nanoid()} className="move">{move}</p>)
  })
  function timeToPercentage(currentTime, color) {
    if (color && currentTime) {
      const originTime = Number(props.time) * 60;
      currentTime = Number(currentTime.slice(currentTime.indexOf(":") + 1)) + (60 * Number(currentTime.slice(0, currentTime.indexOf(":"))));
      console.log(originTime, currentTime)
      return { width: Math.floor((currentTime / originTime) * 100) + "%" };
    }
    return { width: "100%" };
  }

  return (

    <div className="Controller">

      <div className="timer" style={{ borderBottom: "none" }}>
        {props.isWhiteMove ? `${props.time}:00` : <div className="current">{timeLeft}</div>}
      </div>
      <div className="display-container">
        <div className="timer-line" style={timeToPercentage(timeLeft, !props.isWhiteMove)}></div>
        <div className="display">
          <p>{props.blackName}</p>
          <div className="moves"><p className="moves-header">white</p><p className="moves-header">black</p>{moves}</div>
          <div className="btns-action">
            <MainButton title="draw"></MainButton>
            <MainButton title="surrender"></MainButton>
          </div>

          <p>{props.whiteName}</p>
        </div>
        <div className="timer-line" style={timeToPercentage(timeLeft, props.isWhiteMove)}></div>
      </div>
      <div className="timer" style={{ borderTop: "none" }}>
        {props.isWhiteMove ? <p className="current">{timeLeft}</p> : `${props.time}:00`}
      </div>
    </div >
  )
}
export default Controller;