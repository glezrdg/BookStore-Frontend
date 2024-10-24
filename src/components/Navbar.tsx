import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [profileOptions, setProfileOptions] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleProfileOptions = () => {
    setProfileOptions((prevState) => !prevState);
  };

  return (
    <div className='p-4 shadow-md bg-white '>

    <nav className=" container mx-auto w-full flex justify-between items-centermb-[5vh]">
      <div className="text-xl font-bold">
        <Link to="/">Books</Link>
      </div>

      <div className="relative">
        {isAuthenticated ? (
          <div className="flex items-center">
            {/* User Display with Dropdown Toggle */}
            <button
              onClick={toggleProfileOptions}
              className="px-10 py-2 bg-blue-500 text-white rounded-lg focus:outline-none"
            >
              {user?.username}
            </button>

            {/* Profile Options with Transition */}
            <div
              className={`absolute top-12 right-0 bg-white shadow-lg rounded-lg py-2 z-10 transition-transform transform duration-300 ease-in-out origin-top ${
                profileOptions
                  ? "scale-y-100 opacity-100"
                  : "scale-y-0 opacity-0"
              }`}
            >
              <Link
                to="/dashboard"
                className="block w-full text-left px-4 py-2 text-green-500 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
              >
                Log out
              </button>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Log in
          </Link>
        )}
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
