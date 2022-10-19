import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

const EditDeck = () => {
  const { deckId } = useParams();
  const history = useHistory();
  const initialFormState = {
    name: "",
    description: "",
    id: deckId,
  };

  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState(initialFormState);
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck);
    return () => abortController.abort();
  }, [deckId]);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setFormData);
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
    updateDeck(formData, abortController.signal);
    setFormData(initialFormState);
    history.push(`/decks/${deckId}`);
  };
  if (!formData.id) {
    return <p>Loading...</p>;
  } else {
    return (
      <React.Fragment>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
        <form onSubmit={handleSubmit}>
          <h1>Edit Deck</h1>
          <div className="form-group">

      
          <label htmlFor="name">Name</label>
          <input
              type="text"
              id="name"
              name="name"
              className='form-control form-control-lg'
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>
          <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
              id="description"
              name="description"
              onChange={handleChange}
              className='form-control'
              rows='5'
              value={formData.description}
              required
            />
          </div>
          <br />
          <button
            className="btn btn-secondary"
            onClick={() => history.push(`/decks/${deckId}`)}
          >
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
};

export default EditDeck;
