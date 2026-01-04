import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context";
import { Container, Card, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservationsByUser } from "../features/reservation/reservationsSlice";

export default function Reservation() {
  const { reservations } = useSelector(store => store.reservations);
  const { loading } = useSelector(store => store.reservations);
  const { userDetails, currentUser, authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate('/');
    } else if (currentUser) {
      dispatch(fetchReservationsByUser(2));
    }

  }, [currentUser, navigate, dispatch, userDetails, authLoading]);

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
            {reservations.map((reservation, index) => (
              <Col md={6} key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      Reservation #{index + 1}
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
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )
      }

    </Container>
  );
}
