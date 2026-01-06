import React from 'react';

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="flex flex-wrap gap-2 flex-grow md:flex-grow-0">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onSelectCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
                        ${selectedCategory === cat
                            ? 'bg-indigo-600 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                        }`}
                >
                    {cat || 'All Items'}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
