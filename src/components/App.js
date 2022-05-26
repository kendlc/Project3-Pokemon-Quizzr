import React,{useState} from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Pokedex from './Pokedex';
import Pokemon from './Pokemon';
import PokeProfile from './PokeProfile';
import PokeQuiz from './PokeQuiz';
import PokeShop from './PokeShop';
import Leaderboard from './Leaderboard';
import Navigation from './Navigation';

function App() {

  return (
    <div className="App">
      <Router>
      <Navigation />
        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route path="/pokedex" element={ <Pokedex />} />
          <Route path="/pokedex/:pokemonId" element={ <Pokemon /> }/>
          <Route path="/pokeprofile" element={ <PokeProfile />} />
          <Route path="/pokequiz" element={ <PokeQuiz />} />
          <Route path="/pokeshop" element={ <PokeShop />} />
          <Route path="/leaderboard" element={ <Leaderboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;