import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetailPage.module.css";
import Breadcrumbs from "../components/Breadcrumbs";
import SizeChartModal from "../components/SizeChartModal";
import { products, Product } from "../data/ProductsData";
import { Copy, Share2, Ruler, ChevronUp, ChevronDown, Check } from "lucide-react";

interface Size {
  eu: string;
  us?: string;
  uk?: string;
  mm?: number;
  price: number;
  available: boolean;
}

const ProductDetailPage: React.FC = () => {
  const { article } = useParams<{ article: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [sizeFormat, setSizeFormat] = useState<"EU" | "US" | "MM">("EU");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [copiedArticle, setCopiedArticle] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const VISIBLE_THUMBNAILS = 5;
  const MAX_DESCRIPTION_LENGTH = 400;

  useEffect(() => {
    const foundProduct = products.find((p) => p.article === article);
    if (foundProduct) {
      setProduct(foundProduct);
      const firstAvailable = foundProduct.sizes.find((s: Size) => s.available);
      if (firstAvailable) {
        setSelectedSize(firstAvailable.eu);
      }
    }
  }, [article]);

  if (!product) {
    return <div>Товар не найден</div>;
  }

  const getCurrentPrice = (): number => {
    const size = product.sizes.find((s: Size) => s.eu === selectedSize);
    return size ? size.price : product.price;
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("ru-RU").format(price);
  };

  const breadcrumbs = [
    { label: "Главная", path: "/" },
    { label: "Обувь", path: "/products?category=shoes" },
    { label: "Кроссовки", path: "/products?category=shoes&type=sneakers" },
    { label: "Кроссовки для бега", path: "/products?category=shoes&type=running" },
    { label: product.name, path: "" },
  ];

  const copyArticle = () => {
    navigator.clipboard.writeText(product.article);
    setCopiedArticle(true);
    setTimeout(() => setCopiedArticle(false), 2000);
  };

  const shareProduct = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const shouldTruncateDescription = product.description.length > MAX_DESCRIPTION_LENGTH;
  const displayedDescription = shouldTruncateDescription && !isDescriptionExpanded
    ? product.description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
    : product.description;

  const canScrollUp = thumbnailStartIndex > 0;
  const canScrollDown = product.images.length > VISIBLE_THUMBNAILS && 
    thumbnailStartIndex < product.images.length - VISIBLE_THUMBNAILS;

  const scrollThumbnails = (direction: 'up' | 'down') => {
    if (direction === 'up' && canScrollUp) {
      setThumbnailStartIndex(prev => prev - 1);
    } else if (direction === 'down' && canScrollDown) {
      setThumbnailStartIndex(prev => prev + 1);
    }
  };

  const visibleThumbnails = product.images.slice(
    thumbnailStartIndex,
    thumbnailStartIndex + VISIBLE_THUMBNAILS
  );

  return (
    <div className={styles.productPage}>
      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbs} />

        <div className={styles.content}>
          <div className={styles.gallerySection}>
            <div className={styles.gallery}>
              <div className={styles.thumbnailsWrapper}>
                {canScrollUp && (
                  <button 
                    className={styles.thumbnailScrollBtn}
                    onClick={() => scrollThumbnails('up')}
                  >
                    <ChevronUp size={16} />
                  </button>
                )}
                
                <div className={styles.thumbnails} ref={thumbnailsRef}>
                  {visibleThumbnails.map((img, index) => {
                    const realIndex = index + thumbnailStartIndex;
                    return (
                      <button
                        key={realIndex}
                        className={`${styles.thumbnail} ${
                          selectedImage === realIndex ? styles.activeThumbnail : ""
                        }`}
                        onClick={() => setSelectedImage(realIndex)}
                      >
                        <img src={img} alt="" />
                      </button>
                    );
                  })}
                </div>

                {canScrollDown && (
                  <button 
                    className={`${styles.thumbnailScrollBtn} ${styles.thumbnailScrollBtnDown}`}
                    onClick={() => scrollThumbnails('down')}
                  >
                    <ChevronDown size={16} />
                  </button>
                )}
              </div>

              <div className={styles.mainImageContainer}>
                <div className={styles.mainImage}>
                  <img src={product.images[selectedImage]} alt={product.name} />
                </div>
                
                <button
                  className={styles.sizeChartButton}
                  onClick={() => setShowSizeChart(true)}
                >
                  <Ruler size={16} />
                  Таблица размеров
                </button>
              </div>
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.detailsHeader}>
              <h1 className={styles.title}>{product.name}</h1>
              <button 
                className={styles.shareButton}
                onClick={shareProduct}
                title="Поделиться товаром"
              >
                {copiedLink ? (
                  <>
                    <Check size={16} />
                    <span>Скопировано!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={16} />
                    <span>Поделиться</span>
                  </>
                )}
              </button>
            </div>

            <div className={styles.description}>
              <span>{displayedDescription}</span>
              {shouldTruncateDescription && (
                <button 
                  className={styles.readMore}
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                >
                  {isDescriptionExpanded ? "Свернуть" : "Читать полностью"}
                </button>
              )}
            </div>

            <div className={styles.articleContainer}>
              <span className={styles.articleLabel}>Артикул:</span>
              <span className={styles.articleValue}>{product.article}</span>
              <button 
                onClick={copyArticle} 
                className={styles.copyButton}
                title="Скопировать артикул"
              >
                {copiedArticle ? <Check size={14} /> : <Copy size={14} />}
              </button>
              {copiedArticle && (
                <span className={styles.copiedText}>Скопировано!</span>
              )}
            </div>

            <div className={styles.sizesSection}>
              <div className={styles.sizesHeader}>
                <h3>Размеры</h3>
                <div className={styles.sizeToggle}>
                  <button
                    className={sizeFormat === "EU" ? styles.activeFormat : ""}
                    onClick={() => setSizeFormat("EU")}
                  >
                    EU
                  </button>
                  <button
                    className={sizeFormat === "US" ? styles.activeFormat : ""}
                    onClick={() => setSizeFormat("US")}
                  >
                    US
                  </button>
                  <button
                    className={sizeFormat === "MM" ? styles.activeFormat : ""}
                    onClick={() => setSizeFormat("MM")}
                  >
                    MM
                  </button>
                </div>
              </div>

              <div className={styles.sizesGrid}>
                {product.sizes.map((size: Size) => (
                  <button
                    key={size.eu}
                    className={`${styles.sizeButton} ${
                      selectedSize === size.eu ? styles.selectedSize : ""
                    } ${!size.available ? styles.unavailable : ""}`}
                    onClick={() => size.available && setSelectedSize(size.eu)}
                    disabled={!size.available}
                  >
                    <span className={styles.sizeValue}>
                      {sizeFormat === "EU" && `EU ${size.eu}`}
                      {sizeFormat === "US" && `US ${size.us || "-"}`}
                      {sizeFormat === "MM" && `${size.mm || "-"} mm`}
                    </span>
                    <span className={styles.sizePrice}>
                      {formatPrice(size.price)} ₽
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.purchaseSection}>
              <button className={styles.addToCart}>
                <span className={styles.cartPrice}>
                  {formatPrice(getCurrentPrice())} ₽
                </span>
                <span className={styles.cartText}>В корзину</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <SizeChartModal
        isOpen={showSizeChart}
        onClose={() => setShowSizeChart(false)}
        category="shoes"
      />
    </div>
  );
};

export default ProductDetailPage;


