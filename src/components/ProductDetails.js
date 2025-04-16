import React from "react";
import { useParams } from "react-router-dom";
import products from "../data";
import styles from "./ProductDetails.module.css";
import useCartStore from '../store/cartStore';

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const addToCart = useCartStore((state) => state.addToCart);

  if (!product) {
    return <div className={styles.notFoundMessage}>Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`"${product.name}" added to cart!`);
  };

  return (
    <div className={styles.detailsContainer}>
      <h2 className={styles.detailsName}>{product.name}</h2>
      <img
        src={product.imageUrl}
        alt={product.name}
        className={styles.detailsImage}
      />
      <p className={styles.detailsPrice}>Price: ${product.price.toFixed(2)}</p>
      <p className={styles.detailsDescription}>{product.description}</p>
      <button onClick={handleAddToCart} className={styles.addToCartButton}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;
