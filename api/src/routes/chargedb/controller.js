const axios = require("axios");
const arrayTypes = require("./typesJSON.js");
const { Type, Ability, Move } = require("../../db.js");

const getAbilitiesFromAPI = async () => {
  const api = await axios.get(
    "https://pokeapi.co/api/v2/ability?limit=100000&offset=0"
  );
  const abilitiesArray = api.data.results;

  const resultArray = await Promise.all(
    abilitiesArray.map(async (ability) => {
      const abilityObj = await axios.get(ability.url);
      return {
        name: abilityObj.data.name,
        desciption:
          abilityObj.data.effect_entries[1] === undefined
            ? "There is no description"
            : abilityObj.data.effect_entries[1].short_effect,
        Pokemons: abilityObj.data.pokemon.map((poke) => poke.pokemon.name),
      };
    })
  );

  Ability.bulkCreate(resultArray);
  return resultArray;
};

const getMovesFromAPI = async () => {
  const api = await axios.get(
    "https://pokeapi.co/api/v2/move?limit=1000000&offset=0"
  );
  const movesArray = api.data.results;

  const resultArray = await Promise.all(
    movesArray.map(async (move, index) => {
      const moveObj = await axios.get(move.url);
      return {
        id: index + 1,
        name: moveObj.data.name,
        desciption:
          moveObj.data.effect_entries[0] === undefined
            ? "There is no description"
            : moveObj.data.effect_entries[0].effect,
        pp: moveObj.data.pp === null ? 0 : moveObj.data.pp,
        power: moveObj.data.power === null ? 0 : moveObj.data.power,
        accuracy: moveObj.data.accuracy === null ? 0 : moveObj.data.accuracy,
        damage_class: moveObj.data.damage_class.name,
        image:
          moveObj.data.damage_class.name === "physical"
            ? "https://res.cloudinary.com/ddwqxqf8d/image/upload/v1683065208/physical_opu00g.png"
            : moveObj.data.damage_class.name === "status"
            ? "https://res.cloudinary.com/ddwqxqf8d/image/upload/v1683065208/status_gcnsbo.png"
            : "https://res.cloudinary.com/ddwqxqf8d/image/upload/v1683065208/special_wkmkfm.png",
        type: moveObj.data.type.name,
        Pokemons: moveObj.data.learned_by_pokemon.map((poke) => poke.name),
      };
    })
  );

  Move.bulkCreate(resultArray);
  return resultArray;
};

const getTypesFromAPI = async () => {
  const api = await axios.get(
    "https://pokeapi.co/api/v2/type?limit=100000&offset=0"
  );
  const typesArray = api.data.results;

  const resultArray = await Promise.all(
    typesArray.map(async (type) => {
      const typeObj = await axios.get(type.url);
      return {
        name: typeObj.data.name,
        other: arrayTypes.filter((type) => type.name === typeObj.data.name),
        double_damage_from:
          typeObj.data.damage_relations.double_damage_from.map(
            (type) => type.name
          ),
        double_damage_to: typeObj.data.damage_relations.double_damage_to.map(
          (type) => type.name
        ),
        half_damage_from: typeObj.data.damage_relations.half_damage_from.map(
          (type) => type.name
        ),
        half_damage_to: typeObj.data.damage_relations.half_damage_to.map(
          (type) => type.name
        ),
        no_damage_from: typeObj.data.damage_relations.no_damage_from.map(
          (type) => type.name
        ),
        no_damage_to: typeObj.data.damage_relations.no_damage_to.map(
          (type) => type.name
        ),
        Pokemons: typeObj.data.pokemon.map((poke) => poke.pokemon.name),
      };
    })
  );

  Type.bulkCreate(resultArray);
  return resultArray;
};

module.exports = {
  getAbilitiesFromAPI,
  getMovesFromAPI,
  getTypesFromAPI,
};
