import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Card,Button, Container } from "react-bootstrap";

const GenII = () => {
    const [pokemon, setPokemon] = useState([]);

    useEffect( () => {
        if (pokemon.length <= 151){
            getPoke()
        }
    },[])

    const getPoke =  () => {
        for (let i = 152; i <= 251; i++ ){
            axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).then(
                async (result) => {
                   await setPokemon((prev) => ([ ...prev, result.data ]))
                }
            )
        }
    }

    return (
        <Container className="d-flex align-content-stretch flex-wrap">
                {
                    pokemon.sort().map( (x) => {
                        return  (    
                                    <Card key={Math.random()}
                                    style={{ width: '11rem',height: '16rem', backgroundColor: 'rgba(255, 215, 255, 0.1)', margin: '1rem'  }}>
                                    <Card.Img variant="bottom" className="align-self-center" style={{ objectFit: 'contain', padding: '.3rem'}} src={x.sprites.other["official-artwork"]["front_default"]} />                
                                        <Card.Body className="align-bottom">
                                            <Card.Title className="align-text-left">{x.name.charAt(0).toUpperCase() + x.name.slice(1)}</Card.Title>

                                            <Button variant="outline-primary" className="btn-sm align-self-baseline" disabled>{
                                                x.types[0].type.name.charAt(0).toUpperCase() + x.types[0].type.name.slice(1)
                                                }</Button>
                                            { x.types[1] &&
                                                <Button variant="outline-danger" className="btn-sm align-self-baseline" disabled>{
                                                    x.types[1].type.name.charAt(0).toUpperCase() + x.types[1].type.name.slice(1)
                                                    }</Button>
                                            }
                                        </Card.Body>
                                    </Card>
                                )   
                    })
                }
        </Container>
    );
};

export default GenII;

// <Card className="bg-dark text-white card h-200">
                                // <Card.Img src={x.sprites.versions["generation-v"]["black-white"].animated.front_shiny} alt="Card image" />
                                // <Card.ImgOverlay>
                                //     <Card.Title>{x.name}</Card.Title>
                                // </Card.ImgOverlay>
                                // </Card>