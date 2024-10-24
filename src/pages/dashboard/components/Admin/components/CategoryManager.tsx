import { useState, useEffect } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../../../services/category"; // Asegúrate de importar tus servicios
import GeneralTable from "../../../../../components/Table";
import GeneralForm from "../../../../../components/Form";
import {
  Category,
  CategoryStrict,
} from "../../../../../models/category.model";

const categorySchema = [{ key: "name", label: "Name", type: "text" }];

const CategoryManager = () => {
  const [categories, setCategories] = useState<CategoryStrict[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<Partial<Category> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getCategories();
        setCategories(data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setShowModal(true);
  };

  const handleDelete = async (category: Category) => {
    try {
      if (category._id) await deleteCategory(category._id);
      setCategories((prevCategories) =>
        prevCategories.filter((c) => c._id !== category._id)
      );
    } catch (error) {
      console.log(error);
      setError("Failed to delete category");
    }
  };

  const handleFormSubmit = async (category: CategoryStrict) => {
    if ("_id" in category) {
      // Si _id existe, es un CategoryStrict (estamos editando)
      await updateCategory(category._id, category as CategoryStrict);
      setCategories((prevCategories) =>
        prevCategories.map((c) =>
          c._id === category._id ? (category as CategoryStrict) : c
        )
      );
      setShowModal(false);
    } else {
      // Añadir nueva categoría
      const res: any = await createCategory(category);
      setCategories((prevCategories) => [...prevCategories, res.data.category]);
      setShowModal(false);
    }
    setSelectedCategory(null); // Reiniciar formulario
  };

  return (
    <div>
      <div className="w-full flex justify-between p-4 relative mt-20">
        <h1 className="text-xl font-semibold">Category Manager</h1>
        <button
          className="bg-blue-600 text-white rounded-lg shadow-sm px-4 py-2"
          onClick={handleAdd}
        >
          Add Category
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      <GeneralTable<CategoryStrict>
        columns={[{ key: "name", label: "Name" }]}
        data={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm grid place-content-center">
          <div className="bg-white shadow-2xl rounded-2xl p-5 opacity-100 flex flex-col">
            <h2>{selectedCategory ? "Edit Category" : "Add Category"}</h2>
            <GeneralForm
              schema={categorySchema}
              initialData={selectedCategory || { name: "" }}
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

export default CategoryManager;
