export interface FilterOption {
  id: string;
  label: string;
  value: string | number;
  count?: number;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface Filter {
  id: string;
  label: string;
  type: "price" | "checkbox" | "color" | "search-list";
  options?: FilterOption[];
  range?: PriceRange;
}

// Фильтры для обуви
export const shoesFilters: Filter[] = [
  {
    id: "price",
    label: "Цена",
    type: "price",
    range: {
      min: 0,
      max: 1000000,
    },
  },
  {
    id: "brand",
    label: "Бренд",
    type: "search-list",
    options: [
      { id: "nike", label: "Nike", value: "nike", count: 0 },
      { id: "adidas", label: "Adidas", value: "adidas", count: 0 },
      {
        id: "new-balance",
        label: "New Balance",
        value: "new-balance",
        count: 6543,
      },
      { id: "asics", label: "Asics", value: "asics", count: 0 },
      { id: "puma", label: "Puma", value: "puma", count: 0 },
      { id: "reebok", label: "Reebok", value: "reebok", count: 0 },
      { id: "jordan", label: "Jordan", value: "jordan", count: 0 },
      { id: "vans", label: "Vans", value: "vans", count: 0 },
      { id: "converse", label: "Converse", value: "converse", count: 0 },
      { id: "excelsior", label: "EXCELSIOR", value: "excelsior", count: 0 },
      { id: "ganotwait", label: "GANOTWAIT", value: "ganotwait", count: 0 },
      { id: "raf-simons", label: "RAF SIMONS", value: "raf-simons", count: 0 },
      { id: "chloe", label: "Chloe", value: "chloe", count: 0 },
      {
        id: "common-projects",
        label: "COMMON PROJECTS",
        value: "common-projects",
        count: 0,
      },
    ],
  },
  {
    id: "color",
    label: "Цвет",
    type: "color",
    options: [
      { id: "black", label: "Черный", value: "#000000" },
      { id: "white", label: "Белый", value: "#FFFFFF" },
      { id: "gray", label: "Серый", value: "#808080" },
      { id: "red", label: "Красный", value: "#FF0000" },
      { id: "blue", label: "Синий", value: "#0000FF" },
      { id: "green", label: "Зеленый", value: "#008000" },
      { id: "yellow", label: "Желтый", value: "#FFFF00" },
      { id: "brown", label: "Коричневый", value: "#8B4513" },
      { id: "beige", label: "Бежевый", value: "#F5F5DC" },
      { id: "gold", label: "Золотой", value: "#FFD700" },
      { id: "avacado", label: "Авакадо", value: "#FFD700" },
      { id: "pink", label: "Розовый", value: "#FFD700" },
      { id: "gold", label: "Золотой", value: "#FFD700" },
    ],
  },
  {
    id: "material",
    label: "Материал",
    type: "checkbox",
    options: [
      { id: "leather", label: "Кожа", value: "leather" },
      { id: "suede", label: "Замша", value: "suede" },
      { id: "textile", label: "Текстиль", value: "textile" },
      { id: "synthetic", label: "Синтетика", value: "synthetic" },
      { id: "mesh", label: "Сетка", value: "mesh" },
      { id: "canvas", label: "Канвас", value: "canvas" },
    ],
  },
];

// Фильтры для одежды
export const clothingFilters: Filter[] = [
  {
    id: "price",
    label: "Цена",
    type: "price",
    range: {
      min: 500,
      max: 50000,
    },
  },
  {
    id: "brand",
    label: "Бренд",
    type: "search-list",
    options: [
      { id: "nike", label: "Nike", value: "nike", count: 0 },
      { id: "adidas", label: "Adidas", value: "adidas", count: 0 },
      { id: "puma", label: "Puma", value: "puma", count: 0 },
      { id: "tnf", label: "The North Face", value: "tnf", count: 0 },
      { id: "columbia", label: "Columbia", value: "columbia", count: 0 },
    ],
  },
  {
    id: "size",
    label: "Размер",
    type: "checkbox",
    options: [
      { id: "xs", label: "XS", value: "xs" },
      { id: "s", label: "S", value: "s" },
      { id: "m", label: "M", value: "m" },
      { id: "l", label: "L", value: "l" },
      { id: "xl", label: "XL", value: "xl" },
      { id: "xxl", label: "XXL", value: "xxl" },
    ],
  },
];

// Фильтры для аксессуаров
export const accessoriesFilters: Filter[] = [
  {
    id: "price",
    label: "Цена",
    type: "price",
    range: {
      min: 100,
      max: 20000,
    },
  },
  {
    id: "brand",
    label: "Бренд",
    type: "search-list",
    options: [
      { id: "nike", label: "Nike", value: "nike", count: 0 },
      { id: "adidas", label: "Adidas", value: "adidas", count: 0 },
      { id: "new-era", label: "New Era", value: "new-era", count: 0 },
    ],
  },
  {
    id: "type",
    label: "Тип",
    type: "checkbox",
    options: [
      { id: "cap", label: "Кепка", value: "cap" },
      { id: "bag", label: "Сумка", value: "bag" },
      { id: "socks", label: "Носки", value: "socks" },
      { id: "belt", label: "Ремень", value: "belt" },
    ],
  },
];
