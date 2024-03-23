import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Row, Col } from "react-bootstrap";
import LoadingIndicator from "../LoadingIndicator";
import { addImageProcess } from "../../helpers";

const PokemonDetailsModal = ({ isModalVisible, onClose, pokeData }) => {
  const [pokemonDetails, setPokemonDetails] = useState({
    flavorText: "",
    egg: [],
    genus: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const pokeEntry = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${pokeData.id}`
        );
        await addImageProcess(
          pokeData.sprites.other["official-artwork"]["front_default"] ||
            pokeData.sprites.other["official-artwork"]["front_default"] ||
            ""
        );
        const flavorText =
          data.flavor_text_entries
            ?.reverse()
            .find((item) => item.language.name === "en")?.flavor_text ||
          "No text entry";
        const genus =
          data.genera?.reverse().find((item) => item.language.name === "en")
            ?.genus || "";
        setPokemonDetails({
          flavorText,
          egg: data.egg_groups,
          genus,
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (pokeData) pokeEntry();
  }, [pokeData]);

  return (
    <Modal
      show={isModalVisible}
      onHide={onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {isLoading ? (
        <div style={{ height: 351 }}>
          <LoadingIndicator />
        </div>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {pokeData
                ? `# ${pokeData.id} ${
                    pokeData.name.charAt(0).toUpperCase() +
                    pokeData.name.slice(1)
                  }`
                : ""}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col
                sm={3}
                className="d-flex justify-content-lg-end justify-content-center"
              >
                <div style={{ height: "10rem", objectFit: "contain" }}>
                  <img
                    src={
                      (pokeData &&
                        (pokeData.sprites.versions["generation-v"][
                          "black-white"
                        ].animated.front_default ||
                          pokeData.sprites.other["official-artwork"][
                            "front_default"
                          ])) ||
                      ""
                    }
                    className="align-self-center img-fluid"
                    style={{ width: "10rem", padding: ".3rem" }}
                    alt="Poke Sprite"
                  />
                </div>
              </Col>
              <Col sm={9}>
                <h4> {pokemonDetails.genus} </h4>
                <p>
                  <Button
                    variant="outline-primary"
                    className="btn-sm text-capitalize"
                    disabled
                  >
                    {pokeData ? pokeData.types[0].type.name : ""}
                  </Button>
                  {pokeData
                    ? pokeData.types[1] && (
                        <Button
                          variant="outline-danger"
                          className="btn-sm text-capitalize mx-2"
                          disabled
                        >
                          {pokeData.types[1].type.name}
                        </Button>
                      )
                    : ""}
                </p>
                <p> {pokemonDetails.flavorText} </p>
                <div style={{ justifyContent: "space-around" }}>
                  {!!pokemonDetails.egg.length && (
                    <span style={{ marginRight: 50 }}>
                      Egg Group:
                      {pokemonDetails.egg.map((e) => {
                        return (
                          <Button
                            key={Math.random()}
                            variant="outline-secondary"
                            className="btn-sm mx-1 text-capitalize"
                            disabled
                          >
                            {e.name}
                          </Button>
                        );
                      })}
                    </span>
                  )}
                  <span>
                    Height:
                    <Button
                      variant="outline-secondary"
                      className="btn-sm mx-1"
                      disabled
                    >
                      {pokeData ? pokeData.height / 10 : ""} m
                    </Button>
                  </span>
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onClose}>Close</Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default PokemonDetailsModal;
