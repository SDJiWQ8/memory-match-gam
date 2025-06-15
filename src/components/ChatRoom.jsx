// src/components/ChatRoom.jsx
import { useEffect, useState } from "react";

function ChatRoom({ socket, username }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("chatMessage", handleMessage);
    return () => {
      socket.off("chatMessage", handleMessage);
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() && socket) {
      const msgObj = { user: username, text: message };
      socket.emit("chatMessage", msgObj);
      setMessage("");
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>聊天室</h3>
      <div style={{ maxHeight: 150, overflowY: "auto", border: "1px solid #ccc", padding: 8, marginBottom: 10 }}>
        {messages.map((msg, idx) => (
          <div key={idx}><strong>{msg.user}：</strong>{msg.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        placeholder="輸入訊息"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>送出</button>
    </div>
  );
}

export default ChatRoom;

