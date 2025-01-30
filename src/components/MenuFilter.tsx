import React from 'react';
import { Menu } from 'lucide-react';

interface MenuFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function MenuFilter({ selectedCategory, onCategoryChange }: MenuFilterProps) {
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'jantinha', name: 'Jantinha' },
    { id: 'espetos', name: 'Espetos' },
    { id: 'hamburgers', name: 'Hamburgers' },
    { id: 'bebidas', name: 'Bebidas' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-2 rounded-full transition-all duration-200 ${
            selectedCategory === category.id
              ? 'bg-red-500 text-white shadow-md transform scale-105'
              : 'bg-white text-gray-700 hover:bg-red-50'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}