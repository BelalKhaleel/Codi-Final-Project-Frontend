import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import BackgroundImage from "../../assets/images/book-donation.webp";

function HomePage() {
  return (
    <div>
      <img
        src={BackgroundImage}
        alt="Background"
        className="homepage-background-image"
      />
      <div className="homepage-hero-container">
        <h1 className="homepage-headline">
          Unlock the Power of Books: Donate, Empower, Inspire!
        </h1>
        <Link to="/donate">
          <button className="homepage-backgroundimage-button">
            Donate Now
          </button>
        </Link>
      </div>
      <div className="homepage-about-section">
        <h2>About Our Book Donation Initiative</h2>
        <p>
          Our mission is to support university students in Lebanon by providing
          them with access to educational resources through book donations. We
          believe that every student deserves the opportunity to pursue their
          education and achieve their goals, regardless of their financial
          circumstances.
        </p>
        <p>
          By donating your books, you can make a meaningful impact on the lives
          of these students. Your generosity will help them overcome the
          barriers they face in acquiring the necessary textbooks and learning
          materials, enabling them to excel academically and broaden their
          knowledge.
        </p>
        <p>
          When you donate books through our website, you empower students to
          unlock their full potential and inspire them to pursue their dreams.
          Your contribution not only provides them with valuable resources but
          also sends a powerful message of solidarity and support.
        </p>
        <p>
          Join us in making a difference. Together, we can create a brighter
          future for university students in Lebanon. Donate your books today and
          be a part of their educational journey.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
