// Карточки товаров
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: {
    id: string;
    article: string;
    name: string;
    brand: string;
    images: string[];
    price: number;
    oldPrice?: number;
    discount?: number;
    colors: Array<{
      name: string;
      hex: string;
    }>;
    sizes: Array<{
      eu: string;
      price: number;
      available: boolean;
    }>;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price);
  };

  const getLowestPrice = () => {
    const availableSizes = product.sizes.filter((s) => s.available);
    if (availableSizes.length === 0) return product.price;
    return Math.min(...availableSizes.map((s) => s.price));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || product.images.length <= 1) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const segment = width / product.images.length;
    const newIndex = Math.min(
      Math.floor(x / segment),
      product.images.length - 1
    );
    
    if (newIndex >= 0 && newIndex !== currentImageIndex) {
      setCurrentImageIndex(newIndex);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCurrentImageIndex(0);
  };

  return (
    <Link 
      to={`/product/${product.article}`} 
      className={styles.card}
    >
      <div 
        className={styles.imageContainer}
        ref={containerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className={styles.image}
        />
        
        {/* Индикаторы изображений внизу */}
        {product.images.length > 1 && (
          <div className={styles.imageIndicators}>
            {product.images.map((_, index) => (
              <span
                key={index}
                className={`${styles.indicator} ${
                  index === currentImageIndex ? styles.activeIndicator : ''
                }`}
              />
            ))}
          </div>
        )}
        
        {product.discount && (
          <span className={styles.discount}>-{product.discount}%</span>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{product.name}</h3>
        <div className={styles.priceContainer}>
          <span className={styles.priceLabel}>от</span>
          <span className={styles.price}>{formatPrice(getLowestPrice())} ₽</span>
          {product.oldPrice && (
            <span className={styles.oldPrice}>
              {formatPrice(product.oldPrice)} ₽
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;



