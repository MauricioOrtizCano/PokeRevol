const axios = require("axios");
const { Router } = require("express");
const { Type } = require("../../db.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allTypes = await Type.findAll();
    if (!allTypes) throw Error("Types was not found");

    res.status(200).send(allTypes);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const { name } = req.params;

    const findType = await Type.findOne({
      where: { name },
    });

    if (!findType) throw Error(`Type ${name} was not found`);

    res.status(200).send(findType);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
