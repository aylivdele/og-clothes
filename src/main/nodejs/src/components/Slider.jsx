import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import {
  Navigation,
  Pagination,
  Keyboard,
  Autoplay,
  EffectCreative,
} from "swiper/modules";
import styles from "./Slider.module.css";

const Slider = () => {
  const [swiper, setSwiper] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      subtitle: "Generate",
      title: "Unique Images for Your Designs",
      description:
        "Explore the infinite possibilities of generative AI to unlock new realms of visual creativity.",
      buttonText: "TRY IT YOURSELF",
      image: "/images/photo_2025-09-03_19-43-11.png",
      imageCaption: "Baby Yoda wearing sunglasses",
    },
    {
      subtitle: "Create",
      title: "Amazing Visual Content",
      description:
        "Transform your ideas into stunning visuals with the power of artificial intelligence.",
      buttonText: "GET STARTED",
      image: "/images/photo_2025-09-28_18-13-33.jpg",
      imageCaption: "Character with OG Clothes",
    },
  ];

  const handlePrev = () => {
    if (swiper && !isAnimating) {
      setIsAnimating(true);
      swiper.slidePrev();
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const handleNext = () => {
    if (swiper && !isAnimating) {
      setIsAnimating(true);
      swiper.slideNext();
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <Swiper
        onSwiper={setSwiper}
        onSlideChangeTransitionStart={() => setIsAnimating(true)}
        onSlideChangeTransitionEnd={() => setIsAnimating(false)}
        navigation={false}
        pagination={{
          clickable: true,
        }}
        speed={600}
        keyboard={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="creative"
        creativeEffect={{
          prev: {
            translate: ["-100%", 0, -1],
            opacity: 0,
          },
          next: {
            translate: ["100%", 0, -1],
            opacity: 0,
          },
        }}
        modules={[Navigation, Pagination, Keyboard, Autoplay, EffectCreative]}
        className={styles.swiper}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={styles.slideContent}>
              {/* Левая часть с текстом */}
              <div className={styles.leftSection}>
                <span className={styles.subtitle}>{slide.subtitle}</span>
                <h1 className={styles.title}>{slide.title}</h1>
                <p className={styles.description}>{slide.description}</p>
                <button className={styles.ctaButton}>{slide.buttonText}</button>
              </div>

              {/* Правая часть с изображением */}
              <div
                className={`${styles.rightSection} ${
                  isAnimating ? styles.animating : ""
                }`}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={slide.image}
                    alt={slide.imageCaption}
                    className={styles.mainImage}
                  />
                  <div className={styles.imageCaption}>
                    {slide.imageCaption}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Кастомные навигационные стрелки */}
      <div className={styles.navigationContainer}>
        <button
          type="button"
          className={styles.navButton}
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className={styles.navButton}
          onClick={handleNext}
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slider;

// import React, { useRef, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

// const Slider = () => {
//   return (
//     <Swiper
//       cssMode={true}
//       navigation={true}
//       pagination={true}
//       mousewheel={true}
//       keyboard={true}
//       autoplay={{ delay: 5000, disableOnInteraction: false }}
//       modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
//       className="mySwiper"
//     >
//         <SwiperSlide>Slide 1</SwiperSlide>
//         <SwiperSlide>Slide 2</SwiperSlide>
//         <SwiperSlide>Slide 3</SwiperSlide>
//       </Swiper>
//   );
// };

// export default Slider;
