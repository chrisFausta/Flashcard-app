import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";


const AddCard = () => {
  const initialState = {
    front: "",
    back: "",
  };

  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState(initialState);

  const { deckId } = useParams();
  const history = useHistory()




  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck);
    return () => abortController.abort();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    createCard(deckId, formData, abortController.signal);
    setFormData(initialState);
  };


  return (
    <React.Fragment>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to='/'>Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className='breadcrumb-item active' aria-current='page'>Add Card</li>
            </ol>
        </nav>
        <h3>{deck.name}: Add Card</h3>
        <CardForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formData={formData}
                cancelLabel="Done"
                submitLabel="Save" 
                goToDeck={() => history.push(`/decks/${deckId}`)} />

    </React.Fragment>
  );
};

export default AddCard;
