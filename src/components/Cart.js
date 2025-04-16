import React from "react";
import { Link } from "react-router-dom";
import { shallow } from "zustand/shallow";
import useCartStore from "../store/cartStore";
import styles from "./Cart.module.css";

const Cart = () => {
  const cartItems = useCartStore((state) => state.cart, shallow);
  const getTotal = useCartStore((state) => state.getTotalPrice);
  const addItem = useCartStore((state) => state.increaseQuantity);
  const removeItem = useCartStore((state) => state.decreaseQuantity);
  const deleteItem = useCartStore((state) => state.removeFromCart);

  const total = getTotal();

  if (cartItems.length === 0) {
    return <div className={styles.emptyCartMessage}>Your cart is empty.</div>;
  }

  return (
    <div className={styles.cartContainer}>
      <h2>Cart</h2>
      {cartItems.map((product) => (
        <div key={product.id} className={styles.cartItem}>
          <img src={product.imageUrl} alt={product.name} className={styles.cartImage} />
          <div className={styles.cartItemDetails}>
            <h3>{product.name}</h3>
            <p>Unit Price: ${product.price.toFixed(2)}</p>
            <div className={styles.quantityControl}>
              <button onClick={() => removeItem(product.id)}>-</button>
              <span>{product.quantity}</span>
              <button onClick={() => addItem(product.id)}>+</button>
            </div>
            <button onClick={() => deleteItem(product.id)} className={styles.removeButton}>
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className={styles.cartTotal}>
        <p>Total Price: ${total.toFixed(2)}</p>
        <Link to="/checkout" className={styles.checkoutButton}>
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
