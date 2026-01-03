import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Reservation() {
  const { userDetails, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const reservations = [
    {
      date: "2025-12-11T13:20:00+08:00",
      number_of_guest: 5,
      full_name: "Jerome",
      email: "jerome@mail.com",
      phone_number: "01117930881",
      description: "Birthday Party",
      user_id: 1,
    },
    {
      date: "2025-12-20T19:00:00+08:00",
      number_of_guest: 2,
      full_name: "Jerome",
      email: "jerome@mail.com",
      phone_number: "01117930881",
      description: "Anniversary Dinner",
      user_id: 1,
    },
  ];


  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return (
    <Container className="py-4">
      <h2 className="mb-4">
        {userDetails?.name}'s Reservation History
      </h2>

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
    </Container>
  );
}
