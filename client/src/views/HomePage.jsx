import Card from "../components/Card";
import axios from "axios";
import loadingAnimation from "../components/assets/Double Ring@1x-1.0s-200px-200px.svg";
import { useEffect, useState } from "react";

export default function HomePage({ base_url }) {
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);

  async function fetchRooms() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${base_url}/room`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log(data, "<<<<<<<<<<<<<<<< data");

      setRooms(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <section>
      <div className="d-flex flex-wrap gap-3 jutify-content-center py-5">
        {rooms.map((room) => {
          return (
            <Card
              key={room.id}
              room={room}
              base_url={base_url}
              fetchRooms={fetchRooms}
            />
          );
        })}
      </div>
    </section>
  );
}
