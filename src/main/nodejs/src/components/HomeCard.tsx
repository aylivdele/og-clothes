import React from "react";
import { Link } from "react-router-dom";
import cardData from "../data/cardData";
import styles from "./HomeCard.module.css";

const HomeCard: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {cardData.map((card, index) => (
          <Link key={index} to={card.link} className={styles.card}>
            <div
              className={styles.cardBackground}
              style={{ backgroundImage: `url(${card.image})` }}
            >
              <div className={styles.overlay} />
            </div>

            {card.isHit && <div className={styles.hitBadge}>ХИТ</div>}

            <div className={styles.titleWrapper}>
              <h2 className={styles.title}>{card.title}</h2>
            </div>

            <div className={styles.hoverBar} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
