import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Footer = () => {
 return (
 <footer className="footer">
 <div className="container">
 <div className="footer-left">
 <h3>Пользователю</h3>
 <ul>
 <Link className='link' href="#">Отзывы</Link>
 <Link className='link' href="#">Доставка</Link>
 <Link className='link' href="#">Оплата</Link>
 <Link className='link' href="#">Расчёт стоимости доставки</Link>
 <Link className='link' href="#">Отследить свой заказ</Link>
 <Link className='link' href="#">Как оформить заказ</Link>
 <Link className='link' href="#">Как выбрать размер</Link>
 <Link className='link' href="#">Часто задаваемые вопросы</Link>
 <Link className='link' href="#">Подарочные сертификаты</Link>
 </ul>
 </div>
 <div className="footer-center">
 <h3>Правовая информация</h3>
 <ul>
 <Link className='link' href="#">Пользовательские соглашение</Link>
 <Link className='link' href="#">Публичная оферта</Link>
 <Link className='link' href="#">Политика кондифициальности</Link>
 <Link className='link' href="#">Сотрудничество</Link>
 <Link className='link' href="#">Контакты</Link>
 </ul>
 </div>
 <div className="footer-right">
 <div className="footer-logo">
 <h2>OG-CLOTHES</h2>
 <p>OG-CLOTHES - это интернет-магазин крутых кроссовок и одежды по самым вкусным ценам. В ассортименте более 100 000 товаров.</p>
 </div>
 <div className="footer-contact">
 {/* <p>8 (800) 777-97-10</p>
 <p>Работаем с 07:00 до 19:00</p> */}
 <span>Для партнеров:<a href='mailto:'>example@mail.ru</a></span>
 <span>Для предложений:<a href='mailto:'>example@mail.ru</a></span>
 <span>Для общей информации:<a href='mailto:'>example@mail.ru</a></span>
 <p>Подпишись на наши социальные сети</p>
 </div>
 <div className="footer-payment">
 <img src="path_to_visa_logo" alt="Visa" />
 <img src="path_to_mastercard_logo" alt="applePay" />
 <img src="path_to_mastercard_logo" alt="Mastercard" />
 <img src="path_to_mir_logo" alt="МИР" />
 </div>
 </div>
 </div>
 <div className="footer-bottom">
 <p>&copy; 2025 ООО Умные технологии. Все права защищены</p>
 </div>
 </footer>
 );
};

export default Footer;

