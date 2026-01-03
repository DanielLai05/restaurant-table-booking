import { useContext } from 'react';
import { Button, Dropdown, NavDropdown, NavItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useNavigate } from 'react-router';
import { AuthContext } from '../context';
import { auth } from '../firebase';

function NavigationBar() {
  const isLogin = useContext(AuthContext).currentUser;
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut();
  }
  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container className='p-1'>
          <Navbar.Brand href="/">Jerome's Steakhouse</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse >
            <Nav className="me-auto">
              <Nav.Link href="/menu" >MENU</Nav.Link>
              <Nav.Link href="/" >ABOUT US</Nav.Link>
              {
                isLogin && (
                  <>
                    <Nav.Link className='d-lg-none'>View Reservation</Nav.Link>
                    <Nav.Link className='d-lg-none text-warning'>Logout</Nav.Link>
                  </>
                )
              }
            </Nav>

            <Nav bg="dark" data-bs-theme="dark">
              {
                isLogin ?
                  <NavDropdown title={<i className="bi bi-person-circle "></i>} align="end" className='d-none d-lg-inline'>
                    <NavDropdown.Item onClick={() => navigate('/reservations')}>
                      View Reservation
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout} className='text-warning'>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  :
                  <Nav.Link href="/login" className=' text-warning'>LOGIN</Nav.Link>
              }

            </Nav>


          </Navbar.Collapse>


        </Container>
      </Navbar>
      <Outlet />
      <footer className='bg-dark text-light text-center p-4'>
        <div>&copy; 2025 Jerome's Steakhouse. All rights reserved.</div>
        <div>📍 123 Premium Boulevard, Cyberjaya</div>
        <div>Open Monday - Saturday | 5:00 PM - 11:00 PM</div>
      </footer>
    </>
  );
}

export default NavigationBar;