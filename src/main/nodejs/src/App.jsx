// src/App.jsx

import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/context/CartContext";
import CartSidebar from "./components/CartSidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductsPage from "./components/ProductsPage";
import BrandsPage from "./components/Breadcrumbs";
import ProductDetailPage from "./components/ProductDetailPage";
import Slider from "./components/Slider";
import HomeCard from "./components/HomeCard";
import "./css/style.css";
import "./App.css";

// Создадим компонент главной страницы
const HomePage = () => {
  return (
    <>
      <Slider />
      <HomeCard />
    </>
  );
};

const App = () => {
  return (
    <CartProvider>
      <div className="app">
        <Navbar />
        <CartSidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />

          <Route path="/product/:article" element={<ProductDetailPage />} />
          <Route path="/brand" element={<BrandsPage title="Бренды" />} />

          <Route path="/shoes" element={<ProductsPage />} />
          <Route path="/clothing" element={<ProductsPage />} />
          <Route path="/accessories" element={<ProductsPage />} />

          <Route path="/reviews" element={<div>Отзывы</div>} />
          <Route path="/delivery" element={<div>Доставка</div>} />
          <Route path="/payment" element={<div>Оплата</div>} />
          <Route path="/contacts" element={<div>Контакты</div>} />
        </Routes>

        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
