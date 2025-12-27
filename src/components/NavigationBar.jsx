import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useNavigate } from 'react-router';
import { AuthContext } from '../context';

function NavigationBar() {
  const isLogin = useContext(AuthContext).currentUser;
  const navigate = useNavigate();
  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container className='p-1'>
          <Navbar.Brand href="/">Jerome's Steakhouse</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" >MENU</Nav.Link>
              <Nav.Link href="#link" >ABOUT US</Nav.Link>
              <Nav.Link href="#link" >GALLERY</Nav.Link>
              <Nav.Link href="#link" >CONTACT</Nav.Link>
            </Nav>
            <Nav>
              {
                isLogin ?
                  <Nav.Link href="/reservation/book" className='d-lg-none text-warning'>BOOK RESERVATION</Nav.Link> :
                  <Nav.Link href="/login" className='d-lg-none text-warning'>LOGIN</Nav.Link>
              }

            </Nav>
          </Navbar.Collapse>
          {
            isLogin ?
              <Button
                variant="warning"
                className='d-none d-lg-inline'
              >
                Book Reservation
              </Button> :
              <Button
                variant="warning"
                className='d-none d-lg-inline'
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
          }

        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default NavigationBar;