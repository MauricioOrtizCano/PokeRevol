const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Ability",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
      },
      desciption: {
        type: DataTypes.TEXT,
      },
      pokemons: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      timestamps: false,
    }
  );
};
