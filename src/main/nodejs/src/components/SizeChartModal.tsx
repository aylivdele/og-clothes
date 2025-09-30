// Всплывающее окно с размерами при клике на кнопку таблица размеров

import React, { useEffect } from "react";
import styles from "./SizeChartModal.module.css";
import { X } from "lucide-react";
import { shoesSizeChart } from "../data/tableDimensions";

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: "shoes" | "clothing" | "accessories";
}

const SizeChartModal: React.FC<SizeChartModalProps> = ({
  isOpen,
  onClose,
  category = "shoes",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Таблица размеров</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.modalBody}>
          {category === "shoes" && (
            <div className={styles.tableContainer}>
              <table className={styles.sizeTable}>
                <thead>
                  <tr>
                    <th>EU</th>
                    <th>US</th>
                    <th>UK</th>
                    <th>MM</th>
                  </tr>
                </thead>
                <tbody>
                  {shoesSizeChart.map((row, index) => (
                    <tr key={index}>
                      <td>{row.eu}</td>
                      <td>{row.us}</td>
                      <td>{row.uk || "-"}</td>
                      <td>{row.mm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className={styles.measurementGuide}>
            <h3>Как измерить размер стопы:</h3>
            <ol>
              <li>Поставьте ногу на лист бумаги</li>
              <li>Обведите стопу карандашом</li>
              <li>Измерьте расстояние от пятки до большого пальца</li>
              <li>Добавьте 5-10 мм для комфорта</li>
              <li>Сравните с таблицей размеров</li>
            </ol>
          </div>

          <div className={styles.tips}>
            <h3>Полезные советы:</h3>
            <ul>
              <li>Измеряйте стопу вечером, когда она немного увеличена</li>
              <li>Всегда измеряйте обе стопы и выбирайте размер по большей</li>
              <li>Учитывайте толщину носков при выборе размера</li>
              <li>Для спортивной обуви рекомендуется запас 10-15 мм</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeChartModal;
