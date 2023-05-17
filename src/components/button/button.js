import React from "react";
import "./button.css";

function MainButton(props) {
  return (
    <button
      className="main-button"
      type={props.type}
      style={props.style}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.name}
    </button>
  );
}

export default MainButton;
