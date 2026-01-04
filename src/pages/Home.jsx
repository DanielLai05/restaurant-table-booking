import React, { useContext, useState } from 'react'

import { Button, Col, Container, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import MakeReservationModal from '../components/MakeReservationModal';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);


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

      </Container>

      <MakeReservationModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}
