import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import {
  fetchReservationsByUser,
  resetReservationState,
  updateReservation
} from '../features/reservation/reservationsSlice';
import { AuthContext } from '../context';

export default function UpdateReservation() {
  const { id } = useParams();
  const reservationId = parseInt(id);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [numberOfGuest, setNumberOfGuests] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { userDetails, authLoading, currentUser } = useContext(AuthContext);
  const { reservations, loading, success, error } = useSelector(
    (store) => store.reservations
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate('/');
    } else if (userDetails?.id) {
      dispatch(fetchReservationsByUser(userDetails.id));
    }
  }, [dispatch, userDetails, authLoading, currentUser, navigate]);

  const currentReservation = reservations.find(
    (r) => r.id === reservationId
  );

  useEffect(() => {
    if (currentReservation) {
      const localDate = new Date(currentReservation.date);

      setDate(localDate.toISOString().split('T')[0]);
      setTime(
        localDate.toLocaleTimeString('ms-MY', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
      );
      setNumberOfGuests(currentReservation.number_of_guest || '');
      setTitle(currentReservation.title || '');
      setDescription(currentReservation.description || '');
      setFullName(currentReservation.full_name || '');
      setEmail(currentReservation.email || '');
      setPhoneNumber(currentReservation.phone_number || '');
    }
  }, [currentReservation]);

  useEffect(() => {
    dispatch(resetReservationState());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const localDateTime = new Date(`${date}T${time}`);
    const utcDate = localDateTime.toISOString();

    dispatch(
      updateReservation({
        id: currentReservation.id,
        date: utcDate,
        numberOfGuest,
        title,
        description,
        fullName,
        email,
        phoneNumber,
        userId: userDetails.id
      })
    );
  };

  return (
    <Container className="my-3">
      <h2>Reservation #{currentReservation?.id}</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Guests</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={numberOfGuest}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>

        {error && !loading && (
          <Alert variant="danger">
            An error occurred. Please try again later.
          </Alert>
        )}

        {!loading && !success && (
          <Button
            variant="secondary"
            className="mt-2 mb-2 w-100"
            onClick={() => navigate('/reservation')}
          >
            CANCEL
          </Button>
        )}

        {success && !loading ? (
          <Alert variant="success" className="text-center">
            <Alert.Heading>Success</Alert.Heading>
            <p>Your reservation has been updated</p>
            <Button
              variant="outline-success"
              onClick={() => navigate('/reservation')}
            >
              Back to View Reservation
            </Button>
          </Alert>
        ) : (
          <Button type="submit" className="w-100">
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
              />
            ) : (
              'UPDATE'
            )}
          </Button>
        )}
      </Form>
    </Container>
  );
}
