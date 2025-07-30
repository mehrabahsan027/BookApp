import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { useQuery, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { baseUrl } from './../utils/baseUrl';


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

 
  

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item._id !== id));
    setCartNumber(cartItems ? cartItems.length -1 : 0);
    console.log(cartItems);
    
  };
  


 // Fetch books query
 const fetchBooksQuery = useQuery({
  queryKey: ['books', filters],
  queryFn: async () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        params.append(key, value);
      }
    });

    try {
      console.log(baseUrl);
      
      const response = await fetch(`${baseUrl}/books?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setPagination({
        currentPage: data.currentPage || 1,
        totalPages: data.totalPages || 1,
        totalBooks: data.totalBooks || 0,
      });

      return data.books || [];
    } catch (error) {
      console.error('Fetch books error:', error);
      throw error;
    }
  },
  keepPreviousData: true,
  retry: 5, // Retry failed requests up to 2 times
  staleTime: 1000 * 60, // Data stays fresh for 1 minute
});


const addToCart = (book) => {
  setCartItems((prevItems) => {
    const existingItem = prevItems?.find(item => item._id === book._id);

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

