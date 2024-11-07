import { useNavigate } from "react-router-dom";

export default function Card({ room }) {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/room/${id}`);
  }

  return (
    <div className="dark card bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
      {/* Image Section */}
      <figure className="overflow-hidden rounded-t-lg">
        <img
          src={room.roomImg}
          alt={room.roomName}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
      </figure>

      {/* Content Section */}
      <div className="p-4 text-center">
        <h2 className="text-lg font-bold text-yellow-300 truncate">
          {room.roomName}
        </h2>

        {/* Button Section */}
        <div className="mt-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-full shadow-md transition-transform duration-300 transform hover:scale-105"
            onClick={() => handleClick(room.id)}
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
