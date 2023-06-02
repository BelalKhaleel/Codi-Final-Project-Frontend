import React from "react";
import { useState } from "react";
import "./BookCards.css";
import DonorInfoModal from "../DonorModal/DonorModal";

export default function Card(props) {
  const [isShowing, setIsShowing] = useState(false);
  const [zIndex, setZIndex] = useState(10);
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
          </h2>
        </div>
        <div className="card-flap flap1">
          <div className="card-description">
            {props.description}
          </div>
          <div className="card-flap flap2">
            <div className="card-actions">
            <DonorInfoModal
                fullName="Belal"
                email="belalkhaleel"
                phoneNumber="56156"
                address="basra"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}