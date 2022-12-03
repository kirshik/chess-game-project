import Modal from 'react-bootstrap/Modal';
import "./EndGameModal.css";

function EndGameModal(props) {
  return (
    <>
      <>
        <Modal show={props.show} onHide={() => { props.handleClose(false) }} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <div className='modal-body-container'>
              <p className='popout'>{[...props.text].map((letter) => {
                return letter === " " ? <br /> : <span>{letter}</span>;
              })}</p>
            </div>

          </Modal.Body>
        </Modal>
      </>

    </>
  );
}
export default EndGameModal;