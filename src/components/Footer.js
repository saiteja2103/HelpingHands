import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>DonateNow</h5>
            <p>Making the world a better place through collective efforts.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <a href="#" className="text-light me-3">Privacy Policy</a>
            <a href="#" className="text-light">Terms of Service</a>
          </Col>
        </Row>
        <hr />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} DonateNow. All Rights Reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
