import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";

export default function ChatPage({ socket, base_url }) {
  const [sendMessage, setSendMessage] = useState(""); // Input message state
  const [messages, setMessages] = useState([]); // Store chat messages as an array
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Emoji picker visibility
  const messageInputRef = useRef(); // For focusing the input field after emoji selection

  // Fetch Room Data by ID
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

  // Fetch User Profile
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

  // Handle message send
  function handleSubmit(e) {
    e.preventDefault();
    if (!sendMessage.trim()) return; // Prevent empty messages

    socket.emit("message:new", {
      roomId: id,
      message: sendMessage,
      username: profile.username,
    });

    setSendMessage(""); // Clear input after sending
  }

  // Handle emoji selection
  const handleEmojiClick = (emojiObject) => {
    setSendMessage((prevMessage) => prevMessage + emojiObject.emoji); // Add emoji to the input field
    setShowEmojiPicker(false); // Hide the emoji picker after emoji selection
    messageInputRef.current.focus(); // Refocus the input field after selecting emoji
  };

  // Handle end chat
  function handleEndChat() {
    navigate("/"); // Navigate back to home or other page
  }

  useEffect(() => {
    fetchRoomById();
    fetchProfile();
    socket.emit("join:room", id); // Join room when component loads

    return () => {
      socket.off("message:update");
    };
  }, [id]);

  useEffect(() => {
    if (profile.username) {
      socket.auth = { username: profile.username };
      socket.connect();

      socket.on("message:update", (newMessage) => {
        setMessages((current) => [...current, newMessage]); // Append new message to the array
      });

      return () => {
        socket.off("message:update");
      };
    }
  }, [profile, socket]);

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-base-200 text-gray-800 p-10">
      <div className="flex flex-col flex-grow w-full max-w-xl bg-base-100 shadow-xl rounded-lg overflow-hidden">
        {/* Room Name */}
        <div className="text-center p-4 bg-blue-700">
          <h2 className="text-2xl font-semibold text-white">
            {room.roomName || "Loading room..."}
          </h2>
        </div>

        {/* Message List */}
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.from === profile.username
                  ? "chat chat-end flex flex-col"
                  : "chat chat-start flex flex-col"
              }
            >
              <div>{msg.from === profile.username ? "You" : msg.from}</div>
              <div className="chat-bubble chat-bubble-accent">
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        {/* Show the emoji picker if toggled */}
        {showEmojiPicker && (
          <div className="emoji-picker">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        {/* Input Form */}
        <form className="bg-accent p-4 flex flex-row" onSubmit={handleSubmit}>
          <input
            value={sendMessage}
            onChange={(e) => setSendMessage(e.target.value)}
            className="flex items-center w-full rounded px-3"
            type="text"
            placeholder="Type your message…"
            ref={messageInputRef} // Set reference to input
          />

          {/* Emoji button */}
          <button
            type="button"
            className="text-gray-500 ml-0.5"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <span className="m-0.5 text-2xl">😊</span>
          </button>

          {/* Send button */}
          <button className="btn btn-base-100 ml-0.5" type="submit">
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
