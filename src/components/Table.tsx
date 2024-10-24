import React from "react";

interface TableProps<T> {
  columns: { key: keyof T; label: string }[];
  data: T[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

function Table<T extends { _id: string }>({
  columns,
  data,
  onEdit,
  onDelete,
}: TableProps<T>) {
  return (
    <div className="card bg-white shadow-lg rounded-lg p-6">
      <table className="table-auto w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key as string} className="px-4 py-2">
                {column.label}
              </th>
            ))}
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              {columns.map((column) => (
                <td key={column.key as string} className="border px-4 py-2">
                  {/* Check if the field is an array */}
                  {Array.isArray(item[column.key])
                    ? // Handle categories and authors as arrays
                      (item[column.key] as Array<{ name: string }>).map(
                        (entry, index) => (
                          <span key={index}>
                            {entry.name}
                            {index <
                            (item[column.key] as Array<{ name: string }>)
                              .length -
                              1
                              ? ", "
                              : ""}
                          </span>
                        )
                      )
                    : // For non-array fields, just render the value
                      String(item[column.key])}
                </td>
              ))}
              <td className="border px-4 py-2">
                <button
                  className="mr-2 p-2 bg-blue-500 text-white"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="p-2 bg-red-500 text-white"
                  onClick={() => onDelete(item)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
