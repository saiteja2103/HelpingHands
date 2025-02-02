import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const Ngos = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users'); // Simulated API endpoint
        const ngosData = response.data.map(user => ({
          name: user.name,
          image: 'https://via.placeholder.com/150',
        }));
        setNgos(ngosData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch NGOs data');
        setLoading(false);
      }
    };

    fetchNgos();
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Our Supported NGOs</h2>
      <marquee behavior="scroll" direction="left" scrollamount="5">
        <Row>
          {ngos.map((ngo, index) => (
            <Col key={index} className="text-center mb-4">
              <img src={ngo.image} alt={ngo.name} className="img-fluid mb-2" />
              <h5>{ngo.name}</h5>
            </Col>
          ))}
        </Row>
      </marquee>
    </Container>
  );
};

export default Ngos;