import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const PaymentDetails = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const donationId = queryParams.get('donationId');
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/payments/${orderId}?donationId=${donationId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (isMounted) {
          setOrderDetails(response.data.orderDetails);
          console.log(response.data.orderDetails);

          // Update the raised amount
          await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/update-raised-amount`, {
            donationId: donationId,
            amount: response.data.orderDetails.order_amount,
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching order details:", err.response ? err.response.data : err.message);
          setError("Failed to fetch order details. Please try again.");
        }
      }
    };

    fetchOrderDetails();

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, [orderId, donationId]);

  if (error) {
    return <Container className="payment-details"><Alert variant="danger"><FaTimesCircle /> {error}</Alert></Container>;
  }

  if (!orderDetails) {
    return <Container className="payment-details"><p>Loading...</p></Container>;
  }

  return (
    <Container className="payment-details py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="text-center mb-4">
                {orderDetails.payment_status === 'SUCCESS' ? (
                  <FaCheckCircle className="text-success" size={50} />
                ) : (
                  <FaTimesCircle className="text-danger" size={50} />
                )}
              </div>
              <h4 className="text-center mb-4">Payment Details</h4>
              <p><strong>Order ID:</strong> {orderDetails.order_id}</p>
              <p><strong>Amount:</strong> ₹{orderDetails.order_amount}</p>
              <p><strong>Payment ID:</strong> {orderDetails.cf_payment_id}</p>
              <p><strong>Payment Time:</strong> {orderDetails.payment_time}</p>
              <p><strong>Payment Method:</strong> {orderDetails.payment_method?.upi?.upi_id || "N/A"}</p>
              <p><strong>Payment Status:</strong> {orderDetails.payment_status}</p>
              <p><strong>Bank Reference:</strong> {orderDetails.bank_reference}</p>
              <p><strong>Gateway Name:</strong> {orderDetails.payment_gateway_details.gateway_name}</p>
              <p><strong>Gateway Payment ID:</strong> {orderDetails.payment_gateway_details.gateway_payment_id}</p>
              <p><strong>Message:</strong> {orderDetails.payment_message}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentDetails;
