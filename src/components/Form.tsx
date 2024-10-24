import React, { useState, useEffect } from "react";

// Props interface
interface FormProps {
  schema: any;
  initialData: any;
  onSubmit: (data: any) => void;
  categories?: any[];
  authors?: any[];
}

function Form({
  schema,
  initialData,
  onSubmit,
  categories,
  authors,
}: FormProps) {
  const [formData, setFormData] = useState({
    ...initialData,
    categories: initialData.categories || [],
    authors: initialData.authors || [],
  });

  // Handle change for text inputs
  const handleChange = (key: any, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Handle adding categories
  const handleAddCategory = (categoryId: string) => {
    if (!formData.categories.includes(categoryId)) {
      setFormData((prev: any) => ({
        ...prev,
        categories: [...prev.categories, categoryId],
      }));
    }
  };

  // Handle removing categories
  const handleRemoveCategory = (categoryId: string) => {
    setFormData((prev: any) => ({
      ...prev,
      categories: prev.categories.filter((id: string) => id !== categoryId),
    }));
  };

  // Handle adding authors
  const handleAddAuthor = (authorId: string) => {
    if (!formData.authors.includes(authorId)) {
      setFormData((prev: any) => ({
        ...prev,
        authors: [...prev.authors, authorId],
      }));
    }
  };

  // Handle removing authors
  const handleRemoveAuthor = (authorId: string) => {
    setFormData((prev: any) => ({
      ...prev,
      authors: prev.authors.filter((id: string) => id !== authorId),
    }));
  };

  // Update formData when initialData changes
  useEffect(() => {
    setFormData({
      ...initialData,
      categories: initialData.categories || [],
      authors: initialData.authors || [],
    });
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit} className="text-black">
      {schema.map((field: any) => (
        <div key={field.key as string} className="mb-4">
          <label className="block text-sm font-bold mb-2">{field.label}</label>
          {field.key === "categories" ? (
            // Categories Dropdown
            <div>
              <select
                onChange={(e) => handleAddCategory(e.target.value)}
                className="border p-2 w-full mt-2"
              >
                <option value="">Add Category</option>
                {categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <h4>Selected Categories:</h4>
              {formData.categories.length > 0 ? (
                <ul>
                  {formData.categories.map((item: string) => {
                    const category = categories?.find((c) => c._id === item);
                    console.log(category);
                    return (
                      <li key={item}>
                        {category?.name}
                        <button
                          type="button"
                          className="ml-2 text-red-500"
                          onClick={() => handleRemoveCategory(item)}
                        >
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>No categories selected</p>
              )}
            </div>
          ) : field.key === "authors" ? (
            // Authors Dropdown
            <div>
              <select
                onChange={(e) => handleAddAuthor(e.target.value)}
                className="border p-2 w-full mt-2"
              >
                <option value="">Add Author</option>
                {authors?.map((author) => (
                  <option key={author._id} value={author._id}>
                    {author.name}
                  </option>
                ))}
              </select>
              <h4>Selected Authors:</h4>
              {formData.authors.length > 0 ? (
                <ul>
                  {formData.authors.map((item: string) => {
                    console.log(formData, "autore");
                    const author = authors?.find((a) => a._id === item);
                    console.log(authors);
                    console.log(author, "autore");

                    return (
                      <li key={item}>
                        {author?.name}
                        <button
                          type="button"
                          className="ml-2 text-red-500"
                          onClick={() => handleRemoveAuthor(item)}
                        >
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>No authors selected</p>
              )}
            </div>
          ) : (
            // Default input for text fields
            <input
              type={field.type}
              value={formData[field.key] as string}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="border p-2 w-full"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 w-full rounded-lg mb-4"
      >
        Submit
      </button>
    </form>
  );
}

export default Form;
