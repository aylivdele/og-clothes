export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export interface CategoryData {
  shoes: Subcategory[];
  clothing: Subcategory[];
  accessories: Subcategory[];
  men: Subcategory[];
  women: Subcategory[];
}

export const categoriesData: CategoryData = {
  shoes: [
    { id: "sneakers", name: "Кроссовки", slug: "sneakers" },
    { id: "running", name: "Беговые", slug: "running" },
    { id: "basketball", name: "Баскетбольные", slug: "basketball" },
    { id: "football", name: "Футбольные", slug: "football" },
    { id: "casual", name: "Повседневные", slug: "casual" },
    { id: "boots", name: "Ботинки", slug: "boots" },
    { id: "sandals", name: "Сандалии", slug: "sandals" },
    { id: "slippers", name: "Тапочки", slug: "slippers" },
    { id: "hiking", name: "Треккинговые", slug: "hiking" },
    { id: "tennis", name: "Теннисные", slug: "tennis" },
    { id: "skateboard", name: "Для скейтборда", slug: "skateboard" },
    { id: "winter", name: "Зимние", slug: "winter" },
  ],
  clothing: [
    { id: "t-shirts", name: "Футболки", slug: "t-shirts" },
    { id: "shirts", name: "Рубашки", slug: "shirts" },
    { id: "hoodies", name: "Худи", slug: "hoodies" },
    { id: "jackets", name: "Куртки", slug: "jackets" },
    { id: "pants", name: "Штаны", slug: "pants" },
    { id: "jeans", name: "Джинсы", slug: "jeans" },
    { id: "shorts", name: "Шорты", slug: "shorts" },
    { id: "sportswear", name: "Спортивная одежда", slug: "sportswear" },
    { id: "underwear", name: "Нижнее белье", slug: "underwear" },
    { id: "socks", name: "Носки", slug: "socks" },
  ],
  accessories: [
    { id: "bags", name: "Сумки", slug: "bags" },
    { id: "backpacks", name: "Рюкзаки", slug: "backpacks" },
    { id: "caps", name: "Кепки", slug: "caps" },
    { id: "hats", name: "Шапки", slug: "hats" },
    { id: "belts", name: "Ремни", slug: "belts" },
    { id: "wallets", name: "Кошельки", slug: "wallets" },
    { id: "watches", name: "Часы", slug: "watches" },
    { id: "sunglasses", name: "Солнцезащитные очки", slug: "sunglasses" },
    { id: "gloves", name: "Перчатки", slug: "gloves" },
    { id: "scarves", name: "Шарфы", slug: "scarves" },
  ],
  men: [
    { id: "men-shoes", name: "Мужская обувь", slug: "men-shoes" },
    { id: "men-clothing", name: "Мужская одежда", slug: "men-clothing" },
    {
      id: "men-accessories",
      name: "Мужские аксессуары",
      slug: "men-accessories",
    },
    { id: "men-sportswear", name: "Спортивная одежда", slug: "men-sportswear" },
    { id: "men-underwear", name: "Нижнее белье", slug: "men-underwear" },
    { id: "men-outerwear", name: "Верхняя одежда", slug: "men-outerwear" },
  ],
  women: [
    { id: "women-shoes", name: "Женская обувь", slug: "women-shoes" },
    { id: "women-clothing", name: "Женская одежда", slug: "women-clothing" },
    {
      id: "women-accessories",
      name: "Женские аксессуары",
      slug: "women-accessories",
    },
    {
      id: "women-sportswear",
      name: "Спортивная одежда",
      slug: "women-sportswear",
    },
    { id: "women-underwear", name: "Нижнее белье", slug: "women-underwear" },
    { id: "women-dresses", name: "Платья", slug: "women-dresses" },
    { id: "women-skirts", name: "Юбки", slug: "women-skirts" },
  ],
};
