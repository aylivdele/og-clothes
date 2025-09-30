export interface Size {
  eu: string;
  us?: string;
  uk?: string;
  mm?: number;
  price: number;
  available: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: "shoes" | "clothing" | "accessories";
  images: string[];
  price: number;
  oldPrice?: number;
  discount?: number;
  colors: Array<{
    name: string;
    hex: string;
    images?: string[];
  }>;
  sizes: Size[];
  material: string[];
  description: string;
  article: string;
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  rating?: number;
  reviews?: number;
  characteristics?: {
    [key: string]: string;
  };
}

export const products: Product[] = [
  {
    id: "1",
    name: "New Balance 530 White Silver Navy",
    brand: "New Balance",
    category: "shoes",
    images: [
      "/images/1.avif",
      "/images/2.avif",
      "/images/3.avif",
      "/images/4.avif",
    ],
    price: 7387,
    oldPrice: 8500,
    discount: 13,
    colors: [
      {
        name: "White/Silver/Navy",
        hex: "#FFFFFF",
      },
    ],
    sizes: [
      { eu: "36", us: "4", mm: 220, price: 7828, available: true },
      { eu: "37", us: "4.5", mm: 225, price: 7658, available: true },
      { eu: "37.5", us: "5", mm: 228, price: 7523, available: true },
      { eu: "38", us: "5.5", mm: 232, price: 7523, available: false },
      { eu: "38.5", us: "6", mm: 235, price: 7794, available: true },
      { eu: "39.5", us: "6.5", mm: 240, price: 7658, available: true },
      { eu: "40", us: "7", mm: 245, price: 7794, available: true },
      { eu: "40.5", us: "7.5", mm: 248, price: 7794, available: true },
      { eu: "41.5", us: "8", mm: 252, price: 7658, available: true },
      { eu: "42", us: "8.5", mm: 255, price: 7387, available: true },
      { eu: "42.5", us: "9", mm: 258, price: 7387, available: false },
      { eu: "43", us: "9.5", mm: 262, price: 7387, available: true },
      { eu: "44", us: "10", mm: 265, price: 7523, available: true },
      { eu: "44.5", us: "10.5", mm: 268, price: 7794, available: true },
      { eu: "45", us: "11", mm: 272, price: 7387, available: true },
      { eu: "46.5", us: "12", mm: 280, price: 7828, available: true },
      { eu: "47.5", us: "13", mm: 285, price: 10596, available: true },
    ],
    material: ["leather", "mesh", "synthetic"],
    description:
      "Кроссовки New Balance NB 530 White Silver Navy представляют собой стильное сочетание комфорта и классического дизайна.",
    article: "MR530SG",
    inStock: true,
    isNew: false,
    isSale: true,
    rating: 4.5,
    reviews: 234,
    characteristics: {
      Артикул: "MR530SG",
      Цвет: "White/Silver/Navy",
      "Материал верха": "Кожа, сетка",
      "Материал подошвы": "Резина",
      Сезон: "Демисезон",
      Пол: "Унисекс",
      "Страна производства": "Вьетнам",
    },
  },
  {
    id: "1",
    name: "New Balance 530 White Silver Navy",
    brand: "New Balance",
    category: "shoes",
    images: [
      "/images/1.avif",
      "/images/2.avif",
      "/images/3.avif",
      "/images/4.avif",
    ],
    price: 7387,
    oldPrice: 8500,
    discount: 13,
    colors: [
      {
        name: "White/Silver/Navy",
        hex: "#FFFFFF",
      },
    ],
    sizes: [
      { eu: "36", us: "4", mm: 220, price: 7828, available: true },
      { eu: "37", us: "4.5", mm: 225, price: 7658, available: true },
      { eu: "37.5", us: "5", mm: 228, price: 7523, available: true },
      { eu: "38", us: "5.5", mm: 232, price: 7523, available: false },
      { eu: "38.5", us: "6", mm: 235, price: 7794, available: true },
      { eu: "39.5", us: "6.5", mm: 240, price: 7658, available: true },
      { eu: "40", us: "7", mm: 245, price: 7794, available: true },
      { eu: "40.5", us: "7.5", mm: 248, price: 7794, available: true },
      { eu: "41.5", us: "8", mm: 252, price: 7658, available: true },
      { eu: "42", us: "8.5", mm: 255, price: 7387, available: true },
      { eu: "42.5", us: "9", mm: 258, price: 7387, available: false },
      { eu: "43", us: "9.5", mm: 262, price: 7387, available: true },
      { eu: "44", us: "10", mm: 265, price: 7523, available: true },
      { eu: "44.5", us: "10.5", mm: 268, price: 7794, available: true },
      { eu: "45", us: "11", mm: 272, price: 7387, available: true },
      { eu: "46.5", us: "12", mm: 280, price: 7828, available: true },
      { eu: "47.5", us: "13", mm: 285, price: 10596, available: true },
    ],
    material: ["leather", "mesh", "synthetic"],
    description:
      "Кроссовки New Balance NB 530 White Silver Navy представляют собой стильное сочетание комфорта и классического дизайна.",
    article: "MR530SG",
    inStock: true,
    isNew: false,
    isSale: true,
    rating: 4.5,
    reviews: 234,
    characteristics: {
      Артикул: "MR530SG",
      Цвет: "White/Silver/Navy",
      "Материал верха": "Кожа, сетка",
      "Материал подошвы": "Резина",
      Сезон: "Демисезон",
      Пол: "Унисекс",
      "Страна производства": "Вьетнам",
    },
  },
  {
    id: "1",
    name: "New Balance 530 White Silver Navy",
    brand: "New Balance",
    category: "shoes",
    images: [
      "/images/1.avif",
      "/images/2.avif",
      "/images/3.avif",
      "/images/4.avif",
    ],
    price: 7387,
    oldPrice: 8500,
    discount: 13,
    colors: [
      {
        name: "White/Silver/Navy",
        hex: "#FFFFFF",
      },
    ],
    sizes: [
      { eu: "36", us: "4", mm: 220, price: 7828, available: true },
      { eu: "37", us: "4.5", mm: 225, price: 7658, available: true },
      { eu: "37.5", us: "5", mm: 228, price: 7523, available: true },
      { eu: "38", us: "5.5", mm: 232, price: 7523, available: false },
      { eu: "38.5", us: "6", mm: 235, price: 7794, available: true },
      { eu: "39.5", us: "6.5", mm: 240, price: 7658, available: true },
      { eu: "40", us: "7", mm: 245, price: 7794, available: true },
      { eu: "40.5", us: "7.5", mm: 248, price: 7794, available: true },
      { eu: "41.5", us: "8", mm: 252, price: 7658, available: true },
      { eu: "42", us: "8.5", mm: 255, price: 7387, available: true },
      { eu: "42.5", us: "9", mm: 258, price: 7387, available: false },
      { eu: "43", us: "9.5", mm: 262, price: 7387, available: true },
      { eu: "44", us: "10", mm: 265, price: 7523, available: true },
      { eu: "44.5", us: "10.5", mm: 268, price: 7794, available: true },
      { eu: "45", us: "11", mm: 272, price: 7387, available: true },
      { eu: "46.5", us: "12", mm: 280, price: 7828, available: true },
      { eu: "47.5", us: "13", mm: 285, price: 10596, available: true },
    ],
    material: ["leather", "mesh", "synthetic"],
    description:
      "Кроссовки New Balance NB 530 White Silver Navy представляют собой стильное сочетание комфорта и классического дизайна.",
    article: "MR530SG",
    inStock: true,
    isNew: false,
    isSale: true,
    rating: 4.5,
    reviews: 234,
    characteristics: {
      Артикул: "MR530SG",
      Цвет: "White/Silver/Navy",
      "Материал верха": "Кожа, сетка",
      "Материал подошвы": "Резина",
      Сезон: "Демисезон",
      Пол: "Унисекс",
      "Страна производства": "Вьетнам",
    },
  },
  {
    id: "1",
    name: "New Balance 530 White Silver Navy",
    brand: "New Balance",
    category: "shoes",
    images: [
      "/images/1.avif",
      "/images/2.avif",
      "/images/3.avif",
      "/images/4.avif",
    ],
    price: 7387,
    oldPrice: 8500,
    discount: 13,
    colors: [
      {
        name: "White/Silver/Navy",
        hex: "#FFFFFF",
      },
    ],
    sizes: [
      { eu: "36", us: "4", mm: 220, price: 7828, available: true },
      { eu: "37", us: "4.5", mm: 225, price: 7658, available: true },
      { eu: "37.5", us: "5", mm: 228, price: 7523, available: true },
      { eu: "38", us: "5.5", mm: 232, price: 7523, available: false },
      { eu: "38.5", us: "6", mm: 235, price: 7794, available: true },
      { eu: "39.5", us: "6.5", mm: 240, price: 7658, available: true },
      { eu: "40", us: "7", mm: 245, price: 7794, available: true },
      { eu: "40.5", us: "7.5", mm: 248, price: 7794, available: true },
      { eu: "41.5", us: "8", mm: 252, price: 7658, available: true },
      { eu: "42", us: "8.5", mm: 255, price: 7387, available: true },
      { eu: "42.5", us: "9", mm: 258, price: 7387, available: false },
      { eu: "43", us: "9.5", mm: 262, price: 7387, available: true },
      { eu: "44", us: "10", mm: 265, price: 7523, available: true },
      { eu: "44.5", us: "10.5", mm: 268, price: 7794, available: true },
      { eu: "45", us: "11", mm: 272, price: 7387, available: true },
      { eu: "46.5", us: "12", mm: 280, price: 7828, available: true },
      { eu: "47.5", us: "13", mm: 285, price: 10596, available: true },
    ],
    material: ["leather", "mesh", "synthetic"],
    description:
      "Кроссовки New Balance NB 530 White Silver Navy представляют собой стильное сочетание комфорта и классического дизайна.",
    article: "MR530SG",
    inStock: true,
    isNew: false,
    isSale: true,
    rating: 4.5,
    reviews: 234,
    characteristics: {
      Артикул: "MR530SG",
      Цвет: "White/Silver/Navy",
      "Материал верха": "Кожа, сетка",
      "Материал подошвы": "Резина",
      Сезон: "Демисезон",
      Пол: "Унисекс",
      "Страна производства": "Вьетнам",
    },
  },
  {
    id: "1",
    name: "New Balance 530 White Silver Navy",
    brand: "New Balance",
    category: "shoes",
    images: [
      "/images/1.avif",
      "/images/2.avif",
      "/images/3.avif",
      "/images/4.avif",
    ],
    price: 7387,
    oldPrice: 8500,
    discount: 13,
    colors: [
      {
        name: "White/Silver/Navy",
        hex: "#FFFFFF",
      },
    ],
    sizes: [
      { eu: "36", us: "4", mm: 220, price: 7828, available: true },
      { eu: "37", us: "4.5", mm: 225, price: 7658, available: true },
      { eu: "37.5", us: "5", mm: 228, price: 7523, available: true },
      { eu: "38", us: "5.5", mm: 232, price: 7523, available: false },
      { eu: "38.5", us: "6", mm: 235, price: 7794, available: true },
      { eu: "39.5", us: "6.5", mm: 240, price: 7658, available: true },
      { eu: "40", us: "7", mm: 245, price: 7794, available: true },
      { eu: "40.5", us: "7.5", mm: 248, price: 7794, available: true },
      { eu: "41.5", us: "8", mm: 252, price: 7658, available: true },
      { eu: "42", us: "8.5", mm: 255, price: 7387, available: true },
      { eu: "42.5", us: "9", mm: 258, price: 7387, available: false },
      { eu: "43", us: "9.5", mm: 262, price: 7387, available: true },
      { eu: "44", us: "10", mm: 265, price: 7523, available: true },
      { eu: "44.5", us: "10.5", mm: 268, price: 7794, available: true },
      { eu: "45", us: "11", mm: 272, price: 7387, available: true },
      { eu: "46.5", us: "12", mm: 280, price: 7828, available: true },
      { eu: "47.5", us: "13", mm: 285, price: 10596, available: true },
    ],
    material: ["leather", "mesh", "synthetic"],
    description:
      "Кроссовки New Balance NB 530 White Silver Navy представляют собой стильное сочетание комфорта и классического дизайна.",
    article: "MR530SG",
    inStock: true,
    isNew: false,
    isSale: true,
    rating: 4.5,
    reviews: 234,
    characteristics: {
      Артикул: "MR530SG",
      Цвет: "White/Silver/Navy",
      "Материал верха": "Кожа, сетка",
      "Материал подошвы": "Резина",
      Сезон: "Демисезон",
      Пол: "Унисекс",
      "Страна производства": "Вьетнам",
    },
  },
  {
    id: "1",
    name: "New Balance 530 White Silver Navy",
    brand: "New Balance",
    category: "shoes",
    images: [
      "/images/1.avif",
      "/images/2.avif",
      "/images/3.avif",
      "/images/4.avif",
      "/images/1.avif",
      "/images/2.avif",
      "/images/3.avif",
      "/images/4.avif",
    ],
    price: 7387,
    oldPrice: 8500,
    discount: 13,
    colors: [
      {
        name: "White/Silver/Navy",
        hex: "#FFFFFF",
      },
    ],
    sizes: [
      { eu: "36", us: "4", mm: 220, price: 7828, available: true },
      { eu: "37", us: "4.5", mm: 225, price: 7658, available: true },
      { eu: "37.5", us: "5", mm: 228, price: 7523, available: true },
      { eu: "38", us: "5.5", mm: 232, price: 7523, available: false },
      { eu: "38.5", us: "6", mm: 235, price: 7794, available: true },
      { eu: "39.5", us: "6.5", mm: 240, price: 7658, available: true },
      { eu: "40", us: "7", mm: 245, price: 7794, available: true },
      { eu: "40.5", us: "7.5", mm: 248, price: 7794, available: true },
      { eu: "41.5", us: "8", mm: 252, price: 7658, available: true },
      { eu: "42", us: "8.5", mm: 255, price: 7387, available: true },
      { eu: "42.5", us: "9", mm: 258, price: 7387, available: false },
      { eu: "43", us: "9.5", mm: 262, price: 7387, available: true },
      { eu: "44", us: "10", mm: 265, price: 7523, available: true },
      { eu: "44.5", us: "10.5", mm: 268, price: 7794, available: true },
      { eu: "45", us: "11", mm: 272, price: 7387, available: true },
      { eu: "46.5", us: "12", mm: 280, price: 7828, available: true },
      { eu: "47.5", us: "13", mm: 285, price: 10596, available: true },
    ],
    material: ["leather", "mesh", "synthetic"],
    description:
      "Кроссовки New Balance NB 530 White Silver Navy представляют собой стильное сочетание комфорта и классического дизайна. Кроссовки New Balance NB 530 White Silver Navy представляют собой стильное сочетание комфорта и классического дизайна. Кроссовки New Balance NB 530 White Silver Navy представляют собой стильное сочетание комфорта и классического дизайна.Кроссовки New Balance NB 530 White Silver Navy представляют собой стильное сочетание комфорта и классического дизайна. Кроссовки New Balance NB 530 White Silver Navy представляют собой стильное сочетание комфорта и классического дизайна. Кроссовки New Balance NB 530 White Silver Navy представляют собой стильное сочетание комфорта и классического дизайна.",
    article: "MR578898",
    inStock: true,
    isNew: false,
    isSale: true,
    rating: 4.5,
    reviews: 234,
    characteristics: {
      Артикул: "MR530SG",
      Цвет: "White/Silver/Navy",
      "Материал верха": "Кожа, сетка",
      "Материал подошвы": "Резина",
      Сезон: "Демисезон",
      Пол: "Унисекс",
      "Страна производства": "Вьетнам",
    },
  },
];

