import React from "react";
import "./footer.css";
import bookup from "../../assets/images/Bookup branding-32.svg";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-logo">
            <img src={bookup} alt="Logo" />
          </div>
          <div className="footer-responsive-top-side">
            <div className="footer-links">
              <h3>Navigation</h3>
              <NavLink exact to="/" className="footer-link">
                Home
              </NavLink>
              <NavLink to="/#about-section" className="footer-link">
                About Us
              </NavLink>
              <NavLink to="contact" className="footer-link">
                Contact Us
              </NavLink>
            </div>

            <div className="footer-books">
              <h3>Books</h3>
              <ul>
                <li>
                  <NavLink to="/donate" className="footer-link">
                    Donate
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/request" className="footer-link">
                    Request
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/search" className="footer-link">
                    Search
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="footer-other-book-donation-websites">
              <h3>Other Book Donation Sites</h3>
              <ul>
                <li>
                  <a href="https://alphabeticalorder.org/en/" className="footer-link">
                  alphabeticalorder.org
                  </a>
                </li>
                <li>
                  <a href="https://assabil.com/book-donations/#:~:text=ASSABIL%20Distributes%20books%20received%20through,public%20libraries%20and%20public%20schools." className="footer-link">
                    ASSABIL Association
                  </a>
                </li>
                <li>
                  <a href="https://mtlebanonlibrary.org/265/Donate" className="footer-link">
                    Mt. Lebanon Public Library
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Bookup. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
