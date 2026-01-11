import React from 'react'
import { Container, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function UpdateReservation() {
  const data = useSelector((store) => store.reservations.reservations)
  const splitedDate = data[0].date.split('T1');


  return (
    <Container className='mt-3'>
      <Form>

        <Form.Group className='mb-3'>
          <Form.Label>Date</Form.Label>
          <Form.Control type='date' />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Time</Form.Label>
          <Form.Control type='time' />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Number of Guests</Form.Label>
          <Form.Control type='number' min='1' />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' placeholder='Reservation title' />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Additional notes or requests'
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Full Name</Form.Label>
          <Form.Control type='text' placeholder='Enter full name' />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' placeholder='Enter email' />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type='tel' placeholder='Enter phone number' />
        </Form.Group>

      </Form>
    </Container>
  )
}
