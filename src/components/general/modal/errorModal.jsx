import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import "./indexModal.css"

export default class ErrorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal : false,
      showModal : true
    }
  }

  handleShowModal = () => {
    let showModal = this.state;
    this.setState({showModal : true})
  }

  render() {
    const {handleShowErrorModal, showErrorModal,errorMessage} = this.props;
    return (
      <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal className='modalContent' size="sm" show={showErrorModal} onHide={handleShowErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title><p className='modalTitle'>Confirmation</p></Modal.Title>
        </Modal.Header>
        <Modal.Body><p className='modalBody'>{errorMessage}</p></Modal.Body>
        <div>
        <Modal.Footer 
         style={{
          display: "flex",
          justifyContent: "center",
        }}
        size="sm">
          <Button size="sm" variant="warning" onClick={handleShowErrorModal}>
            Ubah
          </Button>
        </Modal.Footer>
        </div>
      </Modal>
    </div>
    )
  }
}
