import styles from "./Navbar.module.css";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import React from "react";
import {
  Search,
  Heart,
  User,
  ShoppingCart,
  Menu,
  Truck,
  CircleUser,
  LayoutGrid,
  House,
  X,
} from "lucide-react";
import LoginModal from "./LoginModal";
import logo from "../../images/photo_2025-09-03_19-43-11.png";
import { useContext } from "react"; 
import { CartContext } from "./context/CartContext"; 
import CartSidebar from "./CartSidebar"; 
import "../css/style.css";

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const { openCart } = useContext(CartContext);


  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleMobileNavigation = (path, iconName) => {
    setActiveIcon(iconName);
    if (iconName === "menu") {
      setIsMobileMenuOpen(true);
    } else {
      setIsMobileMenuOpen(false);
      if (iconName === "auth") {
        const isAuthenticated = false;
        if (isAuthenticated) {
          navigate("/profile");
        } else {
          handleOpenLoginModal();
        }
      } else {
        navigate(path);
      }
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveIcon("home");
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerBlockContext}>
          БЕСПЛАТНАЯ ДОСТАВКА ПРИ ЗАКАЗЕ ОТ 10 000 РУБЛЕЙ
        </div>

        <div className={styles.headerBlockContainer}>
          <Link to="/" className={styles.logoContainer}>
            <img src={logo} alt="Company Logo" className={styles.logo} />
          </Link>

          <div className={styles.search}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Название модели, товар или артикул"
                className={styles.input}
              />
              <Search className={styles.iconsSearch} size={30} />
            </div>
          </div>

          <div className={styles.iconsType}>
            <button>
              <Heart size={35} />
            </button>
            <button onClick={openCart}>
              <ShoppingCart size={35} />
            </button>
            <button onClick={handleOpenLoginModal}>
              <User size={35} />
            </button>
          </div>
        </div>

        <nav className={styles.navContainer}>
          <ul className={styles.navList}>
            <Link to="/brand" className={styles.navItems}>
              Бренды
            </Link>
            <Link to="/products?category=shoes" className={styles.navItems}>
              Обувь
            </Link>
            <Link to="/products?category=clothing" className={styles.navItems}>
              Одежда
            </Link>
            <Link
              to="/products?category=accessories"
              className={styles.navItems}
            >
              Аксессуары
            </Link>
            <Link to="/products?category=men" className={styles.navItems}>
              Для мужчин
            </Link>
            <Link to="/products?category=women" className={styles.navItems}>
              Для женщин
            </Link>
            <Link to="/export" className={styles.navItems}>
              Экспорт товаров из Китая
            </Link>
          </ul>
        </nav>
      </header>

      {/* Мобильное меню внизу */}
      <div className={styles.mobileMenu}>
        <button
          className={`${styles.mobileMenuItem} ${
            activeIcon === "home" ? styles.active : ""
          }`}
          onClick={() => handleMobileNavigation("/", "home")}
        >
          <House size={30} />
        </button>

        <button
          className={`${styles.mobileMenuItem} ${
            activeIcon === "products" ? styles.active : ""
          }`}
          onClick={() => handleMobileNavigation("/products", "products")}
        >
          <LayoutGrid size={30} />
        </button>

        <button
          className={`${styles.mobileMenuItem} ${
            activeIcon === "cart" ? styles.active : ""
          }`}
          onClick={() => {
            setActiveIcon("cart");
            openCart();
          }}
        >
          <ShoppingCart size={30} />
        </button>

        <button
          className={`${styles.mobileMenuItem} ${
            activeIcon === "delivery" ? styles.active : ""
          }`}
          onClick={() => handleMobileNavigation("/delivery", "delivery")}
        >
          <Truck size={30} />
        </button>

        <button
          className={`${styles.mobileMenuItem} ${
            activeIcon === "auth" ? styles.active : ""
          }`}
          onClick={() => handleMobileNavigation("/profile", "auth")}
        >
          <CircleUser size={30} />
        </button>

        <button
          className={`${styles.mobileMenuItem} ${
            activeIcon === "menu" ? styles.active : ""
          }`}
          onClick={() => handleMobileNavigation("", "menu")}
        >
          <Menu size={30} />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <div className={styles.mobileMenuHeader}>
            <h2>Меню</h2>
            <button onClick={closeMobileMenu} className={styles.closeButton}>
              <X size={30} />
            </button>
          </div>

          <nav className={styles.mobileNavigation}>
            <Link
              to="/brand"
              className={styles.mobileNavItem}
              onClick={closeMobileMenu}
            >
              Бренды
            </Link>
            <Link
              to="/products?category=shoes"
              className={styles.mobileNavItem}
              onClick={closeMobileMenu}
            >
              Обувь
            </Link>
            <Link
              to="/products?category=clothing"
              className={styles.mobileNavItem}
              onClick={closeMobileMenu}
            >
              Одежда
            </Link>
            <Link
              to="/products?category=accessories"
              className={styles.mobileNavItem}
              onClick={closeMobileMenu}
            >
              Аксессуары
            </Link>
            <Link
              to="/products?category=men"
              className={styles.mobileNavItem}
              onClick={closeMobileMenu}
            >
              Для мужчин
            </Link>
            <Link
              to="/products?category=women"
              className={styles.mobileNavItem}
              onClick={closeMobileMenu}
            >
              Для женщин
            </Link>
            <Link
              to="/export"
              className={styles.mobileNavItem}
              onClick={closeMobileMenu}
            >
              Экспорт товаров из Китая
            </Link>
          </nav>
        </div>
      )}

      {isLoginModalOpen && <LoginModal onClose={handleCloseLoginModal} />}
    </>
  );
};

<CartSidebar />;
export default Navbar;
