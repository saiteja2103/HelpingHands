import React from "react";
import { Carousel, Container } from "react-bootstrap";
// import "./Testimonials.css";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      message:
        "DonateNow helped me easily find and contribute to a cause that was close to my heart. The platform is transparent and trustworthy.",
      image: "https://via.placeholder.com/100x100",
      designation: "Donor",
    },
    {
      name: "Jane Smith",
      message:
        "As an NGO, we are incredibly grateful to have found DonateNow. It has connected us to numerous donors, helping us fund vital projects.",
      image: "https://via.placeholder.com/100x100",
      designation: "NGO Leader",
    },
    {
      name: "David Wilson",
      message:
        "I had the chance to participate in a fundraising event hosted on DonateNow. It was well-organized and impactful. I would highly recommend it!",
      image: "https://via.placeholder.com/100x100",
      designation: "Fundraiser",
    },
  ];

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">What Our Users Say</h2>
      <Carousel>
        {testimonials.map((testimonial, index) => (
          <Carousel.Item key={index}>
            <div className="testimonial-item text-center">
              <img
                src={testimonial.image}
                alt={`${testimonial.name} photo`}
                className="testimonial-image"
              />
              <h4>{testimonial.name}</h4>
              <p className="designation">{testimonial.designation}</p>
              <p className="message">"{testimonial.message}"</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Testimonials;
