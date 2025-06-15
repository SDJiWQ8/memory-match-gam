// src/pages/GamePage.jsx
import { useEffect, useState } from "react";
import io from "socket.io-client";
import GameBoard from "../components/GameBoard";
import ChatRoom from "../components/ChatRoom";

let socket;

function GamePage() {
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // 初始化 socket 連線
    socket = io("http://localhost:3000"); // ⚠️ 確保你的伺服器執行在這個位置
    socket.on("connect", () => {
      console.log("Connected to server");
      setConnected(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleStart = () => {
    if (username.trim() === "") return;
    socket.emit("join", { username });
  };

  return (
    <div style={{ padding: 20 }}>
      {!connected ? (
        <p>連線中...</p>
      ) : !username ? (
        <div>
          <h2>輸入暱稱開始遊戲</h2>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="你的暱稱"
          />
          <button onClick={handleStart}>開始遊戲</button>
        </div>
      ) : (
        <>
          <h1>記憶配對遊戲</h1>
          <GameBoard username={username} socket={socket} />
          <ChatRoom username={username} socket={socket} />
        </>
      )}
    </div>
  );
}

export default GamePage;

