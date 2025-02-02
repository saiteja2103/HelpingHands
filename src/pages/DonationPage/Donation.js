import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";

const PaymentStatus = ({ success, error }) => (
  <>
    {error && <Alert variant="danger">{error}</Alert>}
    {success && <Alert variant="success">{success}</Alert>}
  </>
);

const Donation = () => {
  const { causeId } = useParams();
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [orderId, setOrderId] = useState("");

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }
    setError("");
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/payments`, {
        order_amount: parseFloat(amount),
        phone,
        donationId: causeId, // Pass the donation ID
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      });
      setSessionId(response.data.payment_session_id);
      setOrderId(response.data.order_id);
      const cashfree = await load({ mode: "sandbox" });
      let checkoutOptions = {
        paymentSessionId: response.data.payment_session_id,
        returnUrl: `${window.location.origin}/paymentdetails/${response.data.order_id}?donationId=${causeId}`,
      };
      cashfree.checkout(checkoutOptions).then(async function (result) {
        if (result.error) {
          alert(result.error.message);
        }
        if (result.redirect) {
          console.log("Redirection");
        }
        // console.log(result);

        // Check payment status
        const statusResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/payments/${response.data.order_id}?donationId=${causeId}`, {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the request headers
          }
        });
        if (statusResponse.data.success) {
          setSuccess("Thank you for your generous donation! The raised fund has been updated.");
        } else {
          setError("Payment not successful. Please try again.");
        }
      });
    } catch (err) {
      console.error("Error in handleDonate:", err.response ? err.response.data : err.message);
      setError("An error occurred while processing the donation. Please try again.");
    }
  };

  return (
    <div className="donation-bg">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6} className="donation-form bg-transparent p-4 rounded shadow">
            <h2 className="text-center mb-4">Make a Donation</h2>
            <PaymentStatus success={success} error={error} />
            <Form onSubmit={handleDonate}>
              <Form.Group className="mb-3" controlId="formAmount">
                <Form.Label>Donation Amount (₹)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Message (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Leave a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Donate Now
              </Button>
            </Form>
            <div id="drop_in_container"></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Donation;
