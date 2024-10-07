'use client';
import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, X } from 'lucide-react';

const CartPage = ({ onReturnToShop }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cartItems.reduce((total, item) => 
    total + parseFloat(item.selectedVariation.price.replace('$', '')) * item.quantity, 0
  );

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">CART</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-4 bg-gray-900 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center flex-1">
                <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                <div>
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-sm text-gray-400">{item.selectedVariation.name}</p>
                  <p className="font-bold text-lg mt-1">{item.selectedVariation.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                >
                  <Minus size={20} />
                </button>
                <span className="mx-3 text-lg">{item.quantity}</span>
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus size={20} />
                </button>
                <button 
                  className="ml-6 text-red-500 hover:text-red-400"
                  onClick={() => removeFromCart(item.id)}
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 border-t border-gray-800 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl">Total:</span>
              <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <button 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity"
              onClick={onReturnToShop}
            >
              Return to Shop
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;