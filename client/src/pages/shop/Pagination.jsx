import React from 'react'

export default function Pagination({ totalPages, currentPage, onPageChange }) {
    console.log('currentPage', currentPage);
    console.log('totalPages', totalPages);
    
    return (
        <section className='flex justify-center items-center space-x-2 my-4'>
            <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            
            className={`px-5 py-2  text-white  rounded-xl text-2xl font-bold ${currentPage === 1 ? 'bg-gray-200' : 'bg-red-800 cursor-pointer'}`}> {'<'} </button>
            <button 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            
            className={`px-5 py-2  text-white  rounded-xl font-bold text-2xl ${currentPage == totalPages ? 'bg-gray-200' : 'bg-red-800 cursor-pointer'}`}> {'>'} </button>
        </section>
    )
}


