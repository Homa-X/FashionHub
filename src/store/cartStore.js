import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cart: [],
  addToCart: (product) => set((state) => ({ cart: [...state.cart, { ...product, quantity: 1 }] })),
  removeFromCart: (productId) => set((state) => ({ cart: state.cart.filter((item) => item.id !== productId) })),
  increaseQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),
  decreaseQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
  getTotalItems: () => get().cart.reduce((total, item) => total + item.quantity, 0),
  getTotalPrice: () => {
    const cart = get().cart;
    return cart && cart.length > 0 ? cart.reduce((total, item) => total + item.quantity * item.price, 0) : 0;
  },
  getSnapshot: () => get().cart, 
}));

export default useCartStore;
