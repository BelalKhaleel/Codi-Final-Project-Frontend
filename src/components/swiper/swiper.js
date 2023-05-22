import React from "react";
import "./swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import SwiperCore, { Autoplay } from "swiper";
import quotationmarks from "../../assets/images/quotation-mark.jpg";

SwiperCore.use([Autoplay]);

function HomeTestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      // position: "Event Planner",
      // company: "Event Solutions Inc.",
      testimonial:
        "Donating books through this website has been an incredible experience. I'm glad to know that my books are making a difference in someone's life.",
    },
    {
      id: 2,
      name: "Jane Smith",
      // position: "Lead Vocalist",
      // company: "The Beatmakers",
      testimonial:
        "The impact of book donations is truly remarkable. It's inspiring to see how these resources can transform lives and open doors to knowledge.",
    },
    {
      id: 3,
      name: "Mike Johnson",
      // position: "Event Manager",
      // company: "Rockin' Events",
      testimonial:
        "I highly recommend this book donation initiative. It's a simple and effective way to contribute to education and empower students.",
    },
    // {
    //   id: 4,
    //   name: "Michael Smith",
    //   // position: "Guitarist",
    //   // company: "The String Strummers",
    //   testimonial:
    //     "As a band, we've gained significant exposure and secured numerous gigs through Band Picker. The platform's visibility among event organizers is remarkable, and the support team is always available to assist. A must-have for any aspiring musician!",
    // },
  ];

  return (
    <>
      <div className="testimonial-section">
        <h2 className="testimonial-section-title">Testimonials</h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          // autoplay={{
          //   delay: 7000, // set autoplay time to 5 seconds
          //   disableOnInteraction: false, // autoplay will not stop on user interaction
          // }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
              slidesPerColumnFill: "row",
            },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="testimonial-card">
                {" "}
                <img
                  src={quotationmarks}
                  alt="annedece"
                  className="testimonial-img"
                  width={50}
                />
                <p className="testimonial-text">{testimonial.testimonial}</p>
                <hr className="testimonial-hr" />
                <div className="testimonial-author-section">
                  <div>
                    <h3 className="testimonial-author-name">
                      {testimonial.name}
                    </h3>
                    {/* <p className="testimonial-author-role">
                      {testimonial.position}, {testimonial.company}
                    </p> */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default HomeTestimonialSection;
