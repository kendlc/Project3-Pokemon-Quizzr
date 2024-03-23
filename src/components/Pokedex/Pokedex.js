import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import PokedexGenerationList from "./PokedexGenerationList";
import { pokemonGenerationIndexes } from "../../constants";
import PokemonDetailsModal from "./PokemonDetailsModal";

const Pokedex = () => {
  const [query, setQuery] = useState("pikachu");
  const [pokeSearch, setPokeSearch] = useState("");
  const [genSelected, setGenSelected] = useState();
  const [modalShow, setModalShow] = useState(false);

  const _handleInput = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const _handleGenSelect = (e) => {
    if (e.target.value === "-") {
      setGenSelected(undefined);
    }
    setGenSelected(JSON.parse(e.target.value));
  };

  const _handlePokeSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${query}`
      );
      setPokeSearch(data);
      setModalShow(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Navbar expand="lg">
        <Container className="justify-content-center d-flex">
          <Nav className="mr-5">
            <Navbar.Text
              className="align-text-top"
              style={{ fontSize: "3rem" }}
            >
              POKEDEX
            </Navbar.Text>
          </Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-start flex-grow-1 pe-3 ">
              <Form className="d-flex" onSubmit={_handlePokeSearch}>
                <FormControl
                  type="search"
                  placeholder="Pokemon Name or Number"
                  className="me-2 mx-5"
                  style={{ width: "15rem" }}
                  aria-label="Search"
                  onChange={_handleInput}
                />
                <Button type="submit" variant="outline-secondary">
                  Search
                </Button>
              </Form>
              <Nav className="mx-5">
                <Navbar.Text>Select Generation:</Navbar.Text>
                <Form.Select
                  aria-label="Default select example"
                  style={{ width: "10rem" }}
                  name="Gen"
                  onChange={_handleGenSelect}
                >
                  <option value={undefined}>-</option>
                  {pokemonGenerationIndexes.map((item, i) => (
                    <option
                      key={`${item.label}-i`}
                      value={JSON.stringify(item)}
                    >
                      {item.label}
                    </option>
                  ))}
                </Form.Select>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {!genSelected ? (
        <Container style={{ height: "100%" }} className="mt-5">
          <Row className="mt-2 mb-5">
            <Col
              sm={5}
              className="d-flex mt-5 justify-content-center justify-content-sm-end"
            >
              <div>
                <h1 className="text-center text-sm-end">Start</h1>
                <h1>Researchin'!</h1>
              </div>
            </Col>
            <Col sm={7}>
              <img
                src="./images/pikachu.webp"
                alt="Prof Pika"
                width={500}
                className="img-fluid mr-5"
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <PokedexGenerationList genSelected={genSelected} />
      )}
      <PokemonDetailsModal
        isModalVisible={modalShow}
        onClose={() => setModalShow(false)}
        pokeData={pokeSearch}
      />
    </Container>
  );
};

export default Pokedex;
