import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import styles from './Checkout.module.css';
import { shallow } from 'zustand/shallow';

function Checkout() {
  const cart = useCartStore((state) => state.cart, shallow);
  const total = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();
  const apiUrl = 'http://localhost:3001';

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart, total }),
      });

      if (response.ok) {
        alert('Your order has been placed successfully! (Simulated)');
        clearCart();
        navigate('/');
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Error placing order: ${errorData.message || 'There was an issue placing your order.'}`);
        console.error('Order placement error (server):', errorData);
      }
    } catch (error) {
      alert('Error connecting to the server.');
      console.error('Order placement error (connection):', error);
    }
  };

  if (cart.length === 0) {
    return <div className={styles.emptyCartMessage}>Your cart is empty. Cannot proceed to checkout.</div>;
  }

  return (
    <div className={styles.checkoutContainer}>
      <h2>Checkout</h2>
      <div className={styles.cartItems}>
        <h3>Shopping Cart Items:</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <span>{item.name} (Quantity: {item.quantity})</span>
              <span>Unit Price: ${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.total}>
        <p>Total: ${total.toFixed(2)}</p>
      </div>
      <button onClick={handlePlaceOrder} className={styles.placeOrderButton}>
        Confirm and Place Order
      </button>
    </div>
  );
}

export default Checkout;
