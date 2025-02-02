import React from "react";
import { Carousel } from "react-bootstrap";
import "./../styles/CarouselComponent.css";


const CarouselComponent = () => {
  const slides = [
    {
      id: 1,
      image: "../assests/carousel-1.jpg",
      title: "Support a Cause",
      description: "Join us in making the world a better place.",
    },
    {
      id: 2,
      image: "../assests/carousel-2.jpg",
      title: "Make an Impact",
      description: "Every contribution counts towards a brighter future.",
    },
    {
      id: 3,
      image: "../assests/carousel-3.jpg",
      title: "Be a Volunteer",
      description: "Your time can change lives and bring smiles.",
    },
  ];

  return (
    <Carousel
      nextIcon={
        <span className="custom-control next" aria-hidden="true">
          &gt;
        </span>
      }
      prevIcon={
        <span className="custom-control prev" aria-hidden="true">
          &lt;
        </span>
      }
    >
      {slides.map((slide) => (
        <Carousel.Item key={slide.id}>
          <img
            className="d-block w-100"
            src={slide.image}
            alt={slide.title}
          />
          <Carousel.Caption>
            <h3>{slide.title}</h3>
            <p>{slide.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
