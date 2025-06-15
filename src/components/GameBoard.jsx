// src/components/GameBoard.jsx
import { useEffect, useState } from "react";

const defaultCards = [
  "🍎", "🍌", "🍇", "🍓", "🍒", "🍍",
  "🍎", "🍌", "🍇", "🍓", "🍒", "🍍"
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function GameBoard({ username, socket }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    setCards(shuffle(defaultCards));
  }, []);

  const handleFlip = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [i1, i2] = newFlipped;
      if (cards[i1] === cards[i2]) {
        setMatched([...matched, i1, i2]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div>
      <h2>玩家：{username}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 80px)", gap: "10px", justifyContent: "center" }}>
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <div
              key={index}
              onClick={() => handleFlip(index)}
              style={{
                width: 80,
                height: 80,
                backgroundColor: "#444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                cursor: "pointer",
                color: "white",
                borderRadius: 8,
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
              }}
            >
              {isFlipped ? card : "❓"}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GameBoard;

