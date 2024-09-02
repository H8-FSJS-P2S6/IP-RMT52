"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favorite, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Username tidak boleh kosong",
          },
          notNull: {
            msg: "Username tidak boleh kosong",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "email",
          msg: "Email harus unik",
        },
        validate: {
          notEmpty: {
            msg: "Email tidak boleh kosong",
          },
          notNull: {
            msg: "Email tidak boleh kosong",
          },
          isEmail: {
            msg: "Harus dalam format email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password tidak boleh kosong",
          },
          notNull: {
            msg: "Password tidak boleh kosong",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(async (instance, option) => {
    instance.password = hashPassword(instance.password);
  });
  return User;
};
