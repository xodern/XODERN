'use client';
import React, { useState, useEffect } from 'react';
import VapeCard from '../components/VapeCard';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          throw new Error('No products available');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSwipeUp = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  if (loading) {
    return <div className="text-white">Loading products...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-white">No products available.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <VapeCard product={products[currentIndex]} onSwipeUp={handleSwipeUp} />
      <div className="mt-4 text-gray-400">
        Product {currentIndex + 1} of {products.length}
      </div>
    </div>
  );
};

export default ShopPage;