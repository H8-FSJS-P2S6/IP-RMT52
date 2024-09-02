"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Card.hasMany(models.CardSet, { foreignKey: "cardId" });
      // Card.belongsTo(models.CardPrice, { foreignKey: "cardId" });
      Card.hasMany(models.Favorite, { foreignKey: "cardId" });
    }
  }
  Card.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      frameType: DataTypes.STRING,
      desc: DataTypes.TEXT,
      atk: DataTypes.INTEGER,
      def: DataTypes.INTEGER,
      level: DataTypes.INTEGER,
      race: DataTypes.STRING,
      attribute: DataTypes.STRING,
      image_url: DataTypes.STRING,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Card",
    }
  );
  return Card;
};
