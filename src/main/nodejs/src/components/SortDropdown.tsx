// Файл сортировки По популярности и др
import React, { useState, useRef, useEffect } from "react";
import styles from "./SortDropdown.module.css";
import { ChevronDown } from "lucide-react";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { value: "popular", label: "По популярности" },
  { value: "price-asc", label: "Цена: по возрастанию" },
  { value: "price-desc", label: "Цена: по убыванию" },
  { value: "new", label: "Новинки" },
  { value: "sale", label: "Скидки" },
];

const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = sortOptions.find((option) => option.value === value);

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
  };

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
