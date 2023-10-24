import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import "./indexModal.css"

export default class indexModal extends Component {
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
    const {handleShowModal, showModal, confirmRegist} = this.props;
    return (
      <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal className='modalContent' size="sm" show={showModal} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title><p className='modalTitle'>Confirmation</p></Modal.Title>
        </Modal.Header>
        <Modal.Body> <p className='modalBody'>Apakah data yang dimasukkan sudah benar?</p></Modal.Body>
        <div>
        <Modal.Footer 
         style={{
          display: "flex",
          justifyContent: "center",
        }}
        size="sm">
          <Button size="sm" variant="danger" onClick={handleShowModal}>
            Cancel
          </Button>
          <Button size="sm" variant="primary" onClick={confirmRegist}>
            Save
          </Button>
        </Modal.Footer>
        </div>
      </Modal>
    </div>
    )
  }
}
