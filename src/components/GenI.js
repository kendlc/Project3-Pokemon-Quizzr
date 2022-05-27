import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Card,Button, Container, Modal, Row, Col } from "react-bootstrap";

const GenI = () => {
    const [pokemon, setPokemon] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [pokeData, setPokeData] = useState('');

    useEffect( () => {
        if (pokemon.length <= 20){
            getPoke()
        }
    },[])

    const getPoke =  () => {
        for (let i = 1; i <= 20; i++ ){
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
                pokemon.sort().map( (pmon) => {
                    return  (    
                                <Card key={Math.random()}
                                style={{ width: '11rem',height: '16rem', backgroundColor: 'rgba(255, 215, 255, 0.1)', margin: '1rem'  }}
                                onClick={() => {
                                    setPokeData(pmon)
                                    setModalShow(true)
                                    }
                                }>

                                <Card.Img variant="bottom" className="align-self-center" style={{ objectFit: 'contain', padding: '.3rem'}} src={pmon.sprites.other["official-artwork"]["front_default"]} />                
                                    <Card.Body className="align-top">
                                        <Card.Title className="align-text-center text-capitalize d-flex justify-content-center">{pmon.name}</Card.Title>
                                        <Container
                                        className="d-flex justify-content-center">
                                            <Button variant="outline-primary" className="btn-sm " disabled>{
                                                pmon.types[0].type.name.charAt(0).toUpperCase() + pmon.types[0].type.name.slice(1)
                                                }</Button>
                                            { pmon.types[1] &&
                                                <Button variant="outline-danger" className="btn-sm " disabled>{
                                                    pmon.types[1].type.name.charAt(0).toUpperCase() + pmon.types[1].type.name.slice(1)
                                                    }</Button>
                                            }
                                        </Container>
                                    </Card.Body>
                                </Card>
                            )   
                })
            }
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                pdata={pokeData}
            />
        </Container>
    );
};

function MyVerticallyCenteredModal(props) {
    const [flavorText, setFlavorText] = useState([])

    useEffect( () => {
        pokeEntry();
    },[props.pdata])

    const pokeEntry = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${props.pdata.id || 'pikachu'}`)
        .then( ({data}) => {
            setFlavorText(data);
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
                { props.pdata ? `# ${props.pdata.id} ${ props.pdata.name.charAt(0).toUpperCase() + props.pdata.name.slice(1) }` : '...'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={3} 
                    className="d-flex justify-content-lg-end justify-content-center"
                    >
                        <div style={{height: '10rem', objectFit: 'contain'}}>
                            <img src={props.pdata ? props.pdata.sprites.versions["generation-v"]["black-white"].animated.front_default : ''}
                            className="align-self-center img-fluid" 
                            style={{ width: '10rem', padding: '.3rem'}}
                            // style={{transform: 'scale(2)'}}
                            // className="img-fluid "
                            />
                        </div>
                    </Col>
                    <Col sm={9}>
                        <h4>{props.pdata ? flavorText.genera[7].genus : '...'}</h4>
                        <p>
                            <Button variant="outline-primary" className="btn-sm " disabled>{
                                props.pdata ? props.pdata.types[0].type.name.charAt(0).toUpperCase() + props.pdata.types[0].type.name.slice(1) : '...'
                            }</Button>
                            { props.pdata ? 
                                props.pdata.types[1] &&
                                <Button variant="outline-danger" className="btn-sm " disabled>{
                                    props.pdata.types[1].type.name.charAt(0).toUpperCase() + props.pdata.types[1].type.name.slice(1)
                                    }</Button>
                                : '...'
                            }
                        </p>
                        <p>
                            {props.pdata ? flavorText['flavor_text_entries'][71]['flavor_text'] : '...'}
                        </p>
                        <div
                        style={{ justifyContent: 'space-around'}}
                        >
                            <span>Egg Group:
                                <Button variant="outline-secondary" className="btn-sm mx-1" disabled>
                                    {props.pdata ?
                                    flavorText.egg_groups[0].name.charAt(0).toUpperCase() + flavorText.egg_groups[0].name.slice(1)
                                    : '...' }
                                </Button>
                                <Button variant="outline-secondary" className="btn-sm mx-1" disabled>
                                    {props.pdata ?
                                    flavorText.egg_groups[1].name.charAt(0).toUpperCase() + flavorText.egg_groups[1].name.slice(1)
                                    : '...' }
                                </Button >
                            </span>
                            <span className="mx-5">
                                Height:
                                <Button variant="outline-secondary" className="btn-sm mx-1" disabled>
                                    {props.pdata ?
                                    props.pdata.height/10
                                    : '...' } m
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

export default GenI;

// <Card className="bg-dark text-white card h-200">
                                // <Card.Img src={x.sprites.versions["generation-v"]["black-white"].animated.front_shiny} alt="Card image" />
                                // <Card.ImgOverlay>
                                //     <Card.Title>{x.name}</Card.Title>
                                // </Card.ImgOverlay>
                                // </Card>

                                    // const pokeEntry = () => {
    //     axios.get(`https://pokeapi.co/api/v2/pokemon-species/${props.id}`)
    //     .then( (results) => {
    //         setPokeText(results.data)
    //     })
    // }

    // .name.charAt(0).toUpperCase() + props.pdata.name.slice(1)