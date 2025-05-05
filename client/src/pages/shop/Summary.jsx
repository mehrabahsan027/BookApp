import React from 'react'

export default function Summary({ pagination, filters }) {
  return (
    <div className='text-center text-stone-600 font-medium mt-3'>
    Showing {pagination.totalBooks > 0 ? (pagination.currentPage - 1) * filters.limit + 1 : 0}
    - <span>{Math.min(pagination.currentPage * filters.limit, pagination.totalBooks)} </span>
    of {pagination.totalBooks} books
</div>
  )
}
