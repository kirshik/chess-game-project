import { useEffect, useRef, useState } from "react";
import "./Controller.css";
import MainButton from "./MainButton";
import { nanoid } from 'nanoid';
function Controller(props) {

  const [timer, setTimer] = useState(props.time * 60000);
  const [strTimer, setStrTimer] = useState(`${props.time}:00`);
  const id = useRef(null);

  // const [timerValue, setTimerValue] = useState(`${props.time}:00`);

  const clear = () => {
    window.clearInterval(id.current);
  };
  useEffect(() => {
    if (props.next) {
      setTimer(props.next[0]);
      // setTimerValue(`${props.next[1]}:${props.next[2]}`) 
    };
  }, [props.next ? props.next[0] : ""])

  useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((time) => {
        let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        let seconds = Math.floor((time % (1000 * 60)) / 1000);
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        setStrTimer(`${minutes}:${seconds}`);
        ; return time - 1000;
      });

    }, 1000);
    return () => clear();
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      clear();
    }
  }, [timer]);




  function timeToPercentage(currentTime, color) {
    if (currentTime && color) {
      const originTime = Number(props.time) * 60;
      currentTime = Number(currentTime.slice(currentTime.indexOf(":") + 1)) + (60 * Number(currentTime.slice(0, currentTime.indexOf(":"))));
      return { width: Math.floor((currentTime / originTime) * 100) + "%" };
    }
    else if (props.next && !color) {
      let oppositeTime = `${props.next[1]}:${props.next[2]}`;
      const originTime = Number(props.time) * 60;
      oppositeTime = Number(currentTime.slice(oppositeTime.indexOf(":") + 1)) + (60 * Number(oppositeTime.slice(0, oppositeTime.indexOf(":"))));
      return { width: Math.floor((oppositeTime / originTime) * 100) + "%" };
    } else {
      return { width: "100%" };
    }

  }

  const moves = props.moves.map((move) => {
    return (<p key={nanoid()} className="move">{move}</p>)
  })

  return (

    <div className="Controller">

      <div className="timer" style={{ borderBottom: "none" }}>
        {props.isWhiteMove ? (props.next ?
          `${props.next[1] < 10 ? "0" + props.next[1] : props.next[1]}:${props.next[2] < 10 ? "0" + props.next[2] : props.next[2]}`
          : `${props.time}:00`) : <div className="current">{strTimer}</div>}
      </div>
      <div className="display-container">
        <div className="timer-line" style={timeToPercentage(strTimer, !props.isWhiteMove)}></div>
        <div className="display">
          <p>{props.blackName}</p>
          <div className="moves"><p className="moves-header">white</p><p className="moves-header">black</p>{moves}</div>
          <div className="btns-action">
            <MainButton title="draw"></MainButton>
            <MainButton title="surrender"></MainButton>
          </div>
          <p>{props.whiteName}</p>
        </div>
        <div className="timer-line" style={timeToPercentage(strTimer, props.isWhiteMove)}></div>
      </div>
      <div className="timer" style={{ borderTop: "none" }}>
        {props.isWhiteMove ? <p className="current">
          {strTimer}</p> : (props.next ?
            `${props.next[1] < 10 ? "0" + props.next[1] : props.next[1]}:${props.next[2] < 10 ? "0" + props.next[2] : props.next[2]}`
            : `${props.time}:00`)}
      </div>
    </div >
  )
}
export default Controller;