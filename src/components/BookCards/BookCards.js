import React from "react";
import { useState } from "react";
import "./BookCards.css";

export default function Card(props) {
  const [isShowing, setIsShowing] = useState(false);
  const [zIndex, setZIndex] = useState(10);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClick = () => {
    if (isShowing) {
      setIsShowing(false);
      if (zIndex > 10) {
        setZIndex(10);
      }
    } else {
      setIsShowing(true);
      setZIndex(zIndex + 1);
    }
  };

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
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
          <h2>
            {props.title}
            <small>{props.course}</small>
            <small>{props.author}</small>
          </h2>
        </div>
        <div className="card-flap flap1">
          <div className="card-description">{props.description}</div>
          <div className="card-flap flap2">
            <div className="card-actions">
              {!isPopupOpen && ( // Display the "Donor info" button if the popup is not open
                <button href="#" className="btn" onClick={handlePopupToggle}>
                  Donor info
                </button>
              )}
              {isPopupOpen && (
                <div className="donor-popup">
                  <div className="donor-info">
                    <h3>Donor Info</h3>
                    <p>Full Name: {props.fullName}</p>
                    <p>Email: {props.email}</p>
                    <p>Phone Number: {props.phoneNumber}</p>
                    <p>Address: {props.address}</p>
                  </div>
                  <button className="btn" onClick={handlePopupToggle}>
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
