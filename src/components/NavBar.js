import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {

    return (
        <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/pokedex">Pokedex</NavLink>
            <NavLink to="/pokequiz">PokeQuiz</NavLink>
            <NavLink to="/pokeprofile">PokeProfile</NavLink>
            <NavLink to="/pokequiz">PokeQuiz</NavLink>
            <NavLink to="/pokeshop">PokeShop</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
        </div>
    );
};

export default NavBar;