"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CardPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CardPrice.hasOne(models.Card);
    }
  }
  CardPrice.init(
    {
      cardId: DataTypes.INTEGER,
      cardmarket_price: DataTypes.FLOAT,
      tcgplayer_price: DataTypes.FLOAT,
      ebay_price: DataTypes.FLOAT,
      amazon_price: DataTypes.FLOAT,
      coolstuffinc_price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "CardPrice",
    }
  );
  return CardPrice;
};
