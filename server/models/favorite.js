"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Favorite.init(
    {
      userId: DataTypes.INTEGER,
      cardId: DataTypes.INTEGER,
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Stock is required",
          },
          notNull: {
            msg: "Stock is required",
          },
          min: {
            args: [0],
            msg: "Stock cannot be negative",
          },
        },
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Favorite",
    }
  );
  return Favorite;
};
