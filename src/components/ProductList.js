import React, { useContext } from 'react';
import styles from './ProductList.module.css';
import { Link } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import useCartStore from '../store/cartStore';

const ProductList = ({ products }) => {
  const { searchTerm } = useContext(SearchContext);
  const addToCart = useCartStore((state) => state.addToCart);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`"${product.name}" added to cart!`);
  };

  return (
    <div className={styles.productListContainer}>
      {filteredProducts.map((product) => (
        <div key={product.id} className={styles.listItem}>
          <Link to={`/products/${product.id}`} className={styles.productLink}>
            <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
          </Link>
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
          <button
            className={styles.addToCartButton}
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
