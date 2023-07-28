import React from 'react'
import { Button, Modal } from 'react-bootstrap'



const PopupModal = ({ showModal, handleCloseModal, message }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>My Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message} {/* Render the passed message prop */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCloseModal}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopupModal
