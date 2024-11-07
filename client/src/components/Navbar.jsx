import { Link, useNavigate } from "react-router-dom";
import { FiPlusCircle, FiUser } from "react-icons/fi"; // Import icons
import { MdMenu } from "react-icons/md"; // Import menu icon
import logo from "../assets/logo.png";
import Button from "./Button";
import ThemeContext from "../contexts/ThemeContext";
import { useContext } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav
      className={`bg-gradient-to-r from-blue-500 to-gray-900 shadow-lg ${theme.theme}`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo and Menu Button */}
        <div className="flex items-center space-x-4">
          {/* Logo with text */}
          <img
            src={logo}
            alt="WaveChat Logo"
            className="w-12 h-12 rounded-full shadow-lg"
          />
          <Link
            className="text-white text-3xl font-bold hover:underline"
            to="/"
          >
            WaveChat
          </Link>

          {/* Mobile Menu Toggle (hidden on larger screens) */}
          <button
            className="text-white lg:hidden focus:outline-none"
            aria-label="Toggle navigation"
          >
            <MdMenu size={28} />
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex space-x-8">
            <li>
              <Link
                className="flex items-center text-gray-200 hover:text-white transition duration-200"
                to="/add-room"
              >
                <FiPlusCircle size={20} className="mr-2" />
                Add Room
              </Link>
            </li>
          </ul>

          {/* Profile and Logout buttons */}
          <div className="flex items-center space-x-6">
            <Link
              className="flex items-center text-gray-200 hover:text-white transition duration-200"
              to="/upload"
            >
              <FiUser size={20} className="mr-2" />
              Profile
            </Link>
            <div>
              <Button />
            </div>

            <button
              className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
