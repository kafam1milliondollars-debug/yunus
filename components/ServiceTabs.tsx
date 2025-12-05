import React from 'react';
import { CategoryData } from '../types';

interface ServiceTabsProps {
  categories: CategoryData[];
  activeId: string;
  onChange: (id: string) => void;
}

export const ServiceTabs: React.FC<ServiceTabsProps> = ({ categories, activeId, onChange }) => {
  return (
    <div className="flex justify-start md:justify-center overflow-x-auto gap-4 px-4 pb-2 no-scrollbar">
      {categories.map((cat) => {
        const isActive = activeId === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`
              relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap border
              ${isActive 
                ? 'bg-purple-900/40 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' 
                : 'bg-transparent border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white'
              }
            `}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};