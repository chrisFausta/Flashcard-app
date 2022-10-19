import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {  readDeck } from "../utils/api";
import StudyCard from "./StudyCard";
const Study = () => {
  const [study, setStudy] = useState({});

  const { deckId } = useParams();


  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setStudy);
    return () => abortController.abort()
  }, [deckId]);

  if (!study.id) {
    return <p>Loading</p>;
  } else if (study.cards.length < 3) {
    return (
      <React.Fragment>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{study.name}</Link>
            </li>
            <li className="breadcrumb-item">Study</li>
          </ol>
        </nav>
        <h1>Study: {study.name}</h1>
        <br />
        <h2>Not enough cards</h2>
        <p>You need at least 3 cards to study. There are {study.cards.length} cards in this deck</p>
        <Link to={`/decks/${deckId}/cards/new`}>
            <button className="btn btn-primary">+ Add Cards</button>
        </Link>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={'/'}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{study.name}</Link>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>Study</li>
          </ol>
        </nav>
        <h1>Study: {study.name}</h1>
        <br />
        <StudyCard cards={study.cards} />
      </React.Fragment>
    );
  }
};

export default Study;
