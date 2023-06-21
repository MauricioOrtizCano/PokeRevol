const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Type",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
      },
      other: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
      double_damage_from: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      double_damage_to: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      half_damage_from: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      half_damage_to: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      no_damage_from: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      no_damage_to: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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
