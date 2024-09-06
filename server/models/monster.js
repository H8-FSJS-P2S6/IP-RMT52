"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Monster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Monster.belongsToMany(models.User, {
        through: models.UserFavorite,
        foreignKey: "monsterId",
        otherKey: "userId",
        // as: "dataMonster",
      });
    }
  }
  Monster.init(
    {
      // id: DataTypes.INTEGER,
      type: DataTypes.STRING,
      species: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Monster",
    }
  );
  return Monster;
};
