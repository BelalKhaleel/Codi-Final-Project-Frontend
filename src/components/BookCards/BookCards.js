import React from "react";
import { useState } from "react";
import "./BookCards.css";
import SimpleDialog from "../Dialog";
export default function Card(props) {
  const [isShowing, setIsShowing] = useState(false);
  const [zIndex, setZIndex] = useState(10);
  const [open, setOpen] = useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <>
      <div className={`card${isShowing ? " show" : ""}`} style={{ zIndex }}>
        <div className="cardimage-holder">
          <img
            className="cardimage"
            // src="https://source.unsplash.com/300x225/?wave"
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
              <button href="#" className="btn" >
              <SimpleDialog
        open={open}
        onClose={handleClose}
      />              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}