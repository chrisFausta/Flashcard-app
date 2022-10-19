import React from "react";
import {  Route, Switch  } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "../Deck-Components/CreateDeck";
import EditDeck from "../Deck-Components/EditDeck";
import Study from "../Study/Study";
import AddCard from "../Card-Components/AddCard";
import EditCard from "../Card-Components/EditCard";
import ViewDeck from "../Deck-Components/ViewDeck";
import Home from "../Home/Home";

function Layout() {


  return (
    
    <main>
      <Header />
      <div className="container">
        <Switch>
          <Route  path= "/decks/new">
            <CreateDeck />
          </Route>
          <Route  path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route  path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route  path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </main>
  );
}

export default Layout;
