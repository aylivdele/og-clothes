// Относится ко всему каталогу и фильтрам
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./ProductsPage.module.css";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import SortDropdown from "../components/SortDropdown";
import Breadcrumbs from "../components/Breadcrumbs";
import { products } from "../data/ProductsData";
import {
  shoesFilters,
  clothingFilters,
  accessoriesFilters,
} from "../data/FilterProduct";
import { Product } from "../data/ProductsData";
import { Filter as FilterIcon, X } from "lucide-react";

interface FilterState {
  priceRange: [number, number];
  brands: string[];
  colors: string[];
  materials: string[];
  sizes: string[];
}

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "shoes";

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

  const getCurrentFilters = () => {
    switch (category) {
      case "shoes":
        return shoesFilters;
      case "clothing":
        return clothingFilters;
      case "accessories":
        return accessoriesFilters;
      default:
        return shoesFilters;
    }
  };

  const applyFilters = useMemo(() => {
    let result = products.filter((p) => p.category === category);

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
  }, [filters, category]);

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

  const getCategoryTitle = () => {
    switch (category) {
      case "shoes":
        return "Обувь";
      case "clothing":
        return "Одежда";
      case "accessories":
        return "Аксессуары";
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

        <div className={styles.header}>
          <h2 className={styles.title}>
            {getCategoryTitle()}
            <span className={styles.count}>
              {filteredProducts.length} товаров
            </span>
          </h2>

          <div className={styles.controls}>
            <button
              className={styles.filterToggle}
              onClick={() => setShowMobileFilter(true)}
            >
              <FilterIcon size={20} />
              Фильтры
            </button>

            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        <div className={styles.content}>
          <aside
            className={`${styles.sidebar} ${
              showMobileFilter ? styles.sidebarMobile : ""
            }`}
          >
            {showMobileFilter && (
              <div className={styles.sidebarHeader}>
                <h3>Фильтры</h3>
                <button onClick={() => setShowMobileFilter(false)}>
                  <X size={24} />
                </button>
              </div>
            )}

            <FilterSidebar
              filters={getCurrentFilters()}
              activeFilters={filters}
              onChange={handleFilterChange}
              onClear={clearFilters}
            />

            {showMobileFilter && (
              <div className={styles.sidebarFooter}>
                <button
                  className={styles.applyButton}
                  onClick={() => setShowMobileFilter(false)}
                >
                  Показать {filteredProducts.length} товаров
                </button>
              </div>
            )}
          </aside>

          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
