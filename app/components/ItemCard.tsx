import React, { useState } from 'react';
import { Item, Column } from '../types';

interface ItemCardProps {
  item: Item;
  currentColumn: Column;
  onItemClick: (item: Item) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, currentColumn, onItemClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Determine button styles based on current column and item type
  const getButtonStyles = () => {
    const baseStyles = "px-4 py-2 rounded-md transition-all duration-200 text-white font-medium w-full";
    const animationClass = isAnimating ? "scale-95 opacity-70 shadow-inner" : "transform hover:scale-102 hover:shadow-md";

    if (currentColumn === 'Main') {
      return `${baseStyles} ${animationClass} bg-blue-500 hover:bg-blue-600`;
    } else if (item.type === 'Fruit') {
      return `${baseStyles} ${animationClass} bg-orange-500 hover:bg-orange-600`;
    } else {
      return `${baseStyles} ${animationClass} bg-green-500 hover:bg-green-600`;
    }
  };

  const handleClick = () => {
    setIsAnimating(true);

    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
      onItemClick(item);
    }, 150);
  };

  return (
    <button
      className={getButtonStyles()}
      onClick={handleClick}
    >
      {item.name}
    </button>
  );
};

export default ItemCard; 