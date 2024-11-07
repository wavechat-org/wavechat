import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatPage() {
  const [sendMessage, setSendMessage] = useState("");
  const [message, setMessage] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    // mengirim data ke server
    socket.emit("message:new", sendMessage);
    console.log(sendMessage, "<<<<<<<<<<<<<<<<<< message sent");
  }

  useEffect(() => {
    // setting auth buat socketnya
    console.log(localStorage, "<<<<<<<<<<<<<<<<< localStorage");
    socket.auth = {
      // ini username nya dpt dari setItem LocalStorage di login page
      username: localStorage.username,
    };
    // supaya bisa set auth dl sebelum connect
    socket.connect();

    // menerima "message:update" dari server

    // ini message nya ga numpuk ya?
    socket.on("message:update", (newMessage) => {
      setMessage((current) => {
        return [...current, newMessage];
      });
    });

    return () => {
      // mematikan socket?
      socket.off("message:update");
      //mematikan koneksi socket ?
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-base-200 text-gray-800 p-10">
        <div className="flex flex-col flex-grow w-full max-w-xl bg-base-100 shadow-xl rounded-lg overflow-hidden">
          {/* <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                        <div className="chat chat-start flex flex-col">
                            <div>Raditya Dika</div>
                            <div className="chat-bubble chat-bubble-accent">Bayi ambil tanganku</div>
                        </div>
                        <div className="chat chat-end flex flex-col">
                            <div>You</div>
                            <div className="chat-bubble chat-bubble-accent">Aku mau kamu jadi suamiku</div>
                        </div>
                        <div className="chat chat-start flex flex-col">
                            <div>Raditya Dika</div>
                            <div className="chat-bubble chat-bubble-accent">Karena kamu manusia besiku</div>
                        </div>
                        <div className="chat chat-end flex flex-col">
                            <div>You</div>
                            <div className="chat-bubble chat-bubble-accent">Dan aku cinta kamu 3000</div>
                        </div>
                    </div> */}

          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {message.map((msg, index) => {
              return (
                <div
                  key={index}
                  className={
                    msg.from == localStorage.username
                      ? "chat chat-start flex flex-col"
                      : "chat chat-end flex flex-col"
                  }
                >
                  <div>
                    {msg.from === localStorage.username ? "you" : msg.from}{" "}
                  </div>
                  <div className="chat-bubble chat-bubble-accent">
                    {msg.message}
                  </div>
                </div>
              );
            })}
          </div>

          <form className="bg-accent p-4 flex flex-row" onSubmit={handleSubmit}>
            <input
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
        <button
          className="btn btn-error mt-10 w-full max-w-xl"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
}
