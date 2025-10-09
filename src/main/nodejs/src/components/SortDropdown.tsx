// Сортировка цены отображение десктоп ps мобильный
import React, { useState, useRef, useEffect } from "react";
import styles from "./SortDropdown.module.css";
import { ChevronDown, X, ArrowUpDown } from "lucide-react";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
  isMobileButton?: boolean;
}

const sortOptions = [
  { value: "popular", label: "По популярности" },
  { value: "price-asc", label: "По возрастанию цены" },
  { value: "price-desc", label: "По убыванию цены" },
  { value: "sale", label: "По скидкам" },
  { value: "new", label: "Новинки" },
];

const SortDropdown: React.FC<SortDropdownProps> = ({
  value,
  onChange,
  isMobileButton = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = sortOptions.find((option) => option.value === value);

  useEffect(() => {
    if (showMobileModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMobileModal]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setShowMobileModal(false);
  };

  const handleMobileButtonClick = () => {
    setShowMobileModal(true);
  };

  if (isMobileButton) {
    return (
      <>
        <button
          className={styles.mobileSortBtn}
          onClick={handleMobileButtonClick}
        >
          <ArrowUpDown size={18} />
          Сортировка
        </button>

        {showMobileModal && (
          <div className={styles.mobileModal}>
            <div className={styles.modalHeader}>
              <h3>Сортировка</h3>
              <button
                className={styles.modalClose}
                onClick={() => setShowMobileModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className={styles.modalContent}>
              <div className={styles.sortOptions}>
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`${styles.sortOption} ${
                      value === option.value ? styles.sortOptionActive : ""
                    }`}
                    onClick={() => handleSelect(option.value)}
                  >
                    <span className={styles.radioCircle}>
                      {value === option.value && (
                        <span className={styles.radioDot} />
                      )}
                    </span>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className={styles.sortDropdown} ref={dropdownRef}>
      <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        <span>{currentOption?.label || "Сортировка"}</span>
        <ChevronDown
          size={18}
          className={`${styles.icon} ${isOpen ? styles.iconRotated : ""}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className={`${styles.option} ${
                value === option.value ? styles.optionActive : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
