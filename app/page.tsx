'use client';

import { useState, useEffect, useRef } from 'react';
import ColumnContainer from './components/ColumnContainer';
import { Item } from './types';

// Initial data
const initialItems: Item[] = [
  { type: 'Fruit', name: 'Apple' },
  { type: 'Vegetable', name: 'Broccoli' },
  { type: 'Vegetable', name: 'Mushroom' },
  { type: 'Fruit', name: 'Banana' },
  { type: 'Vegetable', name: 'Tomato' },
  { type: 'Fruit', name: 'Orange' },
  { type: 'Fruit', name: 'Mango' },
  { type: 'Fruit', name: 'Pineapple' },
  { type: 'Vegetable', name: 'Cucumber' },
  { type: 'Fruit', name: 'Watermelon' },
  { type: 'Vegetable', name: 'Carrot' },
];

export default function Home() {
  // State to track items in each column
  const [mainItems, setMainItems] = useState<Item[]>(initialItems);
  const [fruitItems, setFruitItems] = useState<Item[]>([]);
  const [vegetableItems, setVegetableItems] = useState<Item[]>([]);
  
  // Use a ref to store timeouts, which won't trigger re-renders
  const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});
  
  // Helper to create a unique key for an item
  const getItemKey = (item: Item): string => `${item.type}-${item.name}`;
  
  // Clean up timeouts when component unmounts
  useEffect(() => {
    const currentTimeouts = timeoutsRef.current;
    return () => {
      // Clear all timeouts on component unmount
      Object.values(currentTimeouts).forEach(timeout => clearTimeout(timeout));
    };
  }, []);
  
  // Handle click on an item in the main list
  const handleMainItemClick = (item: Item) => {
    // Remove the item from main list
    setMainItems(current => current.filter(i => !(i.name === item.name && i.type === item.type)));
    
    // Add the item to the appropriate column
    if (item.type === 'Fruit') {
      setFruitItems(current => [...current, item]);
    } else {
      setVegetableItems(current => [...current, item]);
    }
    
    // Set up auto-return for this item after 5 seconds
    const itemKey = getItemKey(item);
    
    // Clear any existing timeout for this item
    if (timeoutsRef.current[itemKey]) {
      clearTimeout(timeoutsRef.current[itemKey]);
    }
    
    timeoutsRef.current[itemKey] = setTimeout(() => {
      returnItemToMain(item);
    }, 5000);
  };
  
  // Handle click on item in category columns
  const handleCategoryItemClick = (item: Item) => {
    const itemKey = getItemKey(item);
    
    // Clear the timeout for this item
    if (timeoutsRef.current[itemKey]) {
      clearTimeout(timeoutsRef.current[itemKey]);
      delete timeoutsRef.current[itemKey];
    }
    
    // Return item to main list immediately
    returnItemToMain(item);
  };
  
  // Function to return an item to the main list
  const returnItemToMain = (item: Item) => {
    // Remove from category lists
    if (item.type === 'Fruit') {
      setFruitItems(current => current.filter(i => !(i.name === item.name && i.type === item.type)));
    } else {
      setVegetableItems(current => current.filter(i => !(i.name === item.name && i.type === item.type)));
    }
    
    // Add to the main list at the bottom
    setMainItems(current => [...current, item]);
    
    // Clear timeout for this item
    const itemKey = getItemKey(item);
    if (timeoutsRef.current[itemKey]) {
      clearTimeout(timeoutsRef.current[itemKey]);
      delete timeoutsRef.current[itemKey];
    }
  };

  // Handle moving all fruit items back to main list
  const handleMoveAllFruit = () => {
    // First, clear all timeouts for fruit items
    fruitItems.forEach(item => {
      const itemKey = getItemKey(item);
      if (timeoutsRef.current[itemKey]) {
        clearTimeout(timeoutsRef.current[itemKey]);
        delete timeoutsRef.current[itemKey];
      }
    });
    
    // Move all items back to main list
    setMainItems(current => [...current, ...fruitItems]);
    setFruitItems([]);
  };

  // Handle moving all vegetable items back to main list
  const handleMoveAllVegetables = () => {
    // First, clear all timeouts for vegetable items
    vegetableItems.forEach(item => {
      const itemKey = getItemKey(item);
      if (timeoutsRef.current[itemKey]) {
        clearTimeout(timeoutsRef.current[itemKey]);
        delete timeoutsRef.current[itemKey];
      }
    });
    
    // Move all items back to main list
    setMainItems(current => [...current, ...vegetableItems]);
    setVegetableItems([]);
  };
  
  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-center">Auto Sort List</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[85vh]">
        <ColumnContainer 
          title="Main" 
          items={mainItems} 
          onItemClick={handleMainItemClick}
          showResetButton={false}
          onResetAll={() => {}}
        />
        
        <ColumnContainer 
          title="Fruit" 
          items={fruitItems} 
          onItemClick={handleCategoryItemClick}
          showResetButton={fruitItems.length > 0}
          onResetAll={handleMoveAllFruit}
        />
        
        <ColumnContainer 
          title="Vegetable" 
          items={vegetableItems} 
          onItemClick={handleCategoryItemClick}
          showResetButton={vegetableItems.length > 0}
          onResetAll={handleMoveAllVegetables}
        />
      </div>
    </div>
  );
}
