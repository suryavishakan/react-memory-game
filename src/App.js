import { useState, useEffect } from "react";
import "./App.css";
import snapchat from "./assets/snapchat.png";
import telegram from "./assets/telegram.png";
import tiktok from "./assets/tiktok.png";
import twitter from "./assets/twitter.png";
import whatsapp from "./assets/whatsapp.png";
import youtube from "./assets/youtube.png";
import Card from "./components/Card";

const cardImages = [
  { src: snapchat, matched: false },
  { src: telegram, matched: false },
  { src: tiktok, matched: false },
  { src: twitter, matched: false },
  { src: whatsapp, matched: false },
  { src: youtube, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    if (choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  };

  // compare 2 selected cards using useEffect hook
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCard) => {
          return prevCard.map((card) => {
            if (card.src === choiceOne) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      } else {
        console.log("different");
      }
      resetTurn();
    }
  }, [choiceOne, choiceTwo]);

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
  };

  return (
    <div className="App">
      <h2>Magic Match</h2>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <Card card={card} key={card.id} handleChoice={handleChoice} />
        ))}
      </div>
      <p>Turns {turns}</p>
    </div>
  );
}

export default App;
