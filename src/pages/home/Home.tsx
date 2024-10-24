import React, { useState, useEffect } from "react";
import { BooksProvider, useBooks } from "./context/BooksContext";
import BookCard from "./components/BookCard";
import { getCategories } from "../../services/category";
import { Category } from "../../models/category.model";

const Home: React.FC = () => {
  return (
    <BooksProvider>
      <BookGallery />
    </BooksProvider>
  );
};

const BookGallery: React.FC = () => {
  const { books, loading, error } = useBooks();

  // Estados para los filtros
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [category, setCategory] = useState<any>(""); // Filtro por categoría
  const [categories, setCategories] = useState<Category[]>([]); // Filtro por categoría
  const [searchTerm, setSearchTerm] = useState(""); // Filtro por nombre del libro o autor
  const [startDate, setStartDate] = useState(""); // Filtro por fecha de inicio de publicación
  const [endDate, setEndDate] = useState(""); // Filtro por fecha de fin de publicación

  const handleGetCategories = async () => {
    try {
      const tempCategories: any = await getCategories();
      setCategories(tempCategories.data);
      console.log(tempCategories, "categories");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  useEffect(() => {
    // Función para filtrar los libros
    const filterBooks = () => {
      let tempBooks = books;

      // Filtrar por categoría
      if (category) {
        console.log(category, "la cat");
        tempBooks = tempBooks.filter((book) =>
          book.categories.find((c) => c._id === category)
        );
      }

      // Filtrar por nombre del libro o del autor
      if (searchTerm) {
        tempBooks = tempBooks.filter(
          (book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.authors.some((author: any) =>
              author.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
      }

      // Filtrar por rango de fechas
      if (startDate && endDate) {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        tempBooks = tempBooks.filter((book) => {
          const publishedDate = new Date(book.publishedDate).getTime();
          return publishedDate >= start && publishedDate <= end;
        });
      }

      // Actualizar el estado con los libros filtrados
      setFilteredBooks(tempBooks);
    };

    filterBooks();
  }, [books, category, searchTerm, startDate, endDate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid place-content-center w-full">
      {/* Barra de búsqueda y filtros */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Buscar por libro o autor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mr-2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="">Todas las categorías</option>

          {categories.map((item: Category) => (
            <option value={item._id}>{item.name}</option>
          ))}
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2"
        />
      </div>

      <div className="container mx-auto grid grid-cols-3 gap-10 my-10 w-full">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <BookCard key={book._id} book={book} />)
        ) : (
          <div>No se encontraron resultados</div>
        )}
      </div>
    </div>
  );
};

export default Home;
