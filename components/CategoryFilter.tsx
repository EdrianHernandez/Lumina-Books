import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Filter } from 'lucide-react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isSelected = (name: string) => selectedCategory === name;

  return (
    <nav className="category-filter w-full">
      <div className="flex items-center gap-2 mb-4 px-2">
        <Filter className="w-4 h-4 text-slate-500" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Browse Categories
        </h3>
      </div>
      
      <div className="space-y-1">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedCategory === null 
              ? 'bg-brand-50 text-brand-700' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Books
        </button>

        {categories.map(category => (
          <div key={category.id} className="select-none">
            <div 
              className={`group flex items-center w-full px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${
                 isSelected(category.name) ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
              onClick={() => onSelectCategory(category.name)}
            >
              <span className="flex-grow">{category.name}</span>
              {category.subcategories && category.subcategories.length > 0 && (
                <button 
                  className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600"
                  onClick={(e) => toggleExpand(category.id, e)}
                >
                  {expanded[category.id] ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronRight className="w-3 h-3" />
                  )}
                </button>
              )}
            </div>

            {category.subcategories && expanded[category.id] && (
              <div className="ml-4 pl-2 border-l border-slate-200 mt-1 space-y-1 mb-2">
                {category.subcategories.map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => onSelectCategory(sub.name)}
                    className={`block w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                      isSelected(sub.name)
                        ? 'text-brand-600 bg-brand-50 font-medium'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default CategoryFilter;