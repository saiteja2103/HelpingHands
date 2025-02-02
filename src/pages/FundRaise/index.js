import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/Auth';
import Header from '../../components/Header';
import Footer from '../../components/Footer'
import { storage } from '../../utils/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const FundRaise = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [goalAmount, setGoalAmount] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFundraise = async (e) => {
    e.preventDefault();
    if (!title || !goalAmount || goalAmount <= 0) {
      setMessage('Please provide valid information for your fundraiser.');
      return;
    }
    setMessage('');

    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress
        },
        (error) => {
          setMessage('An error occurred while uploading the image. Please try again.');
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          saveFundraiser(downloadURL);
        }
      );
    } else {
      saveFundraiser('');
    }
  };

  const saveFundraiser = async (imageUrl) => {
    const formData = {
      title,
      description,
      image: imageUrl,
      goalAmount,
      raisedAmount: 0,
      donator: auth.user._id,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/donations`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (response.data.success) {
        setSuccess('Your fundraiser has been created successfully!');
        setTitle('');
        setDescription('');
        setImage(null);
        setImagePreview(null);
        setGoalAmount('');
      } else {
        setMessage(response.data.message);
      }
    } catch (err) {
      setMessage('An error occurred while creating the fundraiser. Please try again.');
    }
  };

  return (
     <> 
    <Header />
    <div className="fundraise-bg">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md="6">
            <h2>Create a Fundraiser</h2>
            {message && <Alert variant="danger">{message}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            {imagePreview && (
              <div className="text-center mb-4">
                <img src={imagePreview} alt="Preview" className="img-fluid" />
              </div>
            )}
            <Form onSubmit={handleFundraise}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleImageChange}
                />
              </Form.Group>

              <Form.Group controlId="formGoalAmount">
                <Form.Label>Goal Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter goal amount"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Create Fundraiser
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
    <Footer></Footer>
    </>
  );
};

export default FundRaise;