"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserFavorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserFavorite.belongsTo(models.User, { foreignKey: "userId" });
      UserFavorite.belongsTo(models.Monster, { foreignKey: "monsterId" });
    }
  }
  UserFavorite.init(
    {
      userId: DataTypes.INTEGER,
      monsterId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserFavorite",
    }
  );
  return UserFavorite;
};
