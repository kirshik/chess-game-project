import { useEffect, useState } from "react";
import "./Controller.css";
import MainButton from "./MainButton";
function Controller(props) {
  console.log(props.moves)
  const moves = props.moves.map((move) => {
    return (<p key={move} className="move">{move}</p>)
  })

  return (

    <div className="Controller">
      <div className="timer">{props.timerBlack}</div>
      <div className="display">
        <p>{props.blackName}</p>
        <div className="moves"><p className="moves-header">white</p><p className="moves-header">black</p>{moves}</div>
        <div className="btns-action">
          <MainButton title="draw"></MainButton>
          <MainButton title="surrender"></MainButton>
        </div>

        <p>{props.whiteName}</p>
      </div>
      <div className="timer">{props.timerWhite}</div>
    </div>
  )
}
export default Controller;