import React, { useContext, useState } from "react";

import { mainNavbarItems } from "./navbarItems";

import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import "./style.css";
import AccountRoundedIcon from "@mui/icons-material/AccountCircle";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Cookies from "js-cookie";
import cookie from "react-cookies";
import { isLoggedIn } from "../../App";

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(true);
  const [loggedIn, setLoggedIn] = useContext(isLoggedIn)

  const close = () => {
    document.querySelector(".sidebar").classList.toggle("close");
    if (isClosed === true) {
      setIsClosed(false);
    } else {
      setIsClosed(true);
    }
  };

  let activeStyle = {
    backgroundColor: "var(--secondary-color)",
    color: "var(--accent-color)",
  };

  return (
    <div className="sidebar close">
      <div className="sidebar-admin-profile spacing">
        <p>
          <AccountRoundedIcon />
        </p>
        <p className="sidebar-hide">
          {localStorage.getItem("admin-full-name")} <br />
          {localStorage.getItem("admin-email")}
        </p>
        {/* <img src={logo} alt="RMZNA-logo" width="100%" height="100%" /> */}
      </div>
      <span onClick={close} className="sidebar-close-btn toggle">
        <KeyboardArrowLeftRoundedIcon />
      </span>
      <nav className="sidebar-nav">
        {mainNavbarItems.map((item, index) => {
          return (
            <Tooltip
              key={item.id}
              title={isClosed ? item.label : ""}
              placement="right"
            >
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                to={item.route}
                key={item.id}
                onClick={!isClosed ? close : ""}
                className="sidebar-links spacing hover"
              >
                <p>{item.icon}</p>
                <p className="sidebar-nav-text sidebar-hide">{item.label}</p>
              </NavLink>
            </Tooltip>
          );
        })}
      </nav>
      <nav className="sidebar-bottom-nav">
        <Tooltip title={isClosed ? "Log Out" : ""} placement="right">
          <NavLink
            to="/user-login"
            className="sidebar-logout spacing hover"
            onClick={() => {
              cookie.remove("user-token", {path : "/"});
              setLoggedIn(false);
            }}
          >
            <p>
              <LogoutRoundedIcon />
            </p>
            <p className="sidebar-hide">Logout</p>
          </NavLink>
        </Tooltip>
      </nav>
    </div>
  );
};

export default Sidebar;
