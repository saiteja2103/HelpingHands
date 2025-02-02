import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../Context/Auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDonateClick = () => {
    if (auth.isAuthenticated) {
      navigate('/causes');
    } else {
      navigate('/login');
    }
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">DonateNow</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/causes">Causes</Nav.Link>
            <Nav.Link href="/testimonials">Testimonials</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            {auth.isAuthenticated && auth.user && (
              <Nav.Link href="/myprofile">My Profile ({auth.user.name})</Nav.Link>
            )}
            <Button variant="primary" onClick={handleDonateClick} className="ms-2">
              Donate Now
            </Button>
            {auth.isAuthenticated ? (
              <Button variant="outline-primary" onClick={handleLogout} className="ms-2">
                Logout
              </Button>
            ) : (
              <>
                <Button variant="outline-primary" href="/login" className="ms-2">
                  Login
                </Button>
                <Button variant="outline-primary" href="/signup" className="ms-2">
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;