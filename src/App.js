import { useState } from "react";
import "./App.css";
import snapchat from "./assets/snapchat.png";
import telegram from "./assets/telegram.png";
import tiktok from "./assets/tiktok.png";
import twitter from "./assets/twitter.png";
import whatsapp from "./assets/whatsapp.png";
import youtube from "./assets/youtube.png";
import cardBackground from "./assets/back.jpg";

const cardImages = [
  { src: snapchat },
  { src: telegram },
  { src: tiktok },
  { src: twitter },
  { src: whatsapp },
  { src: youtube },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
    console.log("shuffled cards", shuffledCards);
  };

  return (
    <div className="App">
      <h2>Magic Match</h2>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <div key={card.id} className="card">
            <div>
              <img src={card.src} className="front" alt="card front" />
              <img src={cardBackground} className="back" alt="card back" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
