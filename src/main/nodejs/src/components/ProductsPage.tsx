// Относится ко всему каталогу и фильтрам
// src/pages/ProductsPage.tsx

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./ProductsPage.module.css";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import SortDropdown from "../components/SortDropdown";
import Breadcrumbs from "../components/Breadcrumbs";
import { products } from "../data/ProductsData";
import { categoriesData } from "../data/categoriesData";
import {
  shoesFilters,
  clothingFilters,
  accessoriesFilters,
} from "../data/FilterProduct";
import { Product } from "../data/ProductsData";
import { Filter as FilterIcon, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";

interface FilterState {
  priceRange: [number, number];
  brands: string[];
  colors: string[];
  materials: string[];
  sizes: string[];
}

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "shoes";
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    searchParams.get("subcategory")
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [1801, 965650],
    brands: [],
    colors: [],
    materials: [],
    sizes: [],
  });

  useEffect(() => {
    if (showMobileFilter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMobileFilter]);

  const currentSubcategories = useMemo(() => {
    switch(category) {
      case 'shoes':
        return categoriesData.shoes;
      case 'clothing':
        return categoriesData.clothing;
      case 'accessories':
        return categoriesData.accessories;
      case 'men':
        return categoriesData.men;
      case 'women':
        return categoriesData.women;
      default:
        return [];
    }
  }, [category]);

  const subcategoriesWithCount = useMemo(() => {
    return currentSubcategories.map(subcat => {
      let count = 0;
      
      if (category === 'men' || category === 'women') {
        count = products.filter(p => 
          (p.gender === category || p.gender === 'unisex') &&
          p.subcategory === subcat.slug.replace(`${category}-`, '')
        ).length;
      } else {
        count = products.filter(p => 
          p.category === category && 
          p.subcategory === subcat.slug
        ).length;
      }
      
      return { ...subcat, count };
    });
  }, [currentSubcategories, category]);

  const getCurrentFilters = () => {
    switch (category) {
      case "shoes":
        return shoesFilters;
      case "clothing":
        return clothingFilters;
      case "accessories":
        return accessoriesFilters;
      case "men":
        return shoesFilters;
      case "women":
        return shoesFilters;
      default:
        return shoesFilters;
    }
  };

  const applyFilters = useMemo(() => {
    let result = products;

    if (category === 'men' || category === 'women') {
      result = result.filter((p) => p.gender === category || p.gender === 'unisex');
    } else {
      result = result.filter((p) => p.category === category);
    }

    if (selectedSubcategory) {
      if (category === 'men' || category === 'women') {
        const cleanSubcategory = selectedSubcategory.replace(`${category}-`, '');
        result = result.filter((p) => p.subcategory === cleanSubcategory);
      } else {
        result = result.filter((p) => p.subcategory === selectedSubcategory);
      }
    }

    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.brands.length > 0) {
      result = result.filter((p) =>
        filters.brands.includes(p.brand.toLowerCase())
      );
    }

    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => filters.colors.includes(c.name.toLowerCase()))
      );
    }

    if (filters.materials.length > 0) {
      result = result.filter((p) =>
        p.material.some((m) => filters.materials.includes(m))
      );
    }

    return result;
  }, [filters, category, selectedSubcategory]);

  const sortedProducts = useMemo(() => {
    const sorted = [...applyFilters];

    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "new":
        return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case "sale":
        return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default:
        return sorted;
    }
  }, [applyFilters, sortBy]);

  useEffect(() => {
    setFilteredProducts(sortedProducts);
  }, [sortedProducts]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const handleScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setShowLeftGradient(scrollLeft > 0);
        setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 10);
      };
      
      container.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentSubcategories]);

  const handleSubcategoryClick = (subcategory: string | null) => {
    setSelectedSubcategory(subcategory);
    
    const params = new URLSearchParams(searchParams);
    if (subcategory) {
      params.set('subcategory', subcategory);
    } else {
      params.delete('subcategory');
    }
    setSearchParams(params);
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    const currentFilters = getCurrentFilters();
    const priceFilter = currentFilters.find((f) => f.id === "price");

    setFilters({
      priceRange: priceFilter?.range
        ? [priceFilter.range.min, priceFilter.range.max]
        : [0, 999999],
      brands: [],
      colors: [],
      materials: [],
      sizes: [],
    });
  };

  const handleApplyMobileFilters = () => {
    setShowMobileFilter(false);
  };


  const getCategoryTitle = () => {
    switch (category) {
      case "shoes":
        return "Обувь";
      case "clothing":
        return "Одежда";
      case "accessories":
        return "Аксессуары";
      case "men":
        return "Для мужчин";
      case "women":
        return "Для женщин";
      default:
        return "Все товары";
    }
  };

  const breadcrumbs = [
    { label: "Главная", path: "/" },
    { label: getCategoryTitle(), path: `/products?category=${category}` },
  ];

  return (
    <div className={styles.productsPage}>
      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbs} />

        {/* Десктопный заголовок */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            {getCategoryTitle()}
            <span className={styles.count}>
              {filteredProducts.length} товаров
            </span>
          </h2>

          <div className={styles.controls}>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {/* Мобильный заголовок */}
        <div className={styles.mobileHeader}>
          <div className={styles.mobileHeaderTop}>
            <h2 className={styles.mobileTitle}>{getCategoryTitle()}</h2>
            <span className={styles.mobileCount}>
              {filteredProducts.length} товаров
            </span>
          </div>
        </div>

        {/* Блок с подкатегориями */}
        {currentSubcategories.length > 0 && (
          <div className={styles.filterCategories}>
            {showLeftGradient && <div className={styles.gradientLeft} />}
            {showRightGradient && <div className={styles.gradientRight} />}

            <div ref={scrollContainerRef} className={styles.categoriesScroll}>
              <button
                className={`${styles.categoryChip} ${
                  !selectedSubcategory ? styles.activeChip : ""
                }`}
                onClick={() => handleSubcategoryClick(null)}
              >
                Все
              </button>

              {subcategoriesWithCount.map((subcat) => (
                <button
                  key={subcat.id}
                  className={`${styles.categoryChip} ${
                    selectedSubcategory === subcat.slug ? styles.activeChip : ""
                  }`}
                  onClick={() => handleSubcategoryClick(subcat.slug)}
                >
                  {subcat.name}
                  {subcat.count > 0 && (
                    <span className={styles.chipCount}>{subcat.count}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Кнопки фильтров и сортировки для мобильного */}
        <div className={styles.mobileControls}>
          <button
            className={styles.mobileFilterBtn}
            onClick={() => setShowMobileFilter(true)}
          >
            <SlidersHorizontal size={18} />
            Фильтры
          </button>

          <SortDropdown
            value={sortBy}
            onChange={setSortBy}
            isMobileButton={true}
          />
        </div>

        <div className={styles.content}>
          <aside className={styles.sidebar}>
            <FilterSidebar
              filters={getCurrentFilters()}
              activeFilters={filters}
              onChange={handleFilterChange}
              onClear={clearFilters}
            />
          </aside>

          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {showMobileFilter && (
        <div className={styles.mobileModal}>
          <div className={styles.modalHeader}>
            <h3>Фильтры</h3>
            <button
              className={styles.modalClose}
              onClick={() => setShowMobileFilter(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className={styles.modalContent}>
            <FilterSidebar
              filters={getCurrentFilters()}
              activeFilters={filters}
              onChange={handleFilterChange}
              onClear={clearFilters}
            />
          </div>

          <div className={styles.modalFooter}>
            <button
              className={styles.applyButton}
              onClick={handleApplyMobileFilters}
            >
              Применить
            </button>
            <button className={styles.clearButton} onClick={clearFilters}>
              Сбросить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;

