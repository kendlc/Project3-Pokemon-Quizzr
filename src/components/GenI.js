import React,{ useState, useEffect } from "react";
import axios from "axios";

const GenI = () => {
    const [pokemon, setPokemon] = useState([]);

    useEffect( () => {
        // getPoke();
    },[])

    const _handleChange = () => {
        // const getPoke =  () => {
            axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`)
            .then( ({data}) => {
                const arr = data.results.map( (e) => e.url );
                arr.map( (u) => { 
                    axios.get(u)
                    .then( async ({data}) => {
                        console.log(data)
                        await setPokemon((prev) => ([ ...prev, data ]))
                    });
                })
            })
        // }
    }

    return (
        <div>
            <button onClick={_handleChange}>Pokedex1</button>
            {/* <button onClick={_handleChangex}>Pokedex</button> */}
            {/* <p>{ fact }</p> */}
            {/* <Display input={pokemon}/> */}
            <ul>
                {
                    pokemon.sort().map( (x) => {
                        return <li key={x.id}>
                                {x.name}
                                <img src={x.sprites.versions["generation-v"]["black-white"].animated.front_default} />
                                </li>
                    })
                }
            </ul>     
        </div>
    );
};

export default GenI;