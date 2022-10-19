import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../utils/api";
import React from "react";



const CardTile = ({ card }) => {
  const { url } = useRouteMatch();
  const history = useHistory()
  const cardId = card.id;

  const handleDelete = () => {
    if (window.confirm("Delete this card? \n You will not be able to recover it.")) {
      deleteCard(cardId).then(() =>history.go()) 
    }  
  
  }
  if (!card.id) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="card p-3" >
        <p>{card.front}</p>
        <p>{card.back}</p>
        <div className="d-flex justify-content-end">
          <Link to={`${url}/cards/${card.id}/edit`}>
            <button className="btn btn-secondary">Edit</button>
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    );
  }
};

export default CardTile;
