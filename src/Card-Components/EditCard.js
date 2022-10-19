import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";


const EditCard = () => {
    
    const [deck, setDeck] = useState({})
    const {  deckId, cardId } = useParams()
    const history = useHistory()
  
    
    const initialState = {
        front: '',
        back: "",
        id: cardId,
        deckId: deckId
    };
    
    const [formData, setFormData] = useState(initialState);
    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(setDeck)
        return () => abortController.abort();
    },[deckId])

    useEffect(() => {
        const abortController = new AbortController();
        readCard(cardId, abortController.signal).then(setFormData)
        return () => abortController.abort();
    },[cardId])



    const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        updateCard( formData, abortController.signal);
        setFormData(initialState);
        history.push(`/decks/${deckId}`);
      };



    if (!formData.id) {
        return <p>Loading...</p>
    } else {
        return(
            <React.Fragment>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/'>Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Edit Card {cardId}
                        </li>
                    </ol>
                </nav>

                <h2>Edit Card</h2>
                <CardForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formData={formData}
                cancelLabel="Cancel"
                submitLabel="Submit"
                goToDeck={() => history.push(`decks/${deckId}`)} />
            </React.Fragment>
        );
    }
}
 
export default EditCard;