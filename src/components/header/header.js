import React, { useState, useContext } from "react";
import { isLoggedIn } from "../../App";
import { NavLink } from "react-router-dom";
import cookie from "react-cookies";
import "./header.css";
import bookup from "../../assets/images/Bookup branding-32.svg";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [loggedIn, setLoggedIn] = useContext(isLoggedIn);

  const handleLogout = () => {
    cookie.remove("user-token", { path: "/" });
    setLoggedIn(false);
  };

  return (
    <header className={headerExpanded ? "header" : "header header-collapsed"}>
          {headerExpanded && (
        <button
          onClick={() => {
            setHeaderExpanded(!headerExpanded);
          }}
          className="toggle-menu"
        >
          <CloseIcon className="menu-icon" />
        </button>
      )}
      {!headerExpanded && (
        <button
          onClick={() => {
            setHeaderExpanded(!headerExpanded);
          }}
          className="toggle-menu"
        >
          <MenuIcon className="menu-icon" />
        </button>
      )}
      <div className="header-logo-container">
        <img src={bookup} alt="Logo" className="header-logo" />
      </div>
      <nav className="header-nav">
        <ul className="header-nav-list">
          <li>
            <NavLink to="/" className="header-active-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/donate" className="header-active-link">
              Donate
            </NavLink>
          </li>
          <li>
            <NavLink to="/request" className="header-active-link">
              Request
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className="header-active-link">
              Search
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="header-active-link">
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/terms" className="header-active-link">
              Terms and Services
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="header-login-button-container">
        {loggedIn ? (
          <button className="header-logout-button" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <NavLink to="/user-login" className="header-login-button">
            Log In
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
