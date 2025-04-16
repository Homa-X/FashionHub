import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { SearchContext } from '../context/SearchContext';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const { updateSearchTerm } = useContext(SearchContext);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    updateSearchTerm(event.target.value);
  };

  return (
    <nav className={`${styles.navbar} bg-white shadow-md`}>
      <div className={styles.left}>
        <Link to="/" className={`${styles.logo} text-2xl font-bold`}>
          FashionHub
        </Link>
      </div>
      
      <ul className={`${styles.center} hidden md:flex`}>
        <li><Link to="/" className={styles.navLink}>Home</Link></li>
        <li><Link to="/cart" className={styles.navLink}>Cart</Link></li>
        <li><Link to="/login" className={styles.navLink}>Login</Link></li>
        <li><Link to="/register" className={styles.navLink}>Register</Link></li>
      </ul>
      
      <div className={styles.right}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={`${styles.searchInput} border border-gray-300 rounded-lg px-4 py-2`}
        />
      </div>
    </nav>
  );
}

export default Navbar;
