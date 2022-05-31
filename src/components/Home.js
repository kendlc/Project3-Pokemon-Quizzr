import React from "react";
import { Container,Row,Col } from "react-bootstrap";
import Authentication from "./Authentication";
import FeaturedPokemons from "./FeaturedPokemons";
import LeaderboardHome from "./LeaderboardHome";

const Home = () => {

    return(
        <Container > 
            <Row className=" mx-auto">
                <Col sm className="mt-4 d-flex justify-content-lg-end justify-content-center">
                    <img src="./images/pikachu.webp" width={300} className="img-fluid mr-5" alt="Prof Pikachu"/>
                </Col>
                <Col className="mt-5">
                        <p className="text-sm-left">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, ducimus labore id nisi ad molestias iusto nobis dolore, vel soluta a 
                        atque officia voluptatem. Earum repellendus quis dolorum sunt non.
                        </p>
                    <div className="d-flex mt-5 justify-content-center justify-content-sm-start">
                        <Authentication />
                    </div>

                </Col>
            </Row>
            <Container>
                <Row className="mt-1">
                    <h4 style={{color: 'gray'}}>
                        Featured Pokemon
                    </h4>
                    <Col sm className="mt-3 mx-auto d-flex justify-content-center">
                        <FeaturedPokemons />
                    </Col>
                    <Col sm className="mx-auto d-flex justify-content-center" style={{marginTop: '-3rem'}}>
                        <LeaderboardHome />
                    </Col>
                </Row>
            </Container>
            
        </Container>
    );
};

export default Home; 