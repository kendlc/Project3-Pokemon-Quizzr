import React,{useState, useEffect} from "react";
import axios from 'axios';
import {Carousel, Card, Container, Button, Row, Col} from "react-bootstrap";



const FeaturedPokemons = () => {

    const [pokemon, setPokemon] = useState([]);
    const [pokeEntry, setPokeEntry] = useState([]);
    const [pokeData, setPokeData] = useState([]);

    useEffect( () => {
            getPoke()
    },[]);

    const getPoke =  () => {
        for (let i = 1; i <= 3; i++ ){
            axios.get(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 898)}`).then(
                async (result) => {
                   await setPokemon((prev) => ([ ...prev, result.data ]))
                   await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${ result.data.id }`)
                   .then( ({data}) => {
                    setPokeData((prev) => ([ ...prev, data ]))
                    setPokeEntry( (prev) => ([ ...prev, {...result.data, ...data} ]))
                   })
                }
            )
        }
    };

    return (
        <div>
            {/* { pokeEntry.lenth === 3 &&} */}
            <h4>Featured Pokemon</h4>
            <Carousel variant="dark" interval={3000}>
                { pokeEntry.map( (poke) => {
                    return (
                            <Carousel.Item key={Math.random()}>
                                <Card
                                style={{background: 'rgba(255,255,255, 0.1'}}>
                                    <Card.Header
                                    className="text-capitalize">
                                        <h4><span>#{poke.id} </span>{poke.name }</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <Col sm={4} className="text-sm-end text-center">
                                                <h4> 
                                                    {poke.genera[7] ? poke.genera[7].genus : ''} 
                                                </h4> 
                                                <p>
                                                    <Button variant="outline-primary" className="btn-sm text-capitalize" disabled>{
                                                        poke.types[0] ? poke.types[0].type.name : ''
                                                    }</Button>
                                                    { poke.types[1] ? 
                                                        poke.types[1] &&
                                                            <Button variant="outline-danger" className="btn-sm text-capitalize" disabled>
                                                                {poke.types[1].type.name}
                                                            </Button>
                                                        : ''
                                                    }
                                                </p>
                                            </Col>
                                            <Col sm={8}>
                                                <Container className="d-flex justify-content-center justify-content-sm-start">
                                                    <img 
                                                    className="img-fluid"
                                                    style={{height: '15rem'}}
                                                    src={poke.sprites.other["official-artwork"]["front_default"]} />
                                                </Container>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>
                    )
                })}
            </Carousel>
            {/* <Carousel variant="dark" interval={1000000}>
            <Carousel.Item >
                
                <Card>
                <Card.Header
                className="text-capitalize">
                    <span>#{pokemon[0].id} </span>{pokemon.name } 
                </Card.Header>
                <Card.Body
                style={{height: '16rem'}}>
                    <Row>
                        
                        <Col sm={3}>
                            <h4> {pokeData[0].genera[7].genus} </h4> 
                            <p>
                                <Button variant="outline-primary" className="btn-sm text-capitalize" disabled>{
                                    // pokemon ? pokemon.types[0].type.name : ''
                                }</Button>
                                { pokemon[0] ? 
                                    // pokemon.types[1] &&
                                    <Button variant="outline-danger" className="btn-sm text-capitalize mx-2" disabled>{
                                        pokemon[0].types[1].type.name
                                        }</Button>
                                    : ''
                                }
                            </p>
                            <Card.Text>
                            With supporting text below as a natural lead-in to additional content.
                            </Card.Text>
                        </Col>
                        <Col sm={9}>
                            <Container className="d-flex justify-content-center">
                            <img 
                            style={{height: '15rem'}}
                            src={pokemon[0].sprites.other["official-artwork"]["front_default"]} />
                            </Container>
                        </Col>
                    

                    </Row>
                </Card.Body>
                </Card>
            </Carousel.Item> */}


            {/* <Carousel.Item interval={2000}>
            <div 
                style={{backgroundColor: 'pink', width: '300', height: '100'}}
                >
                <img
                className="d-block w-100"
                src="http://www.fillmurray.com/600/300"
                alt="Second slide"
                />
                </div>
            </Carousel.Item>
            <Carousel.Item>
            <div 
                style={{backgroundColor: 'pink', width: '300', height: '100'}}
                >
                <img
                className="d-block w-100"
                src="http://www.fillmurray.com/600/300"
                alt="Second slide"
                />
                </div>
                <img
                className="d-block w-100"
                src="http://www.fillmurray.com/800/402"
                alt="Third slide"
                />
                <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption> 
            </Carousel.Item> */}
            {/* </Carousel> */}
        </div>
                           
    );
};

export default FeaturedPokemons;

