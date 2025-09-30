import React, { useState } from "react";
import styles from "./FilterSidebar.module.css";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import PriceRangeSlider from "./PriceRangeSlider";

export interface FilterOption {
  id: string;
  label: string;
  value: string | number;
  count?: number;
}

export interface Filter {
  id: string;
  label: string;
  type: 'price' | 'checkbox' | 'color' | 'search-list';
  options?: FilterOption[];
  range?: {
    min: number;
    max: number;
  };
}

interface FilterSidebarProps {
  filters: Filter[];
  activeFilters: any;
  onChange: (filters: any) => void;
  onClear: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  activeFilters,
  onChange,
  onClear,
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "price",
    "brand",
    "color",
    "material",
  ]);
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});
  const [showAll, setShowAll] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleCheckboxChange = (filterId: string, value: string) => {
    const filterKey =
      filterId === "brand"
        ? "brands"
        : filterId === "color"
        ? "colors"
        : filterId === "material"
        ? "materials"
        : filterId === "size"
        ? "sizes"
        : filterId;

    const currentValues = activeFilters[filterKey] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v: string) => v !== value)
      : [...currentValues, value];

    onChange({ [filterKey]: newValues });
  };

  const handlePriceChange = (range: [number, number]) => {
    onChange({ priceRange: range });
  };

  const handleSearchChange = (filterId: string, query: string) => {
    setSearchQueries((prev) => ({ ...prev, [filterId]: query }));
    if (query) {
      setShowAll((prev) => ({ ...prev, [filterId]: true }));
    }
  };

  const getFilteredOptions = (filter: Filter): FilterOption[] => {
    if (!filter.options) return [];

    const query = searchQueries[filter.id] || "";
    if (!query) return filter.options;

    return filter.options.filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getVisibleOptions = (filter: Filter) => {
    const filteredOptions = getFilteredOptions(filter);
    
    if (searchQueries[filter.id] || showAll[filter.id]) {
      return filteredOptions;
    }
    
    return filteredOptions.slice(0, 5);
  };

  const toggleShowAll = (filterId: string) => {
    setShowAll((prev) => ({ ...prev, [filterId]: !prev[filterId] }));
  };


  const shouldShowSearch = (filter: Filter) => {
    return filter.type === "search-list" || 
           filter.type === "checkbox" || 
           filter.type === "color";
  };

  return (
    <div className={styles.filterSidebar}>
      {filters.map((filter) => (
        <div key={filter.id} className={styles.filterSection}>
          <button
            className={styles.filterHeader}
            onClick={() => toggleSection(filter.id)}
          >
            <span className={styles.filterTitle}>{filter.label}</span>
            {expandedSections.includes(filter.id) ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {expandedSections.includes(filter.id) && (
            <div className={styles.filterContent}>
              {filter.type === "price" && filter.range && (
                <PriceRangeSlider
                  min={filter.range.min}
                  max={filter.range.max}
                  value={
                    activeFilters.priceRange || [
                      filter.range.min,
                      filter.range.max,
                    ]
                  }
                  onChange={handlePriceChange}
                />
              )}

              {filter.type !== "price" && (
                <>
                  {shouldShowSearch(filter) && (
                    <div className={styles.searchBox}>
                      <Search size={16} />
                      <input
                        type="text"
                        placeholder="Искать"
                        value={searchQueries[filter.id] || ""}
                        onChange={(e) =>
                          handleSearchChange(filter.id, e.target.value)
                        }
                      />
                    </div>
                  )}

                  {getFilteredOptions(filter).length === 0 && searchQueries[filter.id] ? (
                    <div className={styles.noResults}>
                      <span className={styles.noResultsEmoji}>😔</span>
                      <span className={styles.noResultsText}>Упс, ничего не найдено</span>
                    </div>
                  ) : (
                    <>
                      <div className={styles.optionsList}>
                        {getVisibleOptions(filter).map((option) => (
                          <label key={option.id} className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              className={styles.checkbox}
                              checked={
                                activeFilters[
                                  filter.id === "brand"
                                    ? "brands"
                                    : filter.id === "color"
                                    ? "colors"
                                    : filter.id === "material"
                                    ? "materials"
                                    : filter.id
                                ]?.includes(option.value) || false
                              }
                              onChange={() =>
                                handleCheckboxChange(filter.id, option.value as string)
                              }
                            />
                            <span className={styles.labelText}>{option.label}</span>
                          </label>
                        ))}
                      </div>

                      {filter.options &&
                        filter.options.length > 5 &&
                        !searchQueries[filter.id] && (
                          <button
                            className={styles.showMoreButton}
                            onClick={() => toggleShowAll(filter.id)}
                          >
                            {showAll[filter.id]
                              ? "Показать меньше"
                              : `Показать все (${filter.options.length})`}
                          </button>
                        )}
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;

