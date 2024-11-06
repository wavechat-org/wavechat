import axios from "axios";
import { Link } from "react-router-dom";

export default function Card({ base_url, room }) {
  async function handleChat() {
    try {
      // Implement chat functionality here if needed
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="card bg-gradient-to-br from-blue-500 to-blue-900 text-gray-100 p-4 rounded-xl shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:-translate-y-2 m-4 w-72">
      {/* Image Section */}
      <figure className="relative overflow-hidden rounded-lg shadow-md transition-transform duration-300">
        <img
          src={room.roomImg}
          alt={room.roomName}
          className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-t-lg">
          <span className="text-lg font-bold text-white bg-yellow-500 bg-opacity-80 px-3 py-1 rounded-lg">
            {room.roomName}
          </span>
        </div>
      </figure>

      {/* Content Section */}
      <div className="card-body text-center p-4">
        <h2 className="text-xl font-semibold mb-2 text-yellow-400 line-clamp-1">
          {room.roomName}
        </h2>

        {/* Button Section */}
        <div className="flex justify-center mt-4">
          <button
            className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transform transition duration-300"
            onClick={handleChat}
          >
            Dating Now
          </button>
        </div>
      </div>
    </div>
  );
}
