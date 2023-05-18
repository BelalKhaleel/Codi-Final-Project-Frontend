import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import logo from "../../assets/images/Bookup branding-32.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="nav-container">
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <NavLink exact to="/" activeClassName="active-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/donate" activeClassName="active-link">
                Donate
              </NavLink>
            </li>
            <li>
              <NavLink to="/request" activeClassName="active-link">
                Request
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" activeClassName="active-link">
                Search
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" activeClassName="active-link">
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/terms" activeClassName="active-link">
                Terms and Services
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="login-button-container">
          <NavLink to="/user-login" className="login-button">
            Log In
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
