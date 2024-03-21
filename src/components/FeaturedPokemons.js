import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel, Card, Container, Button, Row, Col } from "react-bootstrap";
import { lastPokemonIndex } from "./../constants";
import { addImageProcess } from "./../helpers";
import LoadingIndicator from "./LoadingIndicator";

const FeaturedPokemons = () => {
  const [featuredPokemonEntries, setFeaturedPokemonEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getFeaturedPokemons();
  }, []);

  const getFeaturedPokemons = async () => {
    setIsLoading(true);
    const featuredPokemons = [...Array(5).keys()].map(async (_, i) => {
      const randomPokemonData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${Math.floor(
          Math.random() * lastPokemonIndex
        )}`
      );
      const randomPokemonSpecieData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${randomPokemonData.data.id}`
      );

      const pokeDataObj = {
        ...randomPokemonData.data,
        ...randomPokemonSpecieData.data,
      };

      if (!i) {
        await addImageProcess(
          pokeDataObj.sprites.other["official-artwork"]["front_default"]
        );
      }
      return pokeDataObj;
    });
    const featuredPokemonsArray = await Promise.all(featuredPokemons);
    setFeaturedPokemonEntries(featuredPokemonsArray);
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Carousel variant="dark" interval={2000}>
          {featuredPokemonEntries.map((poke) => {
            return (
              <Carousel.Item key={Math.random()}>
                <Card style={{ background: "rgba(255,255,255, 0.1" }}>
                  <Card.Header className="text-capitalize">
                    <h4>
                      <span>#{poke.id} </span>
                      {poke.name}
                    </h4>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col
                        sm={4}
                        className="text-sm-end text-center"
                        style={{ minWidth: "8rem" }}
                      >
                        <h4>{poke.genera[7] ? poke.genera[7].genus : ""}</h4>
                        <p>
                          <Button
                            variant="outline-primary"
                            className="btn-sm text-capitalize"
                            disabled
                          >
                            {poke.types[0] ? poke.types[0].type.name : ""}
                          </Button>
                          {poke.types[1]
                            ? poke.types[1] && (
                                <Button
                                  variant="outline-danger"
                                  className="btn-sm text-capitalize"
                                  disabled
                                >
                                  {poke.types[1].type.name}
                                </Button>
                              )
                            : ""}
                        </p>
                      </Col>
                      <Col sm={8}>
                        <Container
                          className="d-flex justify-content-center justify-content-sm-start"
                          style={{ minWidth: "20rem" }}
                        >
                          <img
                            alt="featured pokemon"
                            className="img-fluid"
                            style={{ height: "15rem" }}
                            src={
                              poke.sprites.other["official-artwork"][
                                "front_default"
                              ]
                            }
                          />
                        </Container>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default FeaturedPokemons;
