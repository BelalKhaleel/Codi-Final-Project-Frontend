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
              <a href="#about-section" className="footer-link">
                About Us
              </a>
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
