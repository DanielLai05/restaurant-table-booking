import React, { useContext, useState } from 'react'
import { FloatingLabel, Form, Modal, Row, Col, Button } from 'react-bootstrap';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router';


export default function MakeReservationModal({ showModal, setShowModal }) {

  const [date, setDate] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleCloseModal = () => setShowModal(false);

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      {
        currentUser ? (
          <>
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
                      value={date}
                      onChange={(e) => console.log(e.target.value)}
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
                      onChange={(e) => console.log(e.target.value)}
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
                    label="Title"
                    className="mb-3"
                  >
                    <Form.Control type="text" placeholder="Jerome Party" />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className='mt-2'>
                  <FloatingLabel
                    label="Description"
                    className="mb-3"
                  >
                    <Form.Control type="text" placeholder="Jerome Birthday party" />
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
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Please Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>Please Login to Make Reservation</Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
              <Button variant="warning" onClick={() => navigate('/login')}>
                Login
              </Button>
            </Modal.Footer>
          </>
        )
      }
    </Modal>
  )
}
