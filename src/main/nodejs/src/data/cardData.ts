export interface CardData {
  title: string;
  image: string;
  isHit: boolean;
  link: string;
}

const cardData: CardData[] = [
  {
    title: "БРЕНДЫ",
    image: "/images/photo_2025-10-07_20-54-47.jpg",
    isHit: true,
    link: "/#",
  },
  {
    title: "ОБУВЬ",
    image: "/images/photo_2025-10-07_20-57-20.jpg",
    isHit: true,
    link: "/#",
  },
  {
    title: "ОДЕЖДА",
    image: "images/photo_2025-10-07_21-37-30.jpg",
    isHit: false,
    link: "/#",
  },
  {
    title: "АКСЕСУАРЫ",
    image: "/images/photo_2025-10-07_21-25-08.jpg",
    isHit: false,
    link: "/#",
  },
  {
    title: "ДЛЯ МУЖЧИН",
    image: "/images/photo_2025-10-07_21-20-35.jpg",
    isHit: false,
    link: "/#",
  },
  {
    title: "ДЛЯ ЖЕНЩИН",
    image: "/images/photo_2025-10-07_21-22-36.jpg",
    isHit: false,
    link: "/#",
  },
];

export default cardData;
