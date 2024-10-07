'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

function getInitialCartState() {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getInitialCartState);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => 
        item.id === product.id && item.selectedVariation.name === product.selectedVariation.name
      );
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id && item.selectedVariation.name === product.selectedVariation.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter(item => item.id !== productId);
      if (newItems.length === 0) {
        localStorage.removeItem('cart');
      }
      return newItems;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => 
      total + parseFloat(item.selectedVariation.price.replace('$', '')) * item.quantity, 0
    );
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};