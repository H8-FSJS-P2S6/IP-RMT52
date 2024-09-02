"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CardSet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CardSet.belongsTo(models.Card);
    }
  }
  CardSet.init(
    {
      cardId: DataTypes.INTEGER,
      set_name: DataTypes.STRING,
      set_code: DataTypes.STRING,
      set_rarity: DataTypes.STRING,
      set_rarity_code: DataTypes.STRING,
      set_price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "CardSet",
    }
  );
  return CardSet;
};
