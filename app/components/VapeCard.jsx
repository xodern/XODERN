'use client';
import React from 'react';
import { useSwipeable } from 'react-swipeable';

const VapeCard = ({ product, onSwipeUp }) => {
  const handlers = useSwipeable({
    onSwipedUp: onSwipeUp,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (!product) {
    return <div>Invalid product data</div>;
  }

  const { name, description, image_url, variations } = product;

  return (
    <div {...handlers} className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full">
      {image_url && (
        <img src={image_url} alt={name} className="w-full h-48 object-cover mb-4 rounded" />
      )}
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      {description && <p className="text-gray-300 mb-4">{description}</p>}
      <h3 className="text-xl font-semibold mb-2">Flavors:</h3>
      <ul className="list-disc pl-5">
        {variations.map((variation) => (
          <li key={variation.id} className="mb-2">
            <span className="font-medium">{variation.name}</span>
            <span className="text-gray-400"> - Price: {variation.price}, Stock: {variation.stock}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-center text-gray-400">
        Swipe up for next product
      </div>
    </div>
  );
};

export default VapeCard;