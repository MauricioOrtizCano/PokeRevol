const axios = require("axios");
const { Router } = require("express");
const { Move } = require("../../db.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allAbilities = await Move.findAll();

    if (!allAbilities) throw Error("Moves was not found");

    res.status(200).send(allAbilities);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const { name } = req.params;

    const findMove = await Move.findOne({
      where: { name },
    });

    if (!findMove) throw Error(`Move ${name} was not found`);
    res.status(200).send(findMove);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
