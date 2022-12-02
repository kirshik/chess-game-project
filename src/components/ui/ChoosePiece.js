import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { piecesToPromote } from '../strings';
import "./ChoosePiece.css";

function ChoosePiece(props) {
  return (
    <>
      <>
        <Modal show={props.show} onHide={() => { props.handleClose(false) }} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>

            <Modal.Title>Choose piece </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='figures-list'>
              {piecesToPromote.map((piece) => {
                return (
                  <button key={piece} className='figure' onClick={() => { props.handleClose(false); props.promotion(piece.toLowerCase()) }} >
                    <img draggable='false' src={require(`../../images/${props.color}${piece}.png`)} />
                  </button>)
              })}
            </div>

          </Modal.Body>
        </Modal>
      </>

    </>
  );
}
export default ChoosePiece;