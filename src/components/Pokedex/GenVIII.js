import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Card,Button, Container, Modal, Row, Col } from "react-bootstrap";

const GenII = () => {
    const [pokemon, setPokemon] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [pokeData, setPokeData] = useState('');

    useEffect( () => {
            getPoke()
    },[])

    const getPoke =  () => {
        for (let i = 810; i <= 898; i++ ){
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
                pokemon.sort((a,b)=>a.id>b.id?1:-1).map( (pmon) => {
                    return  (    
                                <Card key={Math.random()}
                                style={{ width: '11rem',height: '16rem', backgroundColor: 'rgba(255, 215, 255, 0.1)', margin: '1rem'  }}
                                onClick={() => {
                                    setPokeData(pmon)
                                    setModalShow(true)
                                    }
                                }>

                                <Card.Img variant="bottom" className="align-self-center" style={{ objectFit: 'contain', padding: '.3rem'}} src={pmon.sprites.other["official-artwork"]["front_default"]} />                
                                    <Card.Body className="align-top p-2">
                                        <Card.Title className="align-text-center text-capitalize d-flex justify-content-center">{pmon.name}</Card.Title>
                                        <Container
                                        className="d-flex justify-content-center">
                                            <Button variant="outline-primary" className="btn-sm text-capitalize mx-1" disabled>{
                                                pmon.types[0].type.name
                                                }</Button>
                                            { pmon.types[1] &&
                                                <Button variant="outline-danger" className="btn-sm text-capitalize" disabled>{
                                                    pmon.types[1].type.name
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

const MyVerticallyCenteredModal = (props) => {
    const [flavorText, setFlavorText] = useState('')
    const [egg, setEgg] = useState([])
    const [genus, setGenus] = useState('')

    useEffect( () => {
        pokeEntry();
    },[])

    const pokeEntry = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${props.pdata.id || ''}`)
        .then( ({data}) => {
            setFlavorText(data.flavor_text_entries[17].flavor_text);
            setEgg(data.egg_groups);
            setGenus(data.genera[7].genus)
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
                            <img src={ props.pdata ? props.pdata.sprites.front_default : ''}
                            className="align-self-center img-fluid" 
                            style={{ width: '10rem', padding: '.3rem'}} alt="Poke Sprite"
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
                            <span>Egg Group:
                                { egg.map( (e) => {
                                    return (
                                        <Button key={ Math.random() } variant="outline-secondary" className="btn-sm mx-1 text-capitalize" disabled>
                                            {e.name}
                                        </Button>
                                    )
                                })}
                            </span>
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

export default GenII;

