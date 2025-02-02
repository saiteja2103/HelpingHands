import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
// import "./ContactUs.css";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple form validation
    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }

    // Simulate form submission (you can replace this with actual API call)
    setIsSubmitted(true);
    setError(null);

    // Reset form fields after submission
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Contact Us</h2>

      <Row>
        <Col md={6}>
          <h3>We're here to help</h3>
          <p>
            Have any questions or need support? Fill out the form below, and we will get back to you as soon as possible.
          </p>
        </Col>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            {isSubmitted && (
              <Alert variant="success" className="mb-3">
                Your message has been sent successfully!
              </Alert>
            )}

            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}

            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
