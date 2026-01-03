import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <h1 className="text-warning">404</h1>
      <h2 className="mb-3">Page Not Found</h2>
      <p className="text-muted mb-4 col-10 col-md-6">
        The page you are trying to access does not exist or has been moved.
      </p>
      <Button variant="warning" size="lg" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </Container>
  )
}
