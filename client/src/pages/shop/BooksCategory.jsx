import React from 'react'

export default function BooksCategory({ categories, activeCategory, onCategoryChange }) {
  return (

      <div className=" px-4 py-4">
        <nav className="flex  items-center flex-wrap space-x-8 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`whitespace-nowrap cursor-pointer py-2 px-1 border-b-2 text-sm font-semibold transition-colors 
                ${category === activeCategory
                  ? 'border-red-700 text-red-700' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>
   
  )
}
