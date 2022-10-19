import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api";
import Deck from "./Deck";



const DeckList = () => {
  const [deckList, setDeckList] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDeckList)
    return () => abortController.abort();
  }, []);

  if (!deckList.length) {
    return <p>Loading...</p>;
  } else {
    return (
      <React.Fragment>
        <div>
          {deckList.map((deck, index) => (
            <Deck deck={deck} key={index} />
          ))}
        </div>
      </React.Fragment>
    );
  }
};

export default DeckList;
