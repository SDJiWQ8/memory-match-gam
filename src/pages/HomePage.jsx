// src/pages/HomePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleEnter = () => {
    if (username.trim() && roomId.trim()) {
      navigate(`/game?username=${username}&roomId=${roomId}`);
    } else {
      alert("請輸入暱稱和房間 ID！");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>🎮 記憶配對遊戲</h1>
      <input
        type="text"
        placeholder="輸入你的暱稱"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: 10, margin: 10 }}
      />
      <br />
      <input
        type="text"
        placeholder="輸入房間 ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        style={{ padding: 10, margin: 10 }}
      />
      <br />
      <button onClick={handleEnter} style={{ padding: 10 }}>
        進入遊戲房間
      </button>
    </div>
  );
}

export default HomePage;
