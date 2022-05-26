import React from "react";
import { Container,Row,Col } from "react-bootstrap";
import Authentication from "./Authentication";
import FeaturedPokemons from "./FeaturedPokemons";
import Leaderboard from "./Leaderboard";

const Home = () => {

    return(
        <Container> 
            <Row className="mb-5 mx-auto">
                <Col sm className="mt-5 d-flex justify-content-lg-end justify-content-center">
                    <img src="./images/pikachu.webp" width={300} className="mr-5"/>
                </Col>
                <Col sm className="mt-5">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, ducimus labore id nisi ad molestias iusto nobis dolore, vel soluta a atque officia voluptatem. Earum repellendus quis dolorum sunt non.</p>
                    <div>
                        <h2 >Sign In to Quiz!</h2>
                        <Authentication />
                    </div>

                </Col>
            </Row>
            <Container>
                <Row>
                    <Col sm className="mt-5 mx-auto d-flex justify-content-center">
                        <FeaturedPokemons />
                    </Col>
                    <Col sm className="mt-5 mx-auto d-flex justify-content-center">
                        <Leaderboard />
                    </Col>
                </Row>
            </Container>
            
        </Container>
    );
};

export default Home; 