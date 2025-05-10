import React, { useEffect } from 'react'
import { useBooks } from '../../context/BookContext'

import BookCard from './BookCard'
import Summary from './Summary';
import BooksCategory from './BooksCategory';
import SortBooks from './SortBooks';
import Pagination from './Pagination';



export default function Shop() {
    const { books,
        loading,
        error,
        fetchBooks,
        filters,
        pagination,
        updateFilters } = useBooks()

    const categories = [
        'All Collections',
        'Fiction',
        'Adventure',
        'Romance',
        'Horror',


        'Epic', 'Satire',
        'Fantasy'
    ];

    const handleCategoryChange = (category) => {
        updateFilters({
            genre: category === 'All Collections' ? '' : category,
            page: 1
        });
    };

    const handleSortChange = (sortConfig) => {
        updateFilters({
            sortBy: sortConfig.sortBy,
            order: sortConfig.order,
            page: 1
        });
    };

    const handleClearFilters = () => {
        updateFilters({
            search: '',
            genre: '',
            sortBy: 'title',
            order: 'asc',
            page: 1
        });
    }

    const handlePageChange = (newPage) => {
        updateFilters({ page: newPage });
        // window.scrollTo({ top: '50%', behavior: 'smooth' });
      };





    return (
        <section className='bg-gray-100   min-h-screen flex justify-center items-start w-full'>

            {loading ? (
               
                <div className="flex items-center justify-center min-h-[200px] w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              </div>
            ) : books?.length > 0 ? (

                // books info section 
                <div className=' mt-4'>

                    {/* filtering section with category and sort */}
                    <div className='flex flex-col md:flex-row justify-center sm:justify-between border-b border-gray-200 items-center pb-2 '>

                        <BooksCategory
                            categories={categories}
                            activeCategory={filters.genre || 'All Collections'}
                            onCategoryChange={handleCategoryChange}

                        />

                        {/* clear search */}
                        <div onClick={() => handleClearFilters()}><button className='px-4 py-2 bg-red-700 cursor-pointer text-white rounded-xl'>Clear Search</button></div>

                        {/* Add sorting controls */}
                        <div className="py-4 flex justify-end  px-4">
                            <SortBooks
                                currentSort={{
                                    sortBy: filters.sortBy,
                                    order: filters.order
                                }}
                                onSortChange={handleSortChange}
                            />
                        </div>



                    </div>

                    {/* result summary */}
                    <Summary pagination={pagination} filters={filters} />

                    {/* books grid */}
                    <div className="w-full   max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">




                        {books.map((book) => (

                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>

                    {/* pagination */}
                    {pagination.totalPages > 1 && (
                        <Pagination
                            currentPage={pagination.currentPage}
                            totalPages={pagination.totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}

                </div>


            ) : (
                <div>
                    <h1 className="text-2xl font-bold text-gray-700 mt-8 mb-3">No books found</h1>

                    {/* clear search */}
                    <div onClick={() => handleClearFilters()}><button className='px-4 py-2 bg-red-700 cursor-pointer text-white rounded-xl'>Clear Search</button></div>
                </div>

            )}


        </section>
    )
}
