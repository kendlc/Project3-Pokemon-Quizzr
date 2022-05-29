import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Navbar, Nav, Form, FormControl, Button, Modal, Row, Col } from "react-bootstrap";
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
    const [query, setQuery] = useState('');
    const [pokeSearch, setPokeSearch] = useState('');
    const [genSelected, setGenSelected] = useState("-")
    const [modalShow, setModalShow] = useState(false);


    const _handleInput = (e) => {
        e.preventDefault();
        setQuery(e.target.value)
    }

    const _handleGenSelect = (e) => {
        setGenSelected(e.target.value)
    };

    const _handlePokeSearch = async (e) => {
        e.preventDefault();
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${ query }`);
        setPokeSearch(data)
        setModalShow(true)
    };

    return (
        <Container>
            <Navbar expand="lg">
                <Container>
                    <Nav className="mr-5">
                        <Navbar.Text 
                        className="align-text-top" 
                        style={{fontSize: '3rem'}}>
                            POKEDEX
                        </ Navbar.Text>
                    </Nav>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-start flex-grow-1 pe-3 ">
                            <Form 
                            className="d-flex"
                            onSubmit={_handlePokeSearch}
                            >
                                <FormControl
                                type="search"
                                placeholder="Pokemon Name or Number"
                                className="me-2 mx-5"
                                style={{width: '15rem'}}
                                aria-label="Search"
                                onChange={_handleInput}
                                />
                                <Button 
                                type="submit"
                                variant="outline-secondary">
                                    Search
                                </Button>
                            </Form >
                        <Nav 
                        className="mx-5">
                            <Navbar.Text>
                                Select Generation:
                            </ Navbar.Text>
                            <Form.Select 
                            aria-label="Default select example" 
                            style={{width: '10rem'}}
                            name="Gen" 
                            value={genSelected} 
                            onChange={_handleGenSelect}>
                                <option value="-">-</option>
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
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

            { genSelected === "-" &&
                <Container style={{height: '70vh'}} className="mt-5 d-flex justify-content-center">
                    <Row
                    className="mt-2">
                        <Col sm={5} className="d-flex mt-5 justify-content-center justify-content-sm-end">
                            <div>
                            <h1 style={{textAlign: 'right'}}>Start</h1>
                            <h1>Researchin'!</h1>
                            </div>
                        </Col>
                        <Col sm={7}>
                            <img src="./images/pikachu.webp" width={500} className="img-fluid mr-5"/>
                        </Col>
                    </Row>
                </Container>
            }
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
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                pdata={pokeSearch}
            />
        </Container>
    );
};

const MyVerticallyCenteredModal = (props) => {
    const [flavorText, setFlavorText] = useState('')
    const [egg, setEgg] = useState([])
    const [genus, setGenus] = useState('')

    useEffect( () => {
        pokeEntry();
    },[props.pdata])

    const pokeEntry = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${props.pdata.id || ''}`)
        .then( ({data}) => {
            setEgg(data.egg_groups);
            setGenus(data.genera[7].genus);
            if (props.pdata.id >= 1 && props.pdata.id <= 151) {
                setFlavorText(data.flavor_text_entries[71].flavor_text);
            }
            if (props.pdata.id >= 152 && props.pdata.id <= 251) {
                setFlavorText(data.flavor_text_entries[49].flavor_text);
            }
            if (props.pdata.id >= 252 && props.pdata.id <= 386) {
                setFlavorText(data.flavor_text_entries[46].flavor_text);
            }
            if (props.pdata.id >= 387 && props.pdata.id <= 493) {
                setFlavorText(data.flavor_text_entries[50].flavor_text);
            }
            if (props.pdata.id >= 494 && props.pdata.id <= 649) {
                setFlavorText(data.flavor_text_entries[65].flavor_text);
            }
            if (props.pdata.id >= 650 && props.pdata.id <= 721) {
                setFlavorText(data.flavor_text_entries[22].flavor_text);
            }
            if (props.pdata.id >= 810 && props.pdata.id <= 898) {
                setFlavorText(data.flavor_text_entries[17].flavor_text);
            }
        })
    }
    
    return (
      <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
      >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                { props.pdata ? `# ${ props.pdata.id} ${ props.pdata.name.charAt(0).toUpperCase() + props.pdata.name.slice(1) }` : ''}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={3} 
                    className="d-flex justify-content-lg-end justify-content-center"
                    >
                        <div style={{ height: '10rem', objectFit: 'contain'}}>
                            <img src={ props.pdata ?  
                                ( (props.pdata.id >= 494) ? props.pdata.sprites.front_default :
                                props.pdata.sprites.versions["generation-v"]["black-white"].animated.front_default) : ''}
                            className="align-self-center img-fluid" 
                            style={{ width: '10rem', padding: '.3rem'}}
                            />
                        </div>
                    </Col>
                    <Col sm={9}>
                        <h4> {genus} </h4>
                        <p>
                            <Button variant="outline-primary" className="btn-sm text-capitalize" disabled>{
                                props.pdata ? props.pdata.types[0].type.name : ''
                            }</Button>
                            { props.pdata ? 
                                props.pdata.types[1] &&
                                <Button variant="outline-danger" className="btn-sm text-capitalize mx-2" disabled>{
                                    props.pdata.types[1].type.name
                                    }</Button>
                                : ''
                            }
                        </p>
                        <p> { flavorText } </p>
                        <div
                        style={{ justifyContent: 'space-around'}}
                        >
                            { egg && 
                            <span>Egg Group:
                                { egg.map( (e) => {
                                    return (
                                        <Button key={ Math.random() } variant="outline-secondary" className="btn-sm mx-1 text-capitalize" disabled>
                                            {e.name}
                                        </Button>
                                    )
                                })}
                            </span>
                            }
                            <span className="mx-5">
                                Height:
                                <Button variant="outline-secondary" className="btn-sm mx-1" disabled>
                                    {props.pdata ?
                                    props.pdata.height/10
                                    : '' } m
                                </Button>
                            </span>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
      </Modal>
    );
  }


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