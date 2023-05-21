import React, { useState } from 'react';
import "./BookSearchPage.css";

const Card = ({ imageSrc, imageAlt, title, description }) => {
  const [isShowing, setIsShowing] = useState(false);

  const handleClick = () => {
    setIsShowing((prevState) => !prevState);
  };

  return (
    <div className={`card ${isShowing ? 'show' : ''}`} onClick={handleClick}>
      <div className="card__image-holder">
        <img className="card__image" src={imageSrc} alt={imageAlt} />
      </div>
      <div className="card-title">
        <a href="#" className="toggle-info btn">
          <span className="left"></span>
          <span className="right"></span>
        </a>
        <h2>
          {title}
          <small>Image from unsplash.com</small>
        </h2>
      </div>
      <div className="card-flap flap1">
        <div className="card-description">{description}</div>
        <div className="card-flap flap2">
          <div className="card-actions">
            <a href="#" className="btn">
              Read more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardGrid = () => {
  return (
    <div className="cards">
      <Card
        imageSrc="https://source.unsplash.com/300x225/?wave"
        imageAlt="wave"
        title="Card title"
        description="This grid is an attempt to make something nice that works on touch devices. Ignoring hover states when they're not available etc."
      />
      <Card
        imageSrc="https://source.unsplash.com/300x225/?beach"
        imageAlt="beach"
        title="Card title"
        description="This grid is an attempt to make something nice that works on touch devices. Ignoring hover states when they're not available etc."
      />
      <Card
        imageSrc="https://source.unsplash.com/300x225/?mountain"
        imageAlt="mountain"
        title="Card title"
        description="This grid is an attempt to make something nice that works on touch devices. Ignoring hover states when they're not available etc."
      />
      <Card
        imageSrc="https://source.unsplash.com/300x225/?field"
        imageAlt="field"
        title="Card title"
        description="This grid is an attempt to make something nice that works on touch devices. Ignoring hover states when they're not available etc."
      />
      <Card
        imageSrc="https://source.unsplash.com/300x225/?water"
        imageAlt="water"
        title="Card title"
        description="This grid is an attempt to make something nice that works on touch devices. Ignoring hover states when they're not available etc."
      />
      <Card
        imageSrc="https://source.unsplash.com/300x225/?river"
        imageAlt="river"
        title="Card title"
        description="This grid is an attempt to make something nice that works on touch devices. Ignoring hover states when they're not available etc."
      />
      <Card
        imageSrc="https://source.unsplash.com/300x225/?kite"
        imageAlt="kite"
        title="Card title"
        description="This grid is an attempt to make something nice that works on touch devices. Ignoring hover states when they're not available etc."
      />
      <Card
        imageSrc="https://source.unsplash.com/300x225/?underwater"
        imageAlt="underwater"
        title="Card title"
        description="This grid is an attempt to make something nice that works on touch devices. Ignoring hover states when they're not available etc."
      />
      <Card
        imageSrc="https://source.unsplash.com/300x225/?desert"
        imageAlt="desert"
        title="Card title"
        description="This grid is an attempt to make something nice that works on touch devices. Ignoring hover states when they're not available etc."
      />
    </div>
  );
};

export default CardGrid;
