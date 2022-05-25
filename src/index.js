import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
// import { HashRouter as Router, Route, Routes } from 'react-router-dom';

// import Home from './components/Home';
// import Pokedex from './components/Pokedex';
// import Pokemon from './components/Pokemon';
// import PokeProfile from './components/PokeProfile';
// import PokeQuiz from './components/PokeQuiz';
// import PokeShop from './components/PokeShop';
// import Leaderboard from './components/Leaderboard';
// import NavBar from './components/NavBar';
// import Header from './components/Header';

// // routes is just a variable that contains JSX (it's not a function or class component

// const routes = (
//   <Router>
//   <Header />
//     <Routes>
//       <Route exact path="/" element={ <App /> } />
//       <Route path="/pokedex" element={ <Pokedex />} />
//       <Route path="/pokedex/:pokemonId" element={ <Pokemon /> }/>
//       <Route path="/pokeprofile" element={ <PokeProfile />} />
//       <Route path="/pokequiz" element={ <PokeQuiz />} />
//       <Route path="/pokeshop" element={ <PokeShop />} />
//       <Route path="/leaderboard" element={ <Leaderboard />} />
//     </Routes>
//   </Router>
// );



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();





