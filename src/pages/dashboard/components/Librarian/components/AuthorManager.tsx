import React, { useState, useEffect } from "react";

import {
  getAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../../../../../services/author"; // These should be your service functions
import GeneralTable from "../../../../../components/Table";
import GeneralForm from "../../../../../components/Form";
import { Author, AuthorStrict } from "../../../../../models/author.model";

interface authorFormType {
  key: string;
  label: string;
  type: string;
}

const authorSchema: authorFormType[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "bio", label: "Biography", type: "text" },
];

const AuthorManager = () => {
  const [authors, setAuthors] = useState<AuthorStrict[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Partial<Author> | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data } = await getAuthors();
        setAuthors(data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch authors");
      }
    };
    fetchAuthors();
  }, []);

  const handleEdit = (author: Author) => {
    setSelectedAuthor(author);
    setShowModal(true);
  };
  const handleAdd = () => {
    setSelectedAuthor(null);
    setShowModal(true);
  };

  const handleDelete = async (author: Author) => {
    try {
      if (author._id) await deleteAuthor(author._id);
      setAuthors((prevAuthors) =>
        prevAuthors.filter((a) => a._id !== author._id)
      );
    } catch (error) {
      console.log(error);
      setError("Failed to delete author");
    }
  };

  const handleFormSubmit = async (author: AuthorStrict) => {
    if ("_id" in author) {
      // If _id exists, it's an AuthorStrict (we are editing)
      await updateAuthor(author._id, author as AuthorStrict);
      setAuthors((prevAuthors) =>
        prevAuthors.map((a) =>
          a._id === author._id ? (author as AuthorStrict) : a
        )
      );
      setShowModal(false);
    } else {
      // Add new author
      const res: any = await createAuthor(author); // Assume createAuthor returns an object with _id now
      console.log(res, " res");

      setAuthors((prevAuthors) => [...prevAuthors, { ...res.data.author }]);
      setShowModal(false);
    }
    setSelectedAuthor(null); // Reset form
  };

  return (
    <div>
      <div className="w-full flex  justify-between p-4 relative mt-20 ">
        <h1 className="text-xl font-semibold">Author Manager</h1>
        <button
          className="bg-blue-600 text-white rounded-lg shadow-sm px-4 py-2"
          onClick={handleAdd}
        >
          Add Author
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      <GeneralTable<AuthorStrict>
        columns={[
          { key: "name", label: "Name" },
          { key: "bio", label: "Biography" },
        ]}
        data={authors}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm  grid place-content-center z-50">
          <div
            className="
         bg-white roundex-2xl shadow-2xl tex-white p-5 opacity-100 flex flex-col "
          >
            <h2>{selectedAuthor ? "Edit Author" : "Add Author"}</h2>
            <GeneralForm
              schema={authorSchema}
              initialData={selectedAuthor || { name: "", bio: "" }}
              onSubmit={handleFormSubmit}
            />
            <button
              className="bg-red-600 px-4 text-white self-end"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorManager;
