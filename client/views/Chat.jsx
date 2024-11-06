import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Chat({ socket }) {
    const [messageSent, setMessageSent] = useState("");
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.clear();
        navigate("/login");
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (messageSent.trim()) { 
            socket.emit("message:new", messageSent);
            setMessageSent(""); // untuk reset input 
        }
    }

    useEffect(() => {
        socket.auth = { username: localStorage.username };
        socket.connect();

        socket.on("message:update", (newMessage) => {
            setMessages((current) => [...current, newMessage]);
        });

        return () => {
            socket.off("message:update");
            socket.disconnect();
        };
    }, [socket]);

    return (
        <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-base-200 text-gray-800 p-10">
            <div className="flex flex-col flex-grow w-full max-w-xl bg-base-100 shadow-xl rounded-lg overflow-hidden">
                <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${msg.from === localStorage.username ? "items-end" : "items-start"} mb-4`}
                        >
                            <div className="text-sm font-semibold text-gray-600 mb-1">
                                {msg.from === localStorage.username ? "You" : msg.from}
                            </div>
                            <div className={`max-w-xs p-3 rounded-lg shadow-md ${
                                msg.from === localStorage.username
                                    ? "bg-blue-500 text-white rounded-br-none"
                                    : "bg-gray-300 text-gray-800 rounded-bl-none"
                            }`}
                            >
                                <div className="mt-1">
                                    {msg.message}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <form className="bg-accent p-4 flex flex-row" onSubmit={handleSubmit}>
                    <input
                        value={messageSent}
                        onChange={(e) => setMessageSent(e.target.value)}
                        className="flex items-center w-full rounded px-3"
                        type="text"
                        placeholder="Type your message…"
                    />
                    <button className="btn btn-base-100 ml-4" type="submit">Send</button>
                </form>
            </div>
            <button className="btn btn-error mt-10 w-full max-w-xl" onClick={handleLogout}>Logout</button>
        </div>
    );
}
