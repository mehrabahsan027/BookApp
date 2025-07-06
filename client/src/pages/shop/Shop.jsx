import React, { Suspense, lazy } from "react";
import { useBooks } from "../../context/BookContext";

import Summary from "./Summary";
import BooksCategory from "./BooksCategory";
import SortBooks from "./SortBooks";
import Pagination from "./Pagination";
import BooksLoading from "./BooksLoading";
import BookCard from "./BookCard";

export default function Shop() {
  const {
    books,
    loading,

    filters,
    pagination,
    updateFilters,
  } = useBooks();

  const categories = [
    "All Collections",
    "Fiction",
    "Adventure",
    "Romance",
    "Horror",

    "Epic",
    "Satire",
    "Fantasy",
  ];

  const handleCategoryChange = (category) => {
    updateFilters({
      genre: category === "All Collections" ? "" : category,
      page: 1,
    });
  };

  const handleSortChange = (sortConfig) => {
    updateFilters({
      sortBy: sortConfig.sortBy,
      order: sortConfig.order,
      page: 1,
    });
  };

  const handleClearFilters = () => {
    updateFilters({
      search: "",
      genre: "",
      sortBy: "title",
      order: "asc",
      page: 1,
    });
  };

  const handlePageChange = (newPage) => {
    updateFilters({ page: newPage });
  };

  return (
    <section className="bg-gradient-to-r from-green-50 to-red-50  min-h-screen flex justify-center items-start w-full">
      <div className=" mt-4">
        {/* filtering section with category and sort */}
        <div className="flex flex-col md:flex-row justify-center sm:justify-between border-b border-gray-200 items-center pb-2 ">
          <BooksCategory
            categories={categories}
            activeCategory={filters.genre || "All Collections"}
            onCategoryChange={handleCategoryChange}
          />

          {/* clear search */}
          <div onClick={() => handleClearFilters()}>
            <button className="px-4 py-2 bg-red-700 cursor-pointer text-white rounded-xl">
              Clear Search
            </button>
          </div>

          {/* Add sorting controls */}
          <div className="py-4 flex justify-end  px-4">
            <SortBooks
              currentSort={{
                sortBy: filters.sortBy,
                order: filters.order,
              }}
              onSortChange={handleSortChange}
            />
          </div>
        </div>

        {/* result summary */}
        <Summary pagination={pagination} filters={filters} />

        {/* books grid */}

        {books && books?.length > 0 ? (
          <div className="w-full   max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
              books.map((book) => <BookCard key={book._id} book={book} />)}
          </div>
        ) : (
          <BooksLoading />
        )}

        {/* pagination */}
        {!loading && books?.length > 0 && pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
}
