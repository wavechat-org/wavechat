import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddPage({ base_url }) {
  const [roomName, setRoomName] = useState("");
  const [creatorId, setCreatorId] = useState(1);
  const [participantId, setParticipantId] = useState(2);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const body = { roomName, creatorId, participantId };
      const { data } = await axios.post(
        `${base_url}/room`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      navigate("/");
      // Toastify
    } catch (error) {
      console.log(error);
      // Toastify
    }
  }

  return (
    <section className="w-50 mx-auto p-3 border-1 rounder bg-warning-subtle">
      <h1 className="text-center pt-2">Add Room</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="room-name" className="form-label">
            Room Name
          </label>
          <input
            type="text"
            className="form-control"
            id="room-name"
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
          />
        </div>

        <div className="d-flex gap-3 pt-5">
          <button type="submit" className="btn btn-warning w-100">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
