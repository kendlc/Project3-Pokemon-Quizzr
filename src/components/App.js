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
import './App.css';
import { Container } from 'react-bootstrap';

const bg = {
  height: '100%',
  background: 'url("./images/pokebg.png") no-repeat center center fixed',
  backgroundSize: 'cover'
}

const cont = {
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  height: '100%'
}

function App() {

  return (
    <div className="App" style={bg}>
        <Router>
          <Navigation />
          <Container style={cont}>
              <Routes>
                <Route exact path="/" element={ <Home /> } />
                <Route path="/pokedex" element={ <Pokedex />} />
                <Route path="/pokedex/:pokemonId" element={ <Pokemon /> }/>
                <Route path="/pokeprofile" element={ <PokeProfile />} />
                <Route path="/pokequiz" element={ <PokeQuiz />} />
                <Route path="/pokeshop" element={ <PokeShop />} />
                <Route path="/leaderboard" element={ <Leaderboard />} />
              </Routes>
          </ Container>
        </Router>
    </div>
  );
}

export default App;