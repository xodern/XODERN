"use client";
import React, { useState, useEffect } from "react";
import VapeCard from "../components/VapeCard";
import { ShoppingCart } from "lucide-react";
import CartPage from "../cart/page.js";
import CartButton from "../components/CartButton.jsx";
import { useCart } from '../context/CartContext';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("/api/products")
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
          throw new Error("No products available");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSwipeUp = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handleAddToCart = (productWithVariation) => {
    addToCart(productWithVariation);
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
      {showCart ? (
        <CartPage onReturnToShop={() => setShowCart(false)} />
      ) : (
        <>
          <VapeCard
            product={products[currentIndex]}
            onSwipeUp={handleSwipeUp}
            onAddToCart={handleAddToCart}
          />
          <div className="mt-4 text-gray-400">
            Product {currentIndex + 1} of {products.length}
          </div>
        </>
      )}
      <button
        className="fixed bottom-4 right-4 bg-blue-500 p-3 rounded-full"
        onClick={() => setShowCart(!showCart)}
      >
        <ShoppingCart size={24} />
      </button>
      <CartButton/>
    </div>
  );
};

export default ShopPage;