import axios from "axios";
import { Link } from "react-router-dom";

export default function Card({ base_url, room }) {
  async function handleChat() {
    try {
    } catch (error) {}
  }
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={room.roomImg} className="card-img-top" alt="..." />
      <div className="card-body">
        <label>Room id :</label>
        <h5 className="card-id">{room.id}</h5>
        <label>Room Name :</label>
        <h5 className="card-title">{room.roomName}</h5>

        <div className="d-flex gap-3">
          <Link className="btn btn-warning" to="#">
            Chat Now
          </Link>
        </div>
      </div>
    </div>
  );
}
