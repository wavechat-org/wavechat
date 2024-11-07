import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

export default function AddPage({ base_url }) {
  const [roomName, setRoomName] = useState(""); // Only roomName is needed
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const body = { roomName };
      const { data } = await axios.post(`${base_url}/room`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      // Display a success toast message
      Toastify({
        text: data.message || "Room created/joined successfully",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        style: {
          background: "#28a745",
        },
      }).showToast();

      // Redirect to the main page or rooms list after successful creation
      navigate("/");
    } catch (error) {
      // Display an error toast message
      Toastify({
        text: error.response?.data?.name || "Failed to create/join room",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        style: {
          background: "#dc3545",
        },
      }).showToast();
      console.error("Error:", error);
    }
  }

  return (
    <section className="flex justify-center items-center h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-blue-200 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Add Room
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="room-name"
              className="block text-gray-700 font-medium mb-2"
            >
              Room Name
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              id="room-name"
              onChange={(e) => setRoomName(e.target.value)}
              value={roomName}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold hover:from-blue-400 hover:to-blue-700 shadow-lg transition-transform transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
