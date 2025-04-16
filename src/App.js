import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import { SearchProvider } from './context/SearchContext';
import products from './data';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <SearchProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<ProductList products={products} />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </SearchProvider>
  );
}

export default App;
