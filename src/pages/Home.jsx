import React, { useContext, useState } from 'react'

import { useNavigate } from 'react-router';
import { AuthContext } from '../context';
import { Button, Col, Container, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { auth } from '../firebase';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleLogout = () => {
    auth.signOut();
  }

  return (
    <div>
      <Container fluid className="d-flex flex-column justify-content-center align-items-center p-0 vh-100"
        style={{ background: "url('https://firebasestorage.googleapis.com/v0/b/restaurant-table-booking-a1302.firebasestorage.app/o/Gemini_Generated_Image_uzm3fsuzm3fsuzm3.png?alt=media&token=f1232b43-3fe2-4291-9ae9-ad38f25b1f67') center/cover no-repeat" }}>

        <h1 className='text-light d-inline-block'>Prime Cuts. Prime Moments.</h1>
        <Button
          variant='warning'
          size='lg'
          className='mt-2'
          onClick={() => handleShowModal()}
        >
          RESERVE A TABLE
        </Button>
        {/* <Button onClick={handleLogout}>Logout</Button> */}


      </Container>
      <footer className='bg-dark text-light text-center p-4'>
        <div>&copy; 2025 Jerome's Steakhouse. All rights reserved.</div>
        <div>📍 123 Premium Boulevard, Cyberjaya</div>
        <div>Open Monday - Saturday | 5:00 PM - 11:00 PM</div>
      </footer>

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
    </div>
  )
}
