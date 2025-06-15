// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";

function GameWrapper() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get("username");
  const roomId = params.get("roomId");

  return <GamePage username={username} roomId={roomId} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GameWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;

