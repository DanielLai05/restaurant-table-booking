import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Outlet, useNavigate, Link } from "react-router";
import { AuthContext } from "../context";
import { auth } from "../firebase";

function NavigationBar() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container className="p-1">
          <Navbar.Brand as={Link} to="/">
            Jerome&apos;s Steakhouse
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                HOME
              </Nav.Link>
              <Nav.Link as={Link} to="/menu">
                MENU
              </Nav.Link>
              {currentUser && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/reservation"
                    className="d-lg-none"
                  >
                    VIEW RESERVATION
                  </Nav.Link>

                  <Nav.Link
                    className="d-lg-none text-warning"
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </Nav.Link>
                </>
              )}
            </Nav>

            <Nav>
              {currentUser ? (
                <NavDropdown
                  title={<i className="bi bi-person-circle"></i>}
                  align="end"
                  className="d-none d-lg-inline"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/reservation"
                  >
                    View Reservation
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item
                    onClick={handleLogout}
                    className="text-warning"
                  >
                    LOGOUT
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="text-warning"
                >
                  LOGIN
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="flex-grow-1">
        <Outlet />
      </div>

      <footer className="bg-dark text-light text-center p-4">
        <div>&copy; 2025 Jerome&apos;s Steakhouse. All rights reserved.</div>
        <div>📍 123 Premium Boulevard, Cyberjaya</div>
        <div>Open Monday - Saturday | 5:00 PM - 11:00 PM</div>
      </footer>
    </div>
  );
}

export default NavigationBar;
