import React, { useState } from "react";
import BookModal from "./BookModal";
import { Book } from "../../../models/book.model";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="p-4 bg-white w-full text-black rounded-2xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  ">
      <h2 className="font-semibold my-4">{book.title}</h2>
      <p>
        by{" "}
        {book.authors.map((author) => (
          <p>{author.name}</p>
        ))}
      </p>
      <button
        onClick={() => setShowModal(true)}
        className="p-4 bg-zinc-300 text-black"
      >
        View Details
      </button>

      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookCard;
