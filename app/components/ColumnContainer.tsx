import React from 'react';
import { Item, Column } from '../types';
import ItemCard from './ItemCard';

interface ColumnContainerProps {
  title: Column;
  items: Item[];
  onItemClick: (item: Item) => void;
  showResetButton: boolean;
  onResetAll: () => void;
}

const ColumnContainer: React.FC<ColumnContainerProps> = ({ 
  title, 
  items, 
  onItemClick,
  showResetButton,
  onResetAll
}) => {
  return (
    <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md min-h-[500px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-center">{title} List</h2>
        {showResetButton && (
          <button 
            className="px-2 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
            onClick={onResetAll}
          >
            Reset All
          </button>
        )}
      </div>
      
      <div className="space-y-2 flex-grow">
        {items.length > 0 ? (
          items.map((item, index) => (
            <ItemCard
              key={`${item.name}-${index}`}
              item={item}
              currentColumn={title}
              onItemClick={onItemClick}
            />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center italic">
            No items
          </p>
        )}
      </div>
    </div>
  );
};

export default ColumnContainer; 