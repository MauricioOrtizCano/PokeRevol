const axios = require("axios");
const { Router } = require("express");
const { Ability } = require("../../db.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allAbilities = await Ability.findAll();

    if (!allAbilities) throw Error("Abilities was not found");
    res.status(200).send(allAbilities);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const { name } = req.params;

    const findAbility = await Ability.findOne({
      where: {
        name,
      },
    });

    if (!findAbility) throw Error(`Ability ${name} was not found`);

    res.status(200).send(findAbility);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
