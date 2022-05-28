import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import Display from "../Display";
import GenI from "./GenI";
import GenII from "./GenII";
import GenIII from "./GenIII";
import GenIV from "./GenIV";
import GenV from "./GenV";
import GenVI from "./GenVI";
import GenVII from "./GenVII";
import GenVIII from "./GenVIII";



const Pokedex = () => {

    const [genSelected, setGenSelected] = useState("1")

    const _handleGenSelect = (e) => {
        setGenSelected(e.target.value)
    }

    return (
        <Container>
        <Navbar expand="lg">
        <Container>
            <Nav className="mr-5">
            <Navbar.Text className="align-text-top" style={{fontSize: '3rem'}}>POKEDEX</ Navbar.Text>
            </Nav>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="justify-content-start flex-grow-1 pe-3 ">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Pokemon Name or Number"
                className="me-2 mx-5"
                style={{width: '15rem'}}
                aria-label="Search"
              />
              <Button variant="outline-secondary">Search</Button>
            </Form >
            <Nav className="mx-5">
            <Navbar.Text>Select Generation:</ Navbar.Text>
            <Form.Select aria-label="Default select example" style={{width: '10rem'}}
            name="Gen" value={genSelected} onChange={_handleGenSelect}>
                <option value="1">Gen I</option>
                <option value="2">Gen II</option>
                <option value="3">Gen III</option>
                <option value="4">Gen IV</option>
                <option value="5">Gen V</option>
                <option value="6">Gen VI </option>
                <option value="7">Gen VII</option>
                <option value="8">Gen VIII</option>
            </Form.Select>
            </Nav>
                {/* <Nav.Link href="/#/pokedex">Pokedex</Nav.Link>
                <Nav.Link href="/#/pokequiz">PokeQuiz</Nav.Link>
                <Nav.Link href="/#/leaderboard">Leaderboard</Nav.Link> */}
            </Nav>

            </Navbar.Collapse>
        </Container>
        </Navbar>
            { genSelected === "1" &&
                <GenI />
            }
            { genSelected === "2" &&
                <GenII />
            }
            { genSelected === "3" &&
                <GenIII />
            }
            { genSelected === "4" &&
                <GenIV />
            }
            { genSelected === "5" &&
                <GenV />
            }
            { genSelected === "6" &&
                <GenVI />
            }
            { genSelected === "7" &&
                <GenVII />
            }
            { genSelected === "8" &&
                <GenVIII />
            }
        </Container>
    );
};

export default Pokedex;







// const initialState = []

// const Pokedex = () => {

//     // const [pokemon, setPokemon] = useState([]);
//     // const [boi, setBoi] = useState(10);
//     // const arrx = []

//     // const [fact, setFact] = useState('Loading...');

//     // useEffect(() => {
//     //     axios.get('http://numbersapi.com/random/trivia').then((response) => {
//     //         setFact(response.data);
//     //     });
//     // }, []);

//     useEffect( () => {
//         // getPoke();
//     },[])

//     // const getPoke = () => {
//     //     axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`)
//     //     .then( ({data}) => {
//     //         const arr = data.results.map( (e) => e.url );
//     //         const arrx = [];

//     //         const y = arr.map( async (u) => { 
//     //             await axios.get(u)
//     //             .then( ({data}) => {
//     //                 const arrz = data
//     //                 console.log(data)
//     //                 setPokemon((prev) => ([ ...prev, data ]))
//     //                 // setPokemon([data, ...pokemon])
//     //                 // pokemon.push(data);
//     //             });
//     //         })
//     //         // Promise.all(arr).then((values) => {
//     //         //     cons
//     //         // })
//     //     })
//     // }

//     const _handleChange = () => {
//         // setPokemon([])
//         // .then( () => setBoi(5))
//         // .then( () => getPoke())
//         // setTimeout( () => {
//         // const set = async () => {
//         //     await setBoi(5)
//         //     await getPoke()

//         // }
//         //     console.log('hey')
//         // }, 1000)
//     }

//     const _handleChangex = () => {
//         setBoi(10)
//     }



//     // const   { data }   = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=0`);
//     // console.log(data.results)
//     // const arr = data.results.map( (x) =>  x.url )
//     // setPokemon(arr);
//     // // response(); 
//     // setTimeout( () => {
//     //     pokemon.map( (x) => {
//     //         const { data } = axios.get(x)
//     //         setBoi((prev) => ({ ...prev, data}))
//     //     });
//     //     console.log(pokemon)
//     // }, 3000)


//     // const response = () => {
//     //     const y = pokemon.map( async (x) => {
//     //        const z = await axios.get(x)
//     //        return z["[[PromiseResult]]"];
            
//     //     })
//     //     setBoi(y)
//     //     console.log(y)
//     //     }

//     // const handleChange = (event) => {
//     //     setState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
//     // };
        
    
// //     <ul className='transaction-list'>
// //     {props.items.map((transaction) => {
// //       return <div key={transaction.id}>
// //                 <TransactionItem
// //                   id={transaction.id}
// //                   title={transaction.title}
// //                   type={transaction.type_of}
// //                   description={transaction.description}
// //                   amount={transaction.amount}
// //                   date={transaction.date}
// //                   receipt={transaction.receipt}
// //                   category_id={transaction.category_id}
// //                   categories={props.categories}
// //                   onDeleteTransaction={props.onDeleteTransaction}
// //                   onUpdateTransaction={props.onUpdateTransaction}
// //                 />
// //               </div>
// //       })}
// //   </ul>


//     // const handleQuery = async (i) => {
//     //     const { data } = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`);
//     //     // const { data } = await fetch(`https://pokeapi.co/api/v2/pokemon/${ i }`);
//     //     // setItems(data.sprites.other["official-artwork"]["front_default"])
//     //     // setItems(data.sprites.versions["generation-v"]["black-white"].animated.front_shiny)
//     //     console.log(data)
//     // };

//     return (
//         <div>
//             <GenI />
//             {/* <button onClick={_handleChange}>Pokedex1</button>
//             <button onClick={_handleChangex}>Pokedex</button>
//             <ul>
//                 {
//                     pokemon.map( (x) => {
//                         return <li key={Math.random()}>
//                                 {x.name}
//                                 <img src={x.sprites.versions["generation-v"]["black-white"].animated.front_default} />
//                                 </li>
//                     })
//                 }
//             </ul>      */}
//         </div>
//     );
// };

// export default Pokedex;


        // axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`)
        // .then(({data}) => {
        //     const arr = data.results.map( (e) => e.url )
        //     .map((u) => { 
        //         axios.get(u)
        //         .then( async ({data}) => {
        //             await setTimeout( () => {
        //                 setPokemon((prev) => ([ ...prev, data ]))
        //             }, 500)
        //         });
        //     })
        // })