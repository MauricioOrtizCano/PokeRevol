const axios = require("axios");
const { Router } = require("express");
const { getPokemonsFromAPI, findPokeIntoDB } = require("./controller.js");
const { Pokemon, Type, Move, Ability } = require("../../db.js");
const { Op } = require("sequelize");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    const allPokemonsFromDB = await Pokemon.findAll({
      include: [
        {
          model: Ability,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Move,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Type,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    const allPokemonsFromAPI = await getPokemonsFromAPI();

    if (!name) {
      let add = [...allPokemonsFromAPI, ...allPokemonsFromDB];

      res.status(200).send(add);
    } else {
      const filterInAPI = allPokemonsFromAPI.filter((poke) =>
        poke.name.toLowerCase().includes(name.toLocaleLowerCase())
      );

      const filterInDB = allPokemonsFromDB.filter((poke) =>
        poke.name.toLowerCase().includes(name.toLowerCase())
      );

      const addFilters = [...filterInAPI, ...filterInDB];

      addFilters.length === 0
        ? res.status(404).send(`Id ${id} was not found`)
        : res.status(200).send(addFilters);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const allPokemonsAPI = await getPokemonsFromAPI();

    const allPokemonsDB = await Pokemon.findAll({
      include: [
        {
          model: Ability,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Move,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Type,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    const filterInAPI = allPokemonsAPI.filter((poke) =>
      poke.id.toString().includes(id.toString())
    );
    const filterInDB = allPokemonsDB.filter((poke) =>
      poke.id.toString().includes(id.toString())
    );

    const addFilters = [...filterInAPI, ...filterInDB];

    addFilters.length === 0
      ? res.status(404).send(`Id ${id} was not found`)
      : res.status(200).send(addFilters);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

let id = 1500;
router.post("/", async (req, res) => {
  try {
    const {
      name,
      big_image,
      small_image,
      weight,
      height,
      stats,
      abilities,
      moves,
      types,
    } = req.body;
    id = id + 1;

    const findPoke = await Pokemon.findOne({
      where: {
        name: {
          [Op.substring]: name,
        },
      },
    });

    if (!name || !big_image || !weight || !height)
      return res.status(400).send("Should type all data");
    else if (!findPoke) {
      const newPokemon = await Pokemon.create({
        id,
        name,
        big_image,
        small_image,
        weight,
        height,
        stats,
      });

      newPokemon.addAbilities(abilities);
      newPokemon.addMoves(moves);
      newPokemon.addTypes(types);
      res.status(200).send("The Pokemon has been created with successfully");
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
