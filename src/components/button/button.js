import React from "react";
import "./button.css";

function MainButton(props) {
  const buttonStyle = {
    color: props.textColor, // Set the desired text color here
    fontWeight: props.fontWeight, // Set the desired font weight here
    ...props.style // Merge with other style properties passed as props
  };

  return (
    <button
      className="main-button"
      type={props.type}
      style={buttonStyle}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.name}
    </button>
  );
}

export default MainButton;

