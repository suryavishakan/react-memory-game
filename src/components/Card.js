import React from "react";
import cardBackground from "../assets/back.jpg";
import "./Card.css";

const Card = ({ card, handleChoice }) => {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className="card">
      <div>
        <img src={card.src} className="front" alt="card front" />
        <img
          src={cardBackground}
          className="back"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Card;
