import React from "react";
import { useState } from "react";
import "./BookCards.css";

export default function Card(props) {
  const [isShowing, setIsShowing] = useState(false);
  const [zIndex, setZIndex] = useState(2);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (isShowing) {
      setIsShowing(false);
      if (zIndex > 1) {
        setZIndex(1);
      }
    } else {
      setIsShowing(true);
      setZIndex(zIndex + 1);
    }
  };

  const handleHover = (value) => {
    setIsHovered(value);
  };

  return (
    <>
      <div className={`card${isShowing ? " show" : ""}`} style={{ zIndex }}>
        <div className="cardimage-holder">
          <img
            className="cardimage"
            src={`${process.env.REACT_APP_API_URL}/${props.image}`}
            alt="book"
          />
        </div>
        <div className="card-title">
          <div
            className={`toggle-info-container${isHovered ? " hovered" : ""}`}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
          >
            <button
              href="#"
              className="toggle-info btn"
              onClick={() => {
                handleClick();
                props.handleCardsClick();
              }}
            >
              <span className="left"></span>
              <span className="right"></span>
            </button>
            <div className="hidden-content">
              <span>Donor Info</span>
            </div>
          </div>
          <h2>
            {props.title}
            <small className="course">{props.course}</small>
            <small className="author">{props.author}</small>
          </h2>
        </div>
        <div className="card-flap flap1">
          <div className="card-description">{props.description}</div>
          <div className="card-flap flap2">
            <div className="card-actions">
                  <div className="donor-info">
                    <h3>Donor Info</h3>
                    <p>Full Name: {props.fullName}</p>
                    <p>Email: {props.email}</p>
                    <p>Phone Number: {props.phoneNumber}</p>
                    <p>Address: {props.address}</p>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
