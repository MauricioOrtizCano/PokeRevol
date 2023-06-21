const { Pokemon } = require("../../db.js");
const axios = require("axios");
const { Op } = require("sequelize");

const getPokemonsFromAPI = async () => {
  const api = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
  );
  const pokemonArray = api.data.results;

  const resultArray = await Promise.all(
    pokemonArray.map(async (pokemon) => {
      const pokeObj = await axios.get(pokemon.url);
      return {
        id: pokeObj.data.id,
        name: pokeObj.data.name,
        big_image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeObj.data.id}.png`,
        small_image: pokeObj.data.sprites.front_default,
        weight: pokeObj.data.weight / 10,
        height: pokeObj.data.height / 10,
        stats: pokeObj.data.stats.map((s) => {
          return {
            name: s.stat.name,
            base_stat: s.base_stat,
          };
        }),
        Abilities: pokeObj.data.abilities.map((a) => a.ability.name),
        Moves: pokeObj.data.moves.map((m) => m.move.name),
        Types: pokeObj.data.types.map((t) => t.type.name),
      };
    })
  );

  return resultArray;
};

const findPokeIntoDB = async (name) => {
  const findPoke = await Pokemon.findAll({
    where: {
      name: {
        [Op.substring]: name,
      },
    },
  });

  if (findPoke.length === 0) return undefined;
  else return findPoke;
};

module.exports = {
  getPokemonsFromAPI,
  findPokeIntoDB,
};
