import React, { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";
import { readCard } from "../utils/api";
const StudyCard = ({ cards = [] }) => {
  const [currentCard, setCurrentCard] = useState(cards[0]);
  const [cardIndex, setCardIndex] = useState(0);
  const [flip, setFlip] = useState(true);
  const cardId = cards[cardIndex].id;

  const history = useHistory();
  useEffect(() => {
    const abortController = new AbortController();
    readCard(cardId, abortController.signal).then(setCurrentCard);
    return () => abortController.abort();
  }, [cardId]);

  const handleFlip = () => {
    setFlip(!flip);
  };

  const handleNext = () => {
    setFlip(true);
    if (cardIndex === cards.length - 1) {
      window.confirm("Restart cards") ? setCardIndex(0) : history.push("/");
    } else {
      setCardIndex(cardIndex + 1);
    }
  };
  if (flip) {
    return (
      <div className="card">
        <h2>
          Card {cardIndex + 1} of {cards.length}
        </h2>
        <p>{currentCard.front}</p>
        <div className="d-flex">
          <button className="btn btn-secondary" onClick={handleFlip}>
            Flip
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card">
        <h2>
          Card {cardIndex + 1} of {cards.length}
        </h2>
        <p>{currentCard.back}</p>
        <div className="d-flex ">
          <button className="btn btn-secondary" onClick={handleFlip}>
            Flip
          </button>
          <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    );
  }
};

export default StudyCard;
