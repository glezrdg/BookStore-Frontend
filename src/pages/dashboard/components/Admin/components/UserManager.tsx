import { useState, useEffect } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../../../../services/user"; // Replace with your actual service path
import GeneralTable from "../../../../../components/Table";
import GeneralForm from "../../../../../components/Form";
import { User, UserFormData } from "../../../../../models/user.model";

interface userFormType {
  key: string;
  label: string;
  type: string;
}

const userSchema: userFormType[] = [
  { key: "username", label: "Name", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "role", label: "Role", type: "text" }, // Could be a dropdown in the future if you need predefined roles
];

const UserManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getUsers(); // Fetch users from the API
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleDelete = async (user: User) => {
    try {
      if (user._id) await deleteUser(user._id);
      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
    } catch (error) {
      console.log(error);
      setError("Failed to delete user");
    }
  };

  const handleFormSubmit = async (user: UserFormData | User) => {
    if ("_id" in user) {
      // Update existing user
      await updateUser(user._id, user as User);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === user._id ? (user as User) : u))
      );
    } else {
      // Add new user
      const { data } = await createUser(user); // Assume createUser returns a user object with _id
      setUsers((prevUsers) => [...prevUsers, { ...data }]);
    }
    setSelectedUser(null); // Reset form
    setShowModal(false); // Close modal
  };

  return (
    <div>
      <div className="w-full flex justify-between p-4 relative mt-20">
        <h1 className="text-xl font-semibold ">User Manager</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white rounded-lg shadow-sm px-4 py-2"
        >
          Add User
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      <GeneralTable<User>
        columns={[
          { key: "username", label: "Name" },
          { key: "email", label: "Email" },
          { key: "role", label: "Role" }, // Role will be visible in the table
        ]}
        data={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm grid place-content-center">
          <div className="bg-white text-white rounded-2xl p-5 opacity-100 flex flex-col shadow-2xl">
            <h2>{selectedUser ? "Edit User" : "Add User"}</h2>
            <GeneralForm
              schema={userSchema}
              initialData={
                selectedUser || { username: "", email: "", role: "" }
              }
              onSubmit={handleFormSubmit}
            />
            <button
              className="bg-red-600 px-4 text-white self-end"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;
