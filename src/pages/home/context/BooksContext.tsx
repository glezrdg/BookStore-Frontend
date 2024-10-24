import React, { createContext, useContext, useState, useEffect } from "react";
import { Book } from "../../../models/book.model";
import { getBooks } from "../../../services/book";

interface BooksContextType {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const BooksContext = createContext<BooksContextType | null>(null);

// Custom hook to use the BooksContext
export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) throw new Error("useBooks must be used within a BooksProvider");
  return context;
};

// BooksProvider component to wrap the Home section
export const BooksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks(); // Call API
        console.log(response.data, "books");
        setBooks(response.data); // Set books state
      } catch (error) {
        console.log(error);
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={{ books, loading, error }}>
      {children}
    </BooksContext.Provider>
  );
};
