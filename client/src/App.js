import "./App.css";
import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("https://live-chat-app-qz2n.onrender.com");

function App() {
  const [username, setUserName] = useState("");

  const [showChat, setShowChat] = useState(false);
  const [room] = useState(123);

  const handleJoinRoom = () => {
    if (username !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="text-center grid place-content-center">
      {!showChat ? (
        <div className="flex flex-col text-center justify-center">
          <p className="text-2xl mb-4 font-bold">Join A Chat</p>
          
          <input 
            className="w-56 h-12 border border-sky-500 rounded-lg p-2 m-2 text-base "
            type="text"
            placeholder="Enter Name..."
            onChange={(e) => setUserName(e.target.value)}
          />

          <button
            className="w-56 h-12 border bg-sky-400 m-auto rounded-lg"
            onClick={handleJoinRoom}
          >
            Start Chatting{" "}
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
