import React from 'react'
import { FloatingLabel, Form, Modal, Row, Col, Button } from 'react-bootstrap';


export default function MakeReservationModal({ showModal, setShowModal }) {

  const handleCloseModal = () => setShowModal(false);
  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>MAKE A RESERVATION</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3" >
            <Form.Label column sm="2">
              Date
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type='date'
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" >
            <Form.Label column sm="2">
              Time
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type='time'

              />
            </Col>
          </Form.Group>



          <Form.Group className='mt-2'>
            <FloatingLabel
              label="Number of Guest"
              className="mb-3"
            >
              <Form.Control type="number" />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='mt-2'>
            <FloatingLabel
              label="Full Name"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Jerome Hehe" />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='mt-2'>
            <FloatingLabel
              label="Email address"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='mt-2'>
            <FloatingLabel
              label="Phone number"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="011123456789" />
            </FloatingLabel>
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-center'>

        <Button variant="warning" onClick={handleCloseModal}>
          CONFIRM RESERVATION
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
