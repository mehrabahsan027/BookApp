import React from 'react'
import { Link } from 'react-router'

export default function BookCard({book}) {

  return (
    <div className="group shadow-md rounded-lg">
    {/* Book Image */}
    <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-green-50 p-8 relative group">
      <img
        src={book.imageUrl || '/placeholder-book.jpg'}
        alt={book.title}
        className="w-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Link to={`${book.bookUrl}`} target='_blank' className="bg-red-700 text-white py-2 px-4 rounded cursor-pointer font-medium">
          View Details
        </Link>
      </div>
    </div>
    
    {/* Book Details */}
    <div className="space-y-2 p-4">
      <h3 className="text-lg font-medium text-gray-900">
        {book.title}
      </h3>
      <p className="text-sm text-gray-500">
        {book.author}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-amber-700 font-medium">
          $ {book?.price.toFixed(2)} USD
        </p>
        <div className="flex space-x-2">
        
          <button 
            onClick={() => onDelete(book._id)}
            className="text-white bg-amber-700 hover:bg-amber-800 px-4 py-2 rounded-lg transition duration-300 ease-in-out"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}
