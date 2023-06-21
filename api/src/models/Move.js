const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Move",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      pp: {
        type: DataTypes.INTEGER,
      },
      power: {
        type: DataTypes.INTEGER,
      },
      accuracy: {
        type: DataTypes.INTEGER,
      },
      damage_class: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
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
