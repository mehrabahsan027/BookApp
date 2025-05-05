import React, { useState } from 'react'
import banner from '../assets/hero-section.jpg'

import { FaSearch } from 'react-icons/fa';
import { useBooks } from '../context/BookContext';

export default function Hero() {
    const { updateFilters } = useBooks();
    const [searchInput, setSearchInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Just update filters - the useEffect in context will handle the fetch
        updateFilters({
          search: searchInput.trim(),
          page: 1
        });
        setSearchInput(''); // Clear the input after submission
      };

      const handleClear = () => {
        setSearchInput('');
        updateFilters({
          search: '',
          page: 1
        });
      };




    return (
        <section className='hero-bg relative overflow-hidden'>



            <div className='container mx-auto px-4 py-16 flex flex-col lg:flex-row flex-wrap items-center justify-between '>

           {/* text and search */}
                <div className='w-full lg:w-1/2 text-yellow-50 px-6'>
                    <h1 className='text-3xl text-center lg:text-left md:text-5xl font-bold leading-tight mb-4'>
                        <span> Where Readers Unite</span> <br />
                        <span>Over Books.</span>
                    </h1>



                    
                <form onSubmit={handleSubmit} className="mt-8 relative max-w-xl mb-6 lg:mb-0 mx-auto">
            <div className="relative">
              <input
              required
                type="text"
                placeholder="Enter title or author"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-6 py-4 pl-12 rounded-full bg-gray-800 text-white border 
                         border-gray-700 focus:outline-none focus:border-amber-500 pr-32"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              
           
              
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-500 
                         text-gray-900 text-sm md:text-base px-6 py-2 rounded-full font-semibold hover:bg-amber-400 
                         transition-colors disabled:opacity-50 disabled:hover:bg-amber-500 
                         disabled:cursor-not-allowed"
              >
                SEARCH
              </button>
            </div>
          </form>

                </div>



{/* image */}
                <div className='w-full lg:w-1/2 '>
                    <img src={banner} className='w-11/12 h-fit  object-cover mx-auto rounded-2xl shadow-md shadow-amber-100' alt="book" />

                </div>




            </div>
        </section>
    )
}
