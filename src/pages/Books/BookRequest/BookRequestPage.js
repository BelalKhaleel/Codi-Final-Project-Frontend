import React from "react";
import image from "../../../assets/images/page-under-construction-1.jpg"

const BookRequestPage = () => {
  return (
      <div>
        <h1 style={{ textAlign : "center"}}>Book Request Page</h1>
        <img src={image} alt="page under construction" 
        style={{ width: '100%'}}/>
      </div>
    );
}

export default BookRequestPage;