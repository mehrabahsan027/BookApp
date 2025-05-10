import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { baseUrl } from './../utils/baseUrl';
import { useQuery, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";


// Create QueryClient
const queryClient = new QueryClient();

export const BookContext = createContext()


export const BookProvider = ({ children }) => {

  const [books, setBooks] = useState([])
  const [curentBook, setCurrentBook] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)



  // Match server pagination defaults
  const [filters, setFilters] = useState({
    page: 1,
    limit: 6,
    genre: '',
    minYear: '',
    maxYear: '',
    author: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'title',
    order: 'asc',
    search: ''
  });

  // Pagination state matching server response
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBooks: 0
  });

  const fetchBooks = useCallback(
    async () => {
      setLoading(true)
      try {

        setError(null)

        const params = new URLSearchParams()

        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            params.append(key, value)
          }
        })

        console.log(params);




        const response = await fetch(`${baseUrl}/books?${params}`)
        const data = await response.json()
        console.log(data);

        setBooks(data?.books)

        setPagination({
          currentPage: data.currentPage,
          totalPages: data.totalPages,
          totalBooks: data.totalBooks
        });

        console.log(pagination);



      } catch (error) {
        setError(error?.message)
      } finally {
        setLoading(false)
      }
    }, [filters]

  )



  const fetchSingleBook = useCallback(async (id) => {
    setLoading(true)
    try {
      setError(null)
      const response = await fetch(`http://localhost:3000/books/${id}`)
      const data = await response.json()
      setCurrentBook(data?.book)
      return data?.book
    } catch (error) {
      setError(error?.message)
      throw new Error(error?.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const clearCurrentBook = useCallback(() => {
    setCurrentBook(null);
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: newFilters.hasOwnProperty('page') ? newFilters.page : 1
    }));
  }, []);




 







  const value = {
    books, curentBook, error, loading, pagination, fetchBooks, clearCurrentBook, fetchSingleBook, updateFilters, filters
  }

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  )
}

export const useBooks = () => {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider")
  }
  return context
}