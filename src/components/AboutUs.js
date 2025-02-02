import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
// import "./..styles/Aboutus.css";

const AboutUs = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">About Us</h2>
      <Row className="mb-5">
        <Col md={6}>
          <Image
            src="./assests/page-header.jpg"
            alt="About Us"
            fluid
            className="about-image"
          />
        </Col>
        <Col md={6}>
          <h3>Our Mission</h3>
          <p>
            At <strong>DonateNow</strong>, our mission is to connect compassionate individuals and organizations with
            life-changing causes. We aim to provide a transparent and user-friendly platform for people to donate to
            trusted NGOs, fundraisers, and charitable projects across the globe.
          </p>
          <p>
            We believe that together we can make the world a better place, one donation at a time. Our platform simplifies
            the donation process and ensures that your generosity goes directly to those in need.
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <h3>Our Vision</h3>
          <p>
            We envision a world where every person has the opportunity to contribute to meaningful causes. Through our
            platform, we want to make it easier than ever for individuals to support projects that matter to them.
          </p>
          <p>
            Whether it’s funding clean water projects in developing countries, supporting education for underprivileged
            children, or providing disaster relief — we are committed to making these goals a reality.
          </p>
        </Col>
      </Row>

      <Row className="mt-5 text-center">
        <Col>
          <Button variant="primary" href="#donate" size="lg">
            Donate Now
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
