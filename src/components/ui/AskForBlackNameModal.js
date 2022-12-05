import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MainButton from './MainButton';
import "./AskForBlackNameModal.css";
import { useState } from 'react';

function AskForBlackNameModal(props) {
  const [blackNameLetters, setBlackNameLetters] = useState();
  return (
    <>
      <>
        <Modal show={props.show} onHide={() => { props.handleClose(false) }} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header>
            <Modal.Title>{"friend name"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="md-form">
              <input required type="name" id="black-name" className="form-control" autoFocus onChange={(e) => setBlackNameLetters(e.target.value)} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div id={"save-name-btn"}>
              <MainButton title={"Save name"} onClick={() => { props.setBlackName(blackNameLetters); props.handleClose(false) }} />
            </div>
          </Modal.Footer>
        </Modal>
      </>

    </>
  );
}
export default AskForBlackNameModal;