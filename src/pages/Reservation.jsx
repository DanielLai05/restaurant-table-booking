import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context";
import { Container, Card, Row, Col, Spinner, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteReservaiton, fetchReservationsByUser } from "../features/reservation/reservationsSlice";

export default function Reservation() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const { reservations } = useSelector(store => store.reservations);
  const { loading } = useSelector(store => store.reservations);
  const { userDetails, currentUser, authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate('/');
    } else if (currentUser) {
      dispatch(fetchReservationsByUser(userDetails.id));
    }

  }, [currentUser, navigate, dispatch, userDetails, authLoading]);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (id) => {
    setSelectedReservationId(id);
    setShowDeleteModal(true);

  };

  const handleDeleteReservation = () => {
    dispatch(deleteReservaiton(selectedReservationId));
    handleCloseDeleteModal();
  }


  // show title

  return (
    <Container className="py-4">
      <h2 className="mb-4">
        {userDetails?.name}'s Reservation History
      </h2>

      {
        loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Row className="g-4">
            {reservations && reservations.map((reservation, index) => (
              <Col md={6} key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      Reservation #{reservation.id}
                    </Card.Title>

                    <Card.Text>
                      <strong>Date:</strong>{" "}
                      {new Date(reservation.date).toLocaleString()}
                    </Card.Text>

                    <Card.Text>
                      <strong>Guests:</strong>{" "}
                      {reservation.number_of_guest}
                    </Card.Text>

                    <Card.Text>
                      <strong>Name:</strong>{" "}
                      {reservation.full_name}
                    </Card.Text>

                    <Card.Text>
                      <strong>Email:</strong>{" "}
                      {reservation.email}
                    </Card.Text>

                    <Card.Text>
                      <strong>Phone:</strong>{" "}
                      {reservation.phone_number}
                    </Card.Text>

                    <Card.Text>
                      <strong>Description:</strong>{" "}
                      {reservation.description}
                    </Card.Text>

                    <Button variant="primary" className="me-2" onClick={() => navigate(`/reservation/${reservation.id}`)}>UPDATE</Button>
                    <Button variant="danger" onClick={() => handleShowDeleteModal(reservation.id)}>DELETE</Button>

                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )
      }
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this reservation</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            CANCEL
          </Button>
          <Button variant="danger" onClick={handleDeleteReservation}>
            DELETE
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
