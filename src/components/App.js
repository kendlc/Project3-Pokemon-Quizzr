import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Pokedex from "./Pokedex/Pokedex";
// import PokeProfile from './FeaturesSoon/PokeProfile';
import PokeQuiz from "./PokeQuiz/PokeQuiz";
// import PokeShop from './PokeShop';
import Leaderboard from "./Leaderboard";
import Navigation from "./Navigation";
import "./App.css";
import { Container } from "react-bootstrap";
import Footer from "./Footer";

function App() {
  const bg = {
    height: `100%`,
    background: 'url("./images/pokebg.png") no-repeat center center fixed',
    backgroundSize: "cover",
  };

  const cont = {
    backgroundColor: "rgba(255, 255, 255, 0.7) ",
    minHeight: `87vh`,
  };

  return (
    <div className="App" style={bg}>
      <Router>
        <Navigation />
        <Container style={cont}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
            {/* <Route path="/pokeprofile" element={ <PokeProfile />} /> */}
            <Route path="/pokequiz" element={<PokeQuiz />} />
            {/* <Route path="/pokeshop" element={ <PokeShop />} /> */}
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
