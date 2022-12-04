import Modal from 'react-bootstrap/Modal';
import "./EndGameModal.css";
import { nanoid } from "nanoid";

function EndGameModal(props) {
  return (
    <>
      <>
        <Modal show={props.show} onHide={() => { props.handleClose(false) }} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='modal-body-container'>
              <p className='popout'>{[...props.text].map((letter) => {
                return letter === " " ? <br key={nanoid()} /> : <span key={nanoid()}>{letter}</span>;
              })}</p>
            </div>

          </Modal.Body>
        </Modal>
      </>

    </>
  );
}
export default EndGameModal;