import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Tabs, Tab, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/Auth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import CarouselComponent from '../../components/CarouselComponent';
import FeaturedCauses from '../../components/Causes';
import '../../styles/DonationProfile.css';

const DonationProfile = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [donationhistories, setDonationhistories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/donators/me`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setDonations(response.data.donations || []);
        setDonationhistories(response.data.donationhistories || []);
        setName(response.data.user.name);
        setEmail(response.data.user.email);
      } catch (err) {
        console.error('Error fetching user details', err);
      }
    };

    fetchUserDetails();
  }, [auth, navigate]);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/donators/me`, {
        name,
        email,
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (response.data.success) {
        setSuccess('Profile updated successfully!');
        setEditMode(false);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred while updating the profile. Please try again.');
    }
  };

  return (
    <div className="donation-profile-bg">
      <Header />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md="8">
            <div className="tabs-container">
              <Tabs defaultActiveKey="profile" id="profile-tabs" className="mb-3">
                <Tab eventKey="profile" title="Profile">
                  <div className="tab-content">
                    <h4>Profile</h4>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    {editMode ? (
                      <Form onSubmit={handleEditProfile}>
                        <Form.Group controlId="formBasicName">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                          Save Changes
                        </Button>
                        <Button variant="secondary" onClick={() => setEditMode(false)} className="ml-2">
                          Cancel
                        </Button>
                      </Form>
                    ) : (
                      <div>
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <Button variant="primary" onClick={() => setEditMode(true)}>
                          Edit Profile
                        </Button>
                      </div>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="fundraises" title="My Fundraises">
                  <div className="tab-content">
                    <h4>Fundraise History</h4>
                    {donations.length > 0 ? (
                      <ListGroup variant="flush">
                        {donations.map((donation) => (
                          <ListGroup.Item key={donation._id} className="d-flex justify-content-between align-items-center">
                            <span>
                              <strong>{donation.title}</strong> <br />
                              <small>{new Date(donation.date).toLocaleDateString()}</small> <br />
                              <small>{donation.description}</small> <br />
                              <img src={donation.image} alt={donation.title} className="donation-image" />
                            </span>
                            <span>
                              Goal: ${donation.goalAmount} <br />
                              Raised: ${donation.raisedAmount}
                            </span>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    ) : (
                      <p>No fundraises made yet.</p>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="donations" title="My Donations">
                  <div className="tab-content">
                    <h4>Donation History</h4>
                    {donationhistories.length > 0 ? (
                      <ListGroup variant="flush">
                        {donationhistories.map((donation) => (
                          <ListGroup.Item key={donation._id} className="d-flex justify-content-between align-items-center">
                            <span>
                              <strong>Donation Title:</strong> {donation.title} <br />
                              <strong>Amount:</strong> ₹{donation.amount} <br />
                              <strong>Date:</strong> {new Date(donation.date).toLocaleDateString()} <br />
                              <strong>Message:</strong> {donation.message}
                            </span>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    ) : (
                      <p>No donations made yet.</p>
                    )}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Container>
      <Hero />
      <CarouselComponent />
      <FeaturedCauses />
      <Footer />
    </div>
  );
};

export default DonationProfile;