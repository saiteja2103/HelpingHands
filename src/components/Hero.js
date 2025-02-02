import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Auth";

const HeroSection = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const handleDonateClick = () => {
    if (auth.isAuthenticated) {
      navigate('/causes');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="hero bg-light text-center py-5">
      <Container>
        <Row>
          <Col md={6} className="text-md-start">
            <h1 className="display-4">Make a Difference Today</h1>
            <p className="lead">Your donation can change lives and bring hope to those in need.</p>
            <Button variant="primary" size="lg" className="me-2" onClick={handleDonateClick}>Donate Now</Button>
            <Button variant="outline-secondary" size="lg" onClick={() => navigate('/fundraise')}>Start a Fundraiser</Button>
          </Col>
          <Col md={6}>
            <img src="./assests/signup_bg.png" alt="Helping hands" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;
