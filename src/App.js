import "./App.css";
import { useState } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChoosen, setPokemonChoosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const serachPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => {
        setPokemon({
          name: pokemonName,
          species: res.data.species.name,
          img: res.data.sprites.front_default,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          type: res.data.types[0].type.name,
        });
        setPokemonChoosen(true);
        console.log(res);
      });
  };

  return (
    <div className="App">
      <div className="title">
        <h1>Pokemon API</h1>
        <input
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
        />
        <button onClick={serachPokemon}>serch pokemon</button>
      </div>
      <div className="display">
        {!pokemonChoosen ? (
          <h1>Pleace choose a Pokemon</h1>
        ) : (
          <>
            <div className="card">
              <img className="card-img-top" src={pokemon.img} alt="loading" />
              <div className="card-body">
                <h1 className="card-title">{pokemon.name}</h1>
                <h3>species:{pokemon.species}</h3>
                <h3>Type:{pokemon.type}</h3>
                <h4>Hp:{pokemon.hp}</h4>
                <h4>attack:{pokemon.attack}</h4>
                <h4>defense:{pokemon.defense}</h4>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
