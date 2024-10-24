import React, { createContext, useContext, useState, useEffect } from "react";
import { getBooks, createBook, deleteBook } from "../../../services/book";
import { Book, BookFormData } from "../../../models/book.model";

interface BooksContextType {
  books: Book[];
  fetchBooks: () => Promise<void>;
  addBook: (book: BookFormData) => Promise<void>;
  removeBook: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const BooksContext = createContext<BooksContextType | null>(null);

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) throw new Error("useBooks must be used within a BooksProvider");
  return context;
};

export const BooksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const { data } = await getBooks();
      setBooks(data);
    } catch (error) {
      console.log(error);
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (book: BookFormData) => {
    try {
      const { data } = await createBook(book);
      setBooks((prevBooks) => [...prevBooks, data]);
    } catch (error) {
      console.log(error);
      setError("Failed to create book");
    }
  };

  const removeBook = async (id: string) => {
    try {
      await deleteBook(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (error) {
      console.log(error);
      setError("Failed to delete book");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, addBook, removeBook, loading, error }}
    >
      {children}
    </BooksContext.Provider>
  );
};
