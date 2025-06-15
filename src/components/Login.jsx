// src/components/Login.jsx
import { useState } from "react";
import socket from "../socket";

function Login({ setUsername, setRoomId }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("room1");

  const handleJoin = () => {
    if (name.trim()) {
      socket.emit("joinRoom", room, name);
      setUsername(name);
      setRoomId(room);
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>輸入暱稱開始遊戲</h2>
      <input
        type="text"
        placeholder="你的暱稱"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <button onClick={handleJoin}>加入</button>
    </div>
  );
}

export default Login;
