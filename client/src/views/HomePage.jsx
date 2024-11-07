import Card from "../components/Card";
import axios from "axios";
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
    <section className="py-10 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center">
            <img
              // src={loadingAnimation}
              alt="Loading..."
              className="w-20 h-20"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <Card key={room.id} room={room} base_url={base_url} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
