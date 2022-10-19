import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardTile from "../Card-Components/CardTile";
import { deleteDeck } from "../utils/api";

const ViewDeck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const history = useHistory()
  useEffect(() => {
    setDeck({});
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck);
  }, [deckId]);

  const handleDelete = () => {
    if(window.confirm("Delete this card? \n You will not be able to recover it.")){
      deleteDeck(deckId).then(() => history.go())
    } 
  }
  if (!deck.id) {
    return <p>Loading...</p>;
  } else {
    return (
      <React.Fragment>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">{deck.name}</li>
          </ol>
        </nav>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
     
          <Link to={`/decks/${deckId}/edit`}>
            <button className="btn btn-secondary">Edit</button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button className="btn btn-primary">Study</button>
          </Link>
          <Link to={`/decks/${deckId}/cards/new`}>
            <button className="btn btn-primary">+ Add Cards</button>
          </Link>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        <br />
        <h2>Cards</h2>
        {deck.cards.map((card, index) => (
          <CardTile card={card} key={index} />
        ))}
      </React.Fragment>
    );
  }
};

export default ViewDeck;
