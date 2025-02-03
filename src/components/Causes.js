import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FeaturedCauses = () => {
  const [causes, setCauses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCauses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/donations`);
        console.log('API response:', response.data); // Debug log

        // Adjust this based on your API response structure:
        // If your API response is an object with a "data" property that holds the array:
        // setCauses(response.data.data);
        // Otherwise, if it's directly an array:
        setCauses(response.data);
      } catch (error) {
        console.error('Error fetching causes:', error);
      }
    };

    fetchCauses();
  }, []);

  const handleDonate = (causeId) => {
    navigate(`/donate/${causeId}`);
  };

  return (
    <div className="causes py-5">
      <Container>
        <h2 className="text-center mb-4">Featured Causes</h2>
        <Row>
          {Array.isArray(causes) ? (
            causes.map((cause, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={cause.image} />
                  <Card.Body>
                    <Card.Title>{cause.title}</Card.Title>
                    <h5>Fundraising Progress</h5>
                    <div className="text-center mb-2" style={{ fontWeight: 'bold', color: '#007bff' }}>
                      ₹{cause.raisedAmount} of ₹{cause.goalAmount}
                    </div>
                    <ProgressBar 
                      now={(cause.raisedAmount / cause.goalAmount) * 100} 
                      variant="info" 
                      striped 
                      animated 
                      style={{ height: '20px', borderRadius: '10px' }}
                    />
                    <Card.Text className="mt-3">{cause.description}</Card.Text>
                    <Button variant="primary" onClick={() => handleDonate(cause._id)} style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>
                      Donate Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No causes available</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default FeaturedCauses;
