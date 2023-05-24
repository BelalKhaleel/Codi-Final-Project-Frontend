import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import bookup from "../../assets/images/Bookup branding-32.svg";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [headerExpanded, setHeaderExpanded] = useState(
    // window.screen > 768 ? true : false
    true
  );
  return (
    <header className={headerExpanded ? "header " : "header header-collapsed"}>
      <button
        onClick={() => {
          setHeaderExpanded(!headerExpanded);
        }}
        className="toggle-menu"
      >
        <CloseIcon />
      </button>
      {/* <button
        onClick={() => {
          setHeaderExpanded(!headerExpanded);
        }}
      >
        <MenuIcon />
      </button> */}
      <div className="header-logo-container">
        <img src={bookup} alt="Logo" className="header-logo" />
      </div>
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
      <div className="header-nav-container">
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
