import { useState, useEffect } from "react";
// styles
import "./App.css";
// images
import helmet from "./assets/helmet-1.png";
import potion from "./assets/potion-1.png";
import ring from "./assets/ring-1.png";
import scroll from "./assets/scroll-1.png";
import shield from "./assets/shield-1.png";
import sword from "./assets/sword-1.png";
import Card from "./components/Card";
import Confetti from "react-confetti";

// card images array
const cardImages = [
  { src: helmet, matched: false },
  { src: potion, matched: false },
  { src: ring, matched: false },
  { src: scroll, matched: false },
  { src: shield, matched: false },
  { src: sword, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
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
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCard) => {
          return prevCard.map((card) => {
            return card.src === choiceOne.src
              ? { ...card, matched: true }
              : card;
          });
        });
        resetTurn();
      } else {
        console.log("different");
        setTimeout(() => {
          resetTurn();
        }, 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  // start the game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h2>Magic Match</h2>
      <button onClick={shuffleCards}>New Game</button>
      <p className="turns">Turns : {turns}</p>

      <div className="card-grid">
        {cards.map((card) => (
          <Card
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      {cards.every((card) => card.matched === true) && <Confetti />}
    </div>
  );
}

export default App;
