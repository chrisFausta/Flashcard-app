import { Link } from "react-router-dom";
import DeckList from "../Deck-Components/DeckList";
import React from "react";

const Home = () => {
  return (
    <div>
      <Link to={"/decks/new"}>
        <button className="btn btn-secondary">+ Create Deck</button>
      </Link>
      <DeckList />
      <br />
    </div>
  );
};

export default Home;
