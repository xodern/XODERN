'use client';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { PlusCircle } from 'lucide-react';

const VapeCard = ({ product, onSwipeUp, onAddToCart }) => {
  const [selectedVariation, setSelectedVariation] = useState(null);

  const handlers = useSwipeable({
    onSwipedUp: onSwipeUp,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (!product) {
    return <div>Invalid product data</div>;
  }

  const { name, image_url, variations } = product;

  const handleAddToCart = () => {
    if (selectedVariation) {
      onAddToCart({ ...product, selectedVariation });
    } else {
      alert('Please select a flavor before adding to cart');
    }
  };

  return (
    <div {...handlers} className="bg-black text-white rounded-3xl shadow-lg p-6 max-w-sm w-full relative overflow-hidden">
      {image_url && (
        <img src={image_url} alt={name} className="w-full h-64 object-cover mb-6 rounded-2xl" />
      )}
      <h2 className="text-3xl font-bold mb-4 text-center">{name}</h2>
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {variations.map((variation) => (
          <button
            key={variation.id}
            className={`bg-gray-800 text-white px-4 py-2 rounded-full text-sm ${selectedVariation === variation ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setSelectedVariation(variation)}
          >
            {variation.name}
          </button>
        ))}
      </div>
      <button 
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-full text-lg font-semibold flex items-center justify-center transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        onClick={handleAddToCart}
      >
        <PlusCircle className="mr-2" size={24} />
        Add to Cart
      </button>
      <div className="mt-4 text-center text-gray-400 text-sm">
        {selectedVariation ? selectedVariation.price : 'Select a flavor'}
      </div>
      <div className="mt-2 text-center text-gray-400 text-xs">
        Swipe up for next product
      </div>
    </div>
  );
};

export default VapeCard;