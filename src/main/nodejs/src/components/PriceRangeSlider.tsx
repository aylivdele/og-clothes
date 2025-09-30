// Ползунок цены от и до в левом меню 

import React, { useState, useEffect } from 'react';
import styles from './PriceRangeSlider.module.css';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  value,
  onChange
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [showDiscountOnly, setShowDiscountOnly] = useState(false);
  const [minInputValue, setMinInputValue] = useState('');
  const [maxInputValue, setMaxInputValue] = useState('');

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    if (newMin <= localValue[1]) {
      const newValue: [number, number] = [newMin, localValue[1]];
      setLocalValue(newValue);
      onChange(newValue);
      setMinInputValue('');
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (newMax >= localValue[0]) {
      const newValue: [number, number] = [localValue[0], newMax];
      setLocalValue(newValue);
      onChange(newValue);
      setMaxInputValue('');
    }
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setMinInputValue(value);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setMaxInputValue(value);
  };

  const handleMinInputBlur = () => {
    if (minInputValue) {
      const numValue = Number(minInputValue);
      const clampedValue = Math.max(min, Math.min(numValue, localValue[1]));
      const newValue: [number, number] = [clampedValue, localValue[1]];
      setLocalValue(newValue);
      onChange(newValue);
      setMinInputValue('');
    }
  };

  const handleMaxInputBlur = () => {
    if (maxInputValue) {
      const numValue = Number(maxInputValue);
      const clampedValue = Math.min(max, Math.max(numValue, localValue[0]));
      const newValue: [number, number] = [localValue[0], clampedValue];
      setLocalValue(newValue);
      onChange(newValue);
      setMaxInputValue('');
    }
  };

  const handleMinInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleMinInputBlur();
      e.currentTarget.blur();
    }
  };

  const handleMaxInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleMaxInputBlur();
      e.currentTarget.blur();
    }
  };

  const getProgressStyle = () => {
    const minPercent = ((localValue[0] - min) / (max - min)) * 100;
    const maxPercent = ((localValue[1] - min) / (max - min)) * 100;
    return {
      left: `${minPercent}%`,
      width: `${maxPercent - minPercent}%`
    };
  };

  return (
    <div className={styles.priceRangeSlider}>
      <div className={styles.checkboxContainer}>
        <label className={styles.checkboxLabel}>
          <input 
            type="checkbox" 
            className={styles.checkbox}
            checked={showDiscountOnly}
            onChange={(e) => setShowDiscountOnly(e.target.checked)}
          />
          <span>Товары со скидкой</span>
        </label>
      </div>

      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label>от</label>
          <input
            type="text"
            value={minInputValue}
            placeholder={formatPrice(localValue[0])}
            onChange={handleMinInputChange}
            onBlur={handleMinInputBlur}
            onKeyDown={handleMinInputKeyDown}
          />
          <span>₽</span>
        </div>
        
        <div className={styles.inputGroup}>
          <label>до</label>
          <input
            type="text"
            value={maxInputValue}
            placeholder={formatPrice(localValue[1])}
            onChange={handleMaxInputChange}
            onBlur={handleMaxInputBlur}
            onKeyDown={handleMaxInputKeyDown}
          />
          <span>₽</span>
        </div>
      </div>

      <div className={styles.sliderContainer}>
        <div className={styles.sliderTrack}>
          <div className={styles.sliderProgress} style={getProgressStyle()} />
        </div>
        
        <input
          type="range"
          className={`${styles.sliderInput} ${styles.sliderInputMin}`}
          min={min}
          max={max}
          value={localValue[0]}
          onChange={handleMinChange}
          style={{ zIndex: localValue[0] === max ? 3 : 1 }}
        />
        <input
          type="range"
          className={`${styles.sliderInput} ${styles.sliderInputMax}`}
          min={min}
          max={max}
          value={localValue[1]}
          onChange={handleMaxChange}
          style={{ zIndex: 2 }}
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;




