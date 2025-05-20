import React from 'react';
import { Item, Column } from '../types';

interface ItemCardProps {
  item: Item;
  currentColumn: Column;
  onItemClick: (item: Item) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, currentColumn, onItemClick }) => {
  // Determine button styles based on current column and item type
  const getButtonStyles = () => {
    const baseStyles = "px-4 py-2 rounded-md transition-colors text-white font-medium w-full";
    
    if (currentColumn === 'Main') {
      return `${baseStyles} bg-blue-500 hover:bg-blue-600`;
    } else if (item.type === 'Fruit') {
      return `${baseStyles} bg-orange-500 hover:bg-orange-600`;
    } else {
      return `${baseStyles} bg-green-500 hover:bg-green-600`;
    }
  };

  return (
    <button 
      className={getButtonStyles()}
      onClick={() => onItemClick(item)}
    >
      {item.name}
    </button>
  );
};

export default ItemCard; 