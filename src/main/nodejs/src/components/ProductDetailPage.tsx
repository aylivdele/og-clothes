// src/pages/ProductDetailPage.tsx

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetailPage.module.css";
import Breadcrumbs from "../components/Breadcrumbs";
import SizeChartModal from "../components/SizeChartModal";
import { products, Product, Size } from "../data/ProductsData";
import {
  Copy,
  Share2,
  Ruler,
  ChevronUp,
  ChevronDown,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ProductDetailPage: React.FC = () => {
  const { article } = useParams<{ article: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [sizeFormat, setSizeFormat] = useState<"EU" | "US" | "MM">("EU");
  const [showSizeChart, setShowSizeChart] = useState<boolean>(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState<boolean>(false);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState<number>(0);
  const [copiedArticle, setCopiedArticle] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [fullscreenThumbnailStart, setFullscreenThumbnailStart] =
    useState<number>(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const VISIBLE_THUMBNAILS = 5;
  const MAX_DESCRIPTION_LENGTH = 400;
  const FULLSCREEN_VISIBLE_THUMBNAILS = 7;
  const MOBILE_VISIBLE_THUMBNAILS = 4;

  useEffect(() => {
    const foundProduct = products.find((p: Product) => p.article === article);
    if (foundProduct) {
      setProduct(foundProduct);
      const firstAvailable = foundProduct.sizes.find((s: Size) => s.available);
      if (firstAvailable) {
        setSelectedSize(firstAvailable.eu);
      }
    }
  }, [article]);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (!isFullscreen || !product) return;

      switch (e.key) {
        case "Escape":
          setIsFullscreen(false);
          break;
        case "ArrowLeft":
          navigateImage("prev");
          break;
        case "ArrowRight":
          navigateImage("next");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, selectedImage, product]);

  useEffect(() => {
    if (isFullscreen && isMobile) {
      setFullscreenThumbnailStart((prev) => prev);
    }
  }, [selectedImage, isFullscreen, isMobile]);

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
    {
      label: "Кроссовки для бега",
      path: "/products?category=shoes&type=running",
    },
    { label: product.name, path: "" },
  ];

  const copyArticle = (): void => {
    navigator.clipboard.writeText(product.article);
    setCopiedArticle(true);
    setTimeout(() => setCopiedArticle(false), 2000);
  };

  const shareProduct = (): void => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const shouldTruncateDescription =
    product.description.length > MAX_DESCRIPTION_LENGTH;
  const displayedDescription =
    shouldTruncateDescription && !isDescriptionExpanded
      ? product.description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
      : product.description;

  const canScrollUp = thumbnailStartIndex > 0;
  const canScrollDown =
    product.images.length > VISIBLE_THUMBNAILS &&
    thumbnailStartIndex < product.images.length - VISIBLE_THUMBNAILS;

  const scrollThumbnails = (direction: "up" | "down"): void => {
    if (direction === "up" && canScrollUp) {
      setThumbnailStartIndex((prev: number) => prev - 1);
    } else if (direction === "down" && canScrollDown) {
      setThumbnailStartIndex((prev: number) => prev + 1);
    }
  };

  const visibleThumbnails = product.images.slice(
    thumbnailStartIndex,
    thumbnailStartIndex + VISIBLE_THUMBNAILS
  );

  const openFullscreen = (): void => {
    setIsFullscreen(true);
    setTimeout(() => {
      scrollToCurrentThumbnail(selectedImage);
    }, 100);
  };

  const scrollToCurrentThumbnail = (index: number): void => {
    if (isMobile) {
      setFullscreenThumbnailStart(0);
    } else {
      const maxStart = Math.max(
        0,
        product.images.length - FULLSCREEN_VISIBLE_THUMBNAILS
      );
      let newStart = 0;

      if (index < 3) {
        newStart = 0;
      } else if (index > product.images.length - 4) {
        newStart = maxStart;
      } else {
        newStart = index - 3;
      }

      setFullscreenThumbnailStart(Math.min(newStart, maxStart));
    }
  };
  
  const navigateImage = (direction: "next" | "prev"): void => {
    let newIndex = selectedImage;

    if (direction === "next" && selectedImage < product.images.length - 1) {
      newIndex = selectedImage + 1;
    } else if (direction === "prev" && selectedImage > 0) {
      newIndex = selectedImage - 1;
    }

    setSelectedImage(newIndex);

    if (!isMobile) {
      scrollToCurrentThumbnail(newIndex);
    }
  };
  

  const canScrollFullscreenUp = fullscreenThumbnailStart > 0;
  const canScrollFullscreenDown =
    product.images.length > FULLSCREEN_VISIBLE_THUMBNAILS &&
    fullscreenThumbnailStart <
      product.images.length - FULLSCREEN_VISIBLE_THUMBNAILS;

  const scrollFullscreenThumbnails = (direction: "up" | "down"): void => {
    if (direction === "up" && canScrollFullscreenUp) {
      setFullscreenThumbnailStart((prev: number) => prev - 1);
    } else if (direction === "down" && canScrollFullscreenDown) {
      setFullscreenThumbnailStart((prev: number) => prev + 1);
    }
  };

  const fullscreenVisibleThumbnails = isMobile
    ? (() => {
        let startIdx = 0;
        if (selectedImage <= 1) {
          startIdx = 0;
        } else if (selectedImage >= product.images.length - 2) {
          startIdx = Math.max(0, product.images.length - 4);
        } else {
          startIdx = selectedImage - 1;
        }
        return product.images.slice(startIdx, startIdx + 4);
      })()
    : product.images.slice(
        fullscreenThumbnailStart,
        fullscreenThumbnailStart + FULLSCREEN_VISIBLE_THUMBNAILS
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
                    onClick={() => scrollThumbnails("up")}
                  >
                    <ChevronUp size={16} />
                  </button>
                )}

                <div className={styles.thumbnails} ref={thumbnailsRef}>
                  {visibleThumbnails.map((img: string, index: number) => {
                    const realIndex = index + thumbnailStartIndex;
                    return (
                      <button
                        key={realIndex}
                        className={`${styles.thumbnail} ${
                          selectedImage === realIndex
                            ? styles.activeThumbnail
                            : ""
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
                    onClick={() => scrollThumbnails("down")}
                  >
                    <ChevronDown size={16} />
                  </button>
                )}
              </div>

              <div className={styles.mainImageContainer}>
                <div
                  className={styles.mainImage}
                  onClick={openFullscreen}
                  style={{ cursor: "zoom-in" }}
                >
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
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
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

      {/* Полноэкранный просмотр */}
      {isFullscreen && (
        <div className={styles.fullscreenOverlay}>
          <button
            className={styles.fullscreenClose}
            onClick={() => setIsFullscreen(false)}
          >
            <X size={24} />
          </button>

          <div className={styles.fullscreenContent}>
            <div className={styles.fullscreenThumbnails}>
              {!isMobile &&
                product.images.length > FULLSCREEN_VISIBLE_THUMBNAILS && (
                  <>
                    {canScrollFullscreenUp && (
                      <button
                        className={`${styles.fullscreenThumbScroll} ${styles.fullscreenThumbScrollUp}`}
                        onClick={() => scrollFullscreenThumbnails("up")}
                      >
                        <ChevronUp size={20} />
                      </button>
                    )}

                    {canScrollFullscreenDown && (
                      <button
                        className={`${styles.fullscreenThumbScroll} ${styles.fullscreenThumbScrollDown}`}
                        onClick={() => scrollFullscreenThumbnails("down")}
                      >
                        <ChevronDown size={20} />
                      </button>
                    )}
                  </>
                )}

              <div className={styles.fullscreenThumbList}>
                {fullscreenVisibleThumbnails.map((img: string, idx: number) => {
                  let realIndex: number;

                  if (isMobile) {
                    if (selectedImage <= 1) {
                      realIndex = idx;
                    } else if (selectedImage >= product.images.length - 2) {
                      realIndex = Math.max(0, product.images.length - 4) + idx;
                    } else {
                      realIndex = selectedImage - 1 + idx;
                    }
                  } else {
                    realIndex = idx + fullscreenThumbnailStart;
                  }

                  return (
                    <button
                      key={realIndex}
                      className={`${styles.fullscreenThumb} ${
                        selectedImage === realIndex
                          ? styles.fullscreenThumbActive
                          : ""
                      }`}
                      onClick={() => setSelectedImage(realIndex)}
                    >
                      <img src={img} alt="" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.fullscreenMain}>
              {selectedImage > 0 && (
                <button
                  className={styles.fullscreenNavPrev}
                  onClick={() => navigateImage("prev")}
                >
                  <ChevronLeft size={32} />
                </button>
              )}

              <div className={styles.fullscreenImageContainer}>
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className={styles.fullscreenImage}
                />
              </div>

              {selectedImage < product.images.length - 1 && (
                <button
                  className={styles.fullscreenNavNext}
                  onClick={() => navigateImage("next")}
                >
                  <ChevronRight size={32} />
                </button>
              )}
            </div>

            <div className={styles.fullscreenCounter}>
              {selectedImage + 1} / {product.images.length}
            </div>
          </div>
        </div>
      )}

      <SizeChartModal
        isOpen={showSizeChart}
        onClose={() => setShowSizeChart(false)}
        category="shoes"
      />
    </div>
  );
};

export default ProductDetailPage;
