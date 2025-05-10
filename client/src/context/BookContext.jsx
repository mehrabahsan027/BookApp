import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { baseUrl } from './../utils/baseUrl';
import { useQuery, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";


// Create QueryClient
const queryClient = new QueryClient();

export const BookContext = createContext()


export const BookProvider = ({ children }) => {

  const queryClient = useQueryClient();

  const [cartItems, setCartItems] = useState([]);

  const [cartNumber, setCartNumber] = useState(0);





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

  const addToCart = (book) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item._id === book._id);
  
      if (existingItem) {
        return prevItems.map(item =>
          item._id === book._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
  
      return [...prevItems, { ...book, quantity: 1 }];
    });
  
    setCartNumber(prev => prev + 1);
  };
  

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item._id !== id));
    setCartNumber(prev => Math.max(0, prev - 1));
  };
  


 // Fetch books query
  const fetchBooksQuery = useQuery({
    queryKey: ["books", filters], // Unique key based on filters
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });

      const response = await fetch(`${baseUrl}/books?${params}`);
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();

      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalBooks: data.totalBooks,
      });

      return data.books;
    },
    keepPreviousData: true, // Keep previous data while fetching new (for pagination)
  });


  


  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: newFilters.hasOwnProperty('page') ? newFilters.page : 1
    }));
  }, []);




 







  const value = {
    books: fetchBooksQuery.data || [],
    curentBook: queryClient.getQueryData(["book"]) || null,
    error: fetchBooksQuery.error?.message || null,
    loading: fetchBooksQuery.isLoading,
    pagination,
    fetchBooks: fetchBooksQuery.refetch,
   
    // fetchSingleBook,
    updateFilters,
    filters,

    cartItems,
    cartNumber,
    addToCart,
    removeFromCart,
  };

  console.log(cartNumber);

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

// Export QueryClientProvider wrapper for the app
export const AppWrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <BookProvider>{children}</BookProvider>
  </QueryClientProvider>
);

