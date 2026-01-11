import React, { useContext, useEffect, useState } from 'react'
import { FloatingLabel, Form, Modal, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createReservation, resetReservationState } from '../features/reservation/reservationsSlice';


export default function MakeReservationModal({ showModal, setShowModal }) {

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [numberOfGuest, setNumberOfGuest] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const { currentUser, userDetails } = useContext(AuthContext);
  const { loading, success, error } = useSelector(state => state.reservations);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetForm = () => {
    setDate('');
    setTime('');
    setNumberOfGuest(1);
    setTitle('');
    setDescription('');
    setFullName('');
    setEmail('');
    setPhoneNumber('');
  };

  const handleCloseModal = () => {
    dispatch(resetReservationState());
    setShowModal(false);
    setShowAlert(false);
  };

  useEffect(() => {
    if (success) {
      setShowAlert(true);
      resetForm();
    }
  }, [success])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReservation({ date, time, numberOfGuest, title, description, fullName, email, phoneNumber, userId: userDetails.id }));
  }

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      {
        currentUser ? (
          <>
            <Form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>MAKE A RESERVATION</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Date
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Time
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2">
                  <FloatingLabel label="Number of Guest" className="mb-3">
                    <Form.Control
                      type="number"
                      value={numberOfGuest}
                      onChange={(e) => setNumberOfGuest(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mt-2">
                  <FloatingLabel label="Title" className="mb-3">
                    <Form.Control
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Jerome Party"
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mt-2">
                  <FloatingLabel label="Description" className="mb-3">
                    <Form.Control
                      as='textarea'
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Jerome Birthday party"
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mt-2">
                  <FloatingLabel label="Full Name" className="mb-3">
                    <Form.Control
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jerome Hehe"
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mt-2">
                  <FloatingLabel label="Email address" className="mb-3">
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mt-2">
                  <FloatingLabel label="Phone number" className="mb-3">
                    <Form.Control
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="011123456789"
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                {
                  error && !loading &&
                  <Alert variant='danger' dismissible>
                    An error occour. Please try again later.
                  </Alert>
                }

                {
                  showAlert && !error &&
                  < Alert variant='success' onClose={() => setShowAlert(false)} dismissible>
                    Congratulation! Your reservation has been confirm.
                  </Alert>

                }

              </Modal.Body>

              <Modal.Footer className="d-flex justify-content-center">
                <Button variant="warning" type="submit">
                  {
                    loading ? (
                      <Spinner animation="border" role="status" size='sm'>
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) :
                      'CONFIRM RESERVATION'
                  }
                </Button>
              </Modal.Footer>
            </Form>

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
    </Modal >
  )
}
