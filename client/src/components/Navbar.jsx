import { Link, useNavigate, useParams } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  // const { userId } = useParams(); // undefined => tdk usah pake useParams

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    // <nav className="sticky top-0 z-10 p-1 bg-gray-900 shadow-md">
    <nav className="bg-gray-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <Link className="text-white text-2xl font-bold" to="/">
            WaveChat
          </Link>

          <button
            className="text-white lg:hidden focus:outline-none"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="material-icons">menu</span>
          </button>

          <ul className="hidden lg:flex space-x-6">
            <li>
              <Link
                className="text-gray-300 hover:text-white transition duration-200"
                to="/add-room"
              >
                Add Room
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <Link
            className="text-gray-300 hover:text-white transition duration-200"
            to={`/upload`}
          >
            Profile
          </Link>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
