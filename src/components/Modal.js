import React from 'react'
import { Button, Modal } from 'react-bootstrap'


const PopupModal = (props) => {
  const { title, showModal, handleCloseModal, data, saveButtonAction } = props

  return (
    <Modal show={showModal} onHide={handleCloseModal}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data} {/* Render the passed data prop */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={(e) => {
          e.stopPropagation()
          saveButtonAction(true)
        }}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopupModal
