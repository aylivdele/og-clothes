import React from 'react';
import { Link } from 'react-router-dom';
import cardData from '../data/cardData';

const HomeCard = () => {
  return (
    <div className="card-wrapper">
      {cardData.map((card, index) => (
        <div className="card" key={index}>
          {card.isHit && <div className="hit-badge">ХИТ</div>}
          <h2 className="card-title">{card.title}</h2>
          {card.image && <img src={card.image} alt={card.title} className="card-image" />}
          <Link to={card.link} className="card-link">ПОДРОБНЕЕ</Link>
        </div>
      ))}
    </div>
  );
};

export default HomeCard;
