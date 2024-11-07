import axios from "axios";
import { Link } from "react-router-dom";

export default function Card({ base_url, room }) {
  async function handleChat() {
    try {
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="card bg-gradient-to-br from-blue-500 to-blue-800 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2 m-4 w-64 max-w-xs">
      {/* Image Section */}
      <figure className="overflow-hidden rounded-lg mb-4">
        <img
          src={room.roomImg}
          alt={room.roomName}
          className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
        />
      </figure>

      {/* Content Section */}
      <div className="text-center">
        <h2 className="text-lg font-bold text-yellow-400 truncate">
          {room.roomName}
        </h2>

        {/* Button Section */}
        <div className="mt-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 transform hover:scale-105"
            onClick={handleChat}
          >
            Dating Now
          </button>
        </div>
      </div>
    </div>
  );
}
