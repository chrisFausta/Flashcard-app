
import { Link, useHistory } from "react-router-dom";
import React from "react";
import { deleteDeck } from "../utils/api";


const Deck = ({ deck }) => {
  const deckId = deck.id
  const history = useHistory()
  const handleDelete = () => {
    if(window.confirm("Delete this card? \n You will not be able to recover it.")){
      deleteDeck(deckId).then(() => history.go())
    } 
  }
  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between">
        <h2>{deck.name}</h2>
        <p>{deck.cards.length} cards</p>
      </div>

      <p>{deck.description}</p>
      <div className="d-flex">
        <Link to={`/decks/${deck.id}`}>
          <button className="btn btn-secondary">View</button>
        </Link>
        <Link to={`/decks/${deck.id}/study`}>
          <button className="btn btn-primary">Study</button>
        </Link>
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Deck;
