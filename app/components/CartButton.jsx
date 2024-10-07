'use client';
import React from 'react';
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from '../context/CartContext';

const CartButton = () => {
  const { cartItems } = useCart();

  return (
    <Link href="/cart" className="fixed top-4 right-4 z-50">
      <button className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-200 shadow-md relative">
        <ShoppingCart className="w-6 h-6" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cartItems.length}
          </span>
        )}
      </button>
    </Link>
  );
};

export default CartButton;