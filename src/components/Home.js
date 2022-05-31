import React from "react";
import { Container,Row,Col } from "react-bootstrap";
import Authentication from "./Authentication";
import FeaturedPokemons from "./FeaturedPokemons";
import LeaderboardHome from "./LeaderboardHome";

const Home = () => {

    return(
        <Container > 
            <Row className="mx-auto">
                <Col sm className="mt-5 d-flex justify-content-lg-end justify-content-center">
                    <img src="./images/pikachu.webp" width={400} className="img-fluid" alt="Prof Pikachu"/>
                </Col>
                <Col className="mt-5 text-sm-left">
                        <h2 className="text-sm-left mb-4" style={{color: 'gray'}}>
                        Welcome to Pokemon Quizzr!
                        </h2>
                        <p className="text-sm-left mb-4" style={{fontSize: '18px', color: 'gray'}}>
                            Test your Pokemon knowledge and become the Poke Quizzr Champion!
                        </p>
                        <p className="text-sm-left mb-4" style={{fontSize: '18px', color: 'gray'}}>
                            Climb your way to the top through the <strong>POKEDEX</strong> where you can study all 905 pokemons!
                        </p>
                        <p className="text-sm-left mb-4" style={{fontSize: '18px', color: 'gray'}}>
                            Be the very best and top the <strong>LEADERBOARD</strong>!
                        </p>
                    <div className="d-flex mt-4 justify-content-center justify-content-sm-start">
                        <Authentication />
                    </div>
                </Col>
            </Row>
            <Container>
                <Row className="mt-5">
                    <h4 style={{color: 'gray'}}>
                        Featured Pokemon
                    </h4>
                    <Col sm className="mt-3 mx-auto d-flex justify-content-center">
                        <FeaturedPokemons />
                    </Col>
                    <Col sm style={{marginTop: '-3rem'}}>
                        <LeaderboardHome />
                    </Col>
                </Row>
            </Container>
            
        </Container>
    );
};

export default Home; 