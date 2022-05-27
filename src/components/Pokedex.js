import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Display from "./Display";
import GenI from "./GenI";

const initialState = []

const Pokedex = () => {

    // const [pokemon, setPokemon] = useState([]);
    const [boi, setBoi] = useState(10);
    // const arrx = []

    // const [fact, setFact] = useState('Loading...');

    // useEffect(() => {
    //     axios.get('http://numbersapi.com/random/trivia').then((response) => {
    //         setFact(response.data);
    //     });
    // }, []);

    useEffect( () => {
        // getPoke();
    },[])

    // const getPoke = () => {
    //     axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`)
    //     .then( ({data}) => {
    //         const arr = data.results.map( (e) => e.url );
    //         const arrx = [];

    //         const y = arr.map( async (u) => { 
    //             await axios.get(u)
    //             .then( ({data}) => {
    //                 const arrz = data
    //                 console.log(data)
    //                 setPokemon((prev) => ([ ...prev, data ]))
    //                 // setPokemon([data, ...pokemon])
    //                 // pokemon.push(data);
    //             });
    //         })
    //         // Promise.all(arr).then((values) => {
    //         //     cons
    //         // })
    //     })
    // }

    const _handleChange = () => {
        // setPokemon([])
        // .then( () => setBoi(5))
        // .then( () => getPoke())
        // setTimeout( () => {
        // const set = async () => {
        //     await setBoi(5)
        //     await getPoke()

        // }
        //     console.log('hey')
        // }, 1000)
    }

    const _handleChangex = () => {
        setBoi(10)
    }



    // const   { data }   = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=0`);
    // console.log(data.results)
    // const arr = data.results.map( (x) =>  x.url )
    // setPokemon(arr);
    // // response(); 
    // setTimeout( () => {
    //     pokemon.map( (x) => {
    //         const { data } = axios.get(x)
    //         setBoi((prev) => ({ ...prev, data}))
    //     });
    //     console.log(pokemon)
    // }, 3000)


    // const response = () => {
    //     const y = pokemon.map( async (x) => {
    //        const z = await axios.get(x)
    //        return z["[[PromiseResult]]"];
            
    //     })
    //     setBoi(y)
    //     console.log(y)
    //     }

    // const handleChange = (event) => {
    //     setState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    // };
        
    
//     <ul className='transaction-list'>
//     {props.items.map((transaction) => {
//       return <div key={transaction.id}>
//                 <TransactionItem
//                   id={transaction.id}
//                   title={transaction.title}
//                   type={transaction.type_of}
//                   description={transaction.description}
//                   amount={transaction.amount}
//                   date={transaction.date}
//                   receipt={transaction.receipt}
//                   category_id={transaction.category_id}
//                   categories={props.categories}
//                   onDeleteTransaction={props.onDeleteTransaction}
//                   onUpdateTransaction={props.onUpdateTransaction}
//                 />
//               </div>
//       })}
//   </ul>


    // const handleQuery = async (i) => {
    //     const { data } = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`);
    //     // const { data } = await fetch(`https://pokeapi.co/api/v2/pokemon/${ i }`);
    //     // setItems(data.sprites.other["official-artwork"]["front_default"])
    //     // setItems(data.sprites.versions["generation-v"]["black-white"].animated.front_shiny)
    //     console.log(data)
    // };

    return (
        <div>
            <GenI />
            {/* <button onClick={_handleChange}>Pokedex1</button>
            <button onClick={_handleChangex}>Pokedex</button>
            <ul>
                {
                    pokemon.map( (x) => {
                        return <li key={Math.random()}>
                                {x.name}
                                <img src={x.sprites.versions["generation-v"]["black-white"].animated.front_default} />
                                </li>
                    })
                }
            </ul>      */}
        </div>
    );
};

export default Pokedex;