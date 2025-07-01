import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import React from "react";
import { Search, Heart, User, ShoppingCart, ChevronDown, MapPin } from "lucide-react";
import '../css/style.css';

const Navbar = () => {
  return (
    <header className="header">

      <div className="header-block_context">
        БЕСПЛАТНАЯ ДОСТАВКА ПРИ ЗАКАЗЕ ОТ 10 000 РУБЛЕЙ
      </div>

       <div className='lpppl'>
        <div className="search">
          <div className="search-container">
            <input
              type="text"
              placeholder="Название модели, товар или артикул"
              className="input"
            />
            <Search className="icons-search" size={30} />
          </div>
        </div>

        {/* Icons */}
        <div className="icons-type">
          <Heart className='' size={35} />
          <ShoppingCart size={35} />
          <User size={35} />
        </div>
        </div>

      {/* Navigation */}
      <nav className="nav-container">
        <ul className="nav-list">
          <Link to="/#" className="nav-items">Бренды</Link>
          <Link to="/#" className="nav-items">Обувь</Link>
          <Link to="/#" className="nav-items">Одежда</Link>
          <Link to="/#" className="nav-items">Аксессуары</Link>
          <Link to="/#" className="nav-items">Для мужчин</Link>
          <Link to="/#" className="nav-items">Для женщин</Link>
          <Link to="/#" className="nav-items">Экспорт товаров из Китая</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;



