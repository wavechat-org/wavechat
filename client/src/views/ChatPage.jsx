import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ChatPage({ socket, base_url }) {
  const [sendMessage, setSendMessage] = useState("");
  const [message, setMessage] = useState([]);
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  console.log(profile);

  async function fetchRoomById() {
    try {
      const { data } = await axios.get(`${base_url}/room/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setRoom(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchProfile() {
    try {
      const { data } = await axios.get(`${base_url}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("message:new", {
      roomId: id,
      message: sendMessage,
      username: profile.username,
    });
    setSendMessage(""); // Clear input after sending
  }

  function handleEndChat() {
    navigate("/");
  }

  useEffect(() => {
    fetchRoomById();
    socket.emit("join:room", id);

    fetchProfile();
  }, []);

  useEffect(() => {
    socket.auth = {
      username: localStorage.username,
    };
    socket.connect();

    socket.on("message:update", (newMessage) => {
      console.log(newMessage, "ini message baru");
      setMessage((current) => [...current, newMessage]);
    });

    return () => {
      socket.off("message:update");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-base-200 text-gray-800 p-10">
      <div className="flex flex-col flex-grow w-full max-w-xl bg-base-100 shadow-xl rounded-lg overflow-hidden">
        {/* Room Name */}
        <div className="text-center p-4  bg-blue-700 ">
          <h2 className="text-2xl font-semibold text-white">
            {room.roomName || "Loading room..."}
          </h2>
        </div>

        {/* Message List */}
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          {message.map((msg, index) => (
            <div
              key={index}
              className={
                msg.from === profile.username
                  ? "chat chat-start flex flex-col"
                  : "chat chat-end flex flex-col"
              }
            >
              <div>{msg.from === profile.username ? "You" : msg.from}</div>
              <div className="chat-bubble chat-bubble-accent">
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form className="bg-accent p-4 flex flex-row" onSubmit={handleSubmit}>
          <input
            value={sendMessage}
            onChange={(e) => setSendMessage(e.target.value)}
            className="flex items-center w-full rounded px-3"
            type="text"
            placeholder="Type your message…"
          />
          <button className="btn btn-base-100 ml-4" type="submit">
            Send
          </button>
        </form>
      </div>

      {/* End Chat Button */}
      <button
        className="btn btn-error mt-10 w-full max-w-xl"
        onClick={handleEndChat}
      >
        End Chat
      </button>
    </div>
  );
}
