import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/images/stop-hand-forbidden-icon-5.png";
import MainButton from "../../components/button/button";
import "./Unauthorized.css";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/user-login");
  };

  return (
    <div className="unauthorized-container">
      <img
        src={backgroundImage}
        alt="access-forbidden"
        className="unauthorized-image"
      />
      <h1 className="unauthorized-heading">Unauthorized</h1>
      <p className="unauthorized-message">
        401 - You don't have access to this page
      </p>
      <p className="unauthorized-description">
        This page is not publicly available.
      </p>
      <p className="unauthorized-description">
        To access it, you need to be an admin.
      </p>
      <MainButton
        name="Login"
        className="unauthorized-button"
        onClick={handleButtonClick}
        textColor="var(--secondary-color)"
      />
    </div>
  );
};

export default Unauthorized;
