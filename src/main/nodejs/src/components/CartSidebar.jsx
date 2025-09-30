// Корзина

import { useContext, useEffect, useState } from "react";
import styles from "./CartSidebar.module.css";
import { CartContext } from "./context/CartContext";
import { useNavigate } from "react-router-dom";

const getSuffix = (count) => {
  if (count === 1) {
    return "товар";
  }
  if ([2, 3, 4].includes(count)) {
    return "товара";
  }
  return "товаров";
};

const CartSidebar = () => {
  const { items, addItem, removeItem, clearCart, isOpen, closeCart } =
    useContext(CartContext);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isFinalModalOpen, setIsFinalModalOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleCheckoutClick = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleCloseCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
  };

  const handleSubmitCheckout = (data) => {
    setCheckoutData(data);
    setIsCheckoutModalOpen(false);
    setIsFinalModalOpen(true);
  };

  const handleCloseFinalModal = () => {
    setIsFinalModalOpen(false);
    setCheckoutData(null);
    clearCart();
    closeCart();
  };

  const handleItemClick = (item) => {
    navigate(`/product/${item.id}`);
    closeCart();
  };

  const handleRemoveItem = (item) => {
    removeItem(item.id);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      removeItem(item.id, 1);
    } else {
      removeItem(item.id);
    }
  };

  const handleIncreaseQuantity = (item) => {
    addItem(item);
  };

  return (
    <>
      <div
        className={`${styles.cart} ${isOpen ? styles.open : ""}`}
        onClick={closeCart}
      >
        <div
          className={styles.cart_dialog}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className={styles.header}>
            <h2>Корзина</h2>
          </div>

          <div className={styles.content}>
            <div className={styles.summary}>
              <span>
                {totalCount} {getSuffix(totalCount)} на{" "}
                {calculateTotal().toLocaleString("ru-RU")} ₽
              </span>
            </div>

            <div className={styles.items}>
              {items.length === 0 ? (
                <div className={styles.empty}>Корзина пуста</div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className={styles.item}
                    onClick={(e) => {
                      if (e.target.tagName !== "BUTTON") {
                        handleItemClick(item);
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      className={styles.image}
                    />

                    <div className={styles.item_info}>
                      <button
                        className={styles.delete}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveItem(item);
                        }}
                      >
                        ×
                      </button>
                      <div className={styles.details}>
                        <p className={styles.item_name}>{item.name}</p>
                        <p className={styles.item_brand}>{item.brand || ""}</p>
                        {item.size && (
                          <p className={styles.item_size}>
                            Размер: {item.size}
                          </p>
                        )}
                        {item.color && (
                          <p className={styles.item_color}>
                            Цвет: {item.color}
                          </p>
                        )}
                      </div>
                      <div className={styles.price_and_counter}>
                        <p className={styles.item_price}>
                          {item.price?.toLocaleString("ru-RU")} ₽
                        </p>
                        <div className={styles.counter}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDecreaseQuantity(item);
                            }}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIncreaseQuantity(item);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.total_section}>
              <div className={styles.total_label}>Сумма заказа</div>
              <div className={styles.total_price}>
                {calculateTotal().toLocaleString("ru-RU")} ₽
              </div>
            </div>
            <button
              className={styles.checkout}
              onClick={handleCheckoutClick}
              disabled={items.length === 0}
            >
              Перейти к оформлению
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <button className={styles.close_button} onClick={closeCart}>
          ×
        </button>
      )}

      {/* {isCheckoutModalOpen && (
        <CheckoutModal
          onClose={handleCloseCheckoutModal}
          onSubmit={handleSubmitCheckout}
          totalAmount={calculateTotal()}
          items={items}
        />
      )}

      {isFinalModalOpen && (
        <FinalModal
          onClose={handleCloseFinalModal}
          checkoutData={checkoutData}
          totalAmount={calculateTotal()}
        />
      )} */}
    </>
  );
};

export default CartSidebar;
