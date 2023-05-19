import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./testimonial.css";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      quote: "Donating books through this website has been an incredible experience. I'm glad to know that my books are making a difference in someone's life.",
    },
    {
      id: 2,
      name: "Jane Smith",
      quote: "I highly recommend this book donation initiative. It's a simple and effective way to contribute to education and empower students.",
    },
    {
      id: 3,
      name: "Mike Johnson",
      quote: "The impact of book donations is truly remarkable. It's inspiring to see how these resources can transform lives and open doors to knowledge.",
    },
  ];

  return (
    <div className="testimonial-section">
      <h2>What Our Donors Say</h2>
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        className="testimonial-carousel"
      >
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-item">
            <p>{testimonial.quote}</p>
            <p className="testimonial-name">{testimonial.name}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonials;
