import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Container } from "react-bootstrap";
import LoadingIndicator from "../LoadingIndicator";
import PokemonDetailsModal from "./PokemonDetailsModal";
import { addImageProcess } from "../../helpers";

const PokedexGenerationList = ({ genSelected }) => {
  const [pokemon, setPokemon] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [pokeData, setPokeData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPoke = async () => {
      try {
        const { start, end } = genSelected;
        const limit = end - start + 1;
        setIsLoading(true);
        const pokedexList = [...Array(limit).keys()].map(async (_, i) => {
          const { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${start + i}`
          );
          if (i <= 18) {
            await addImageProcess(
              data.sprites.other["official-artwork"]["front_default"]
            );
          }
          return data;
        });
        const pokedexListPromise = await Promise.all(pokedexList);
        setPokemon(pokedexListPromise);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (genSelected) getPoke();
  }, [genSelected]);

  return (
    <Container className="d-flex align-content-stretch flex-wrap">
      {isLoading ? (
        <div style={{ height: "80vh", width: "100vw" }}>
          <LoadingIndicator />
        </div>
      ) : (
        pokemon.map((pmon) => {
          return (
            <Card
              key={Math.random()}
              style={{
                width: "11rem",
                height: "16rem",
                backgroundColor: "rgba(255, 215, 255, 0.1)",
                margin: "1rem",
              }}
              onClick={() => {
                setPokeData(pmon);
                setModalShow(true);
              }}
            >
              <Card.Img
                variant="bottom"
                className="align-self-center"
                style={{ objectFit: "contain", padding: ".3rem" }}
                src={pmon.sprites.other["official-artwork"]["front_default"]}
                loading="lazy"
              />
              <Card.Body className="align-top p-2">
                <Card.Title className="align-text-center text-capitalize d-flex justify-content-center">
                  {pmon.name}
                </Card.Title>
                <Container className="d-flex justify-content-center">
                  <Button
                    variant="outline-primary"
                    className="btn-sm text-capitalize mx-1"
                    disabled
                  >
                    {pmon.types[0].type.name}
                  </Button>
                  {pmon.types[1] && (
                    <Button
                      variant="outline-danger"
                      className="btn-sm text-capitalize"
                      disabled
                    >
                      {pmon.types[1].type.name}
                    </Button>
                  )}
                </Container>
              </Card.Body>
            </Card>
          );
        })
      )}
      <PokemonDetailsModal
        isModalVisible={modalShow}
        onClose={() => setModalShow(false)}
        pokeData={pokeData}
      />
    </Container>
  );
};

export default PokedexGenerationList;
