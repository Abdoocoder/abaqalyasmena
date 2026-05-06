import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import Contact from './pages/Contact';
import Offers from './pages/Offers';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/offers" element={<Offers />} />
      {/* Fallback for other pages */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
