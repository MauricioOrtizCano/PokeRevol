const { Router } = require("express");

const router = Router();

const pokemonMiddle = require("./pokemon/pokemonMiddle.js");
const typeMiddle = require("./type/typeMiddle.js");
const abilityMiddle = require("./ability/abilityMiddle.js");
const moveMiddle = require("./move/moveMiddle.js");
const chargedb = require("./chargedb/chargedb.js");

//router.use(express.json());

router.use("/pokemons", pokemonMiddle);
router.use("/types", typeMiddle);
router.use("/abilities", abilityMiddle);
router.use("/moves", moveMiddle);
router.use("/chargedb", chargedb);

module.exports = router;
