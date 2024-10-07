'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, ShoppingCart, Home, FileText, Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setIsDeleting(true),
    onSwipedRight: () => setIsDeleting(false),
    trackMouse: true
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ type: 'spring', stiffness: 500, damping: 50 }}
      className="mb-6 bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
      {...swipeHandlers}
    >
      <div className="flex">
        <div className="w-1/3">
          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover rounded-l-3xl" />
        </div>
        <div className="w-2/3 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{item.name}</h2>
            <p className="text-sm text-gray-300 mb-4">{item.selectedVariation.name}</p>
            <p className="text-3xl font-bold text-white mb-6">{item.selectedVariation.price}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 bg-gray-800 rounded-full p-1">
              <button 
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 hover:bg-gray-600 transition-colors"
                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
              >
                <Minus size={20} />
              </button>
              <span className="text-xl font-semibold text-white w-8 text-center">{item.quantity}</span>
              <button 
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 hover:bg-gray-600 transition-colors"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus size={20} />
              </button>
            </div>
            <button 
              onClick={() => removeFromCart(item.id)} 
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </div>
      {isDeleting && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-0 right-0 bottom-0 bg-red-600 flex items-center px-4"
        >
          <button onClick={() => removeFromCart(item.id)} className="text-white">
            <X size={24} />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

const CartPage = ({ onReturnToShop }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (typeof window === 'undefined') {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen font-sans">
      <header className="p-6 flex justify-between items-center">
        <div className="text-sm text-gray-400"></div>
        <h1 className="text-4xl font-bold text-white tracking-wider">CART</h1>
        <div className="w-10"></div>
      </header>

      <div className="px-6 pb-32 overflow-y-auto max-h-[calc(100vh-200px)]">
        <AnimatePresence>
          {cartItems.map((item) => (
            <CartItem 
              key={item.id} 
              item={item} 
              updateQuantity={updateQuantity} 
              removeFromCart={removeFromCart}
            />
          ))}
        </AnimatePresence>
      </div>

      {cartItems.length > 0 && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-20 left-0 right-0 bg-gray-800 bg-opacity-80 backdrop-blur-lg p-6 rounded-t-3xl shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-2xl text-gray-300">Total</span>
            <span className="text-4xl font-bold text-white">${getCartTotal().toFixed(2)}</span>
          </div>
          <button 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors duration-300 transform hover:scale-105"
            onClick={onReturnToShop}
          >
            Return to Shop
          </button>
        </motion.div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 bg-opacity-80 backdrop-blur-lg flex justify-around items-center py-4 px-8">
        <button className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
          <Home size={24} />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
          <FileText size={24} />
        </button>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full text-white shadow-lg transform hover:scale-110 transition-transform">
          <ShoppingCart size={24} />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
          <Settings size={24} />
        </button>
      </nav>
    </div>
  );
};

export default CartPage;