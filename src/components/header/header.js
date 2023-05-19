import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import bookup from "../../assets/images/Bookup branding-32.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo-container">
        <img src={bookup} alt="Logo" className="header-logo" />
      </div>
      <div className="header-nav-container">
        <nav className="header-nav">
          <ul className="header-nav-list">
            <li>
              <NavLink exact to="/" activeClassName="header-active-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/donate" activeClassName="header-active-link">
                Donate
              </NavLink>
            </li>
            <li>
              <NavLink to="/request" activeClassName="header-active-link">
                Request
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" activeClassName="header-active-link">
                Search
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" activeClassName="header-active-link">
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/terms" activeClassName="header-active-link">
                Terms and Services
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="header-login-button-container">
          <NavLink to="/user-login" className="header-login-button">
            Log In
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
