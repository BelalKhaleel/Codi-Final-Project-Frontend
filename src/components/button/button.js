import React from "react";
import "./button.css";

function MainButton(props) {
  const buttonStyle = {
    color: props.textColor,
    fontWeight: props.fontWeight,
    ...props.style
  };

  const hoverStyle = {
    color: props.hoverColor,
    ...props.hoverStyle
  };

  return (
    <button
      className="main-button"
      type={props.type}
      style={buttonStyle}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <span style={hoverStyle}>{props.name}</span>
    </button>
  );
}

export default MainButton;
