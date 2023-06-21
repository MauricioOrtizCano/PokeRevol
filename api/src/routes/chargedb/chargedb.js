const axios = require("axios");
const { Router } = require("express");
const {
  getAbilitiesFromAPI,
  getMovesFromAPI,
  getTypesFromAPI,
} = require("./controller");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const chargeAbilities = await getAbilitiesFromAPI();
    if (!chargeAbilities)
      throw Error("An error has ocurred charging Abilitiies");
    const chargeTypes = await getTypesFromAPI();
    if (!chargeTypes) throw Error("An error has ocurred charging Types");
    const chargeMoves = await getMovesFromAPI();
    if (!chargeMoves) throw Error("An error has ocurred charging Moves");

    res.status(200).send("Data Base has been charged");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
