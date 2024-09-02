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
      Card.hasMany(models.CardSet);
      Card.hasOne(models.CardPrice);
      Card.hasMany(models.Favorite);
    }
  }
  Card.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name tidak boleh kosong",
          },
          notNull: {
            msg: "Name tidak boleh kosong",
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Type tidak boleh kosong",
          },
          notNull: {
            msg: "Type tidak boleh kosong",
          },
        },
      },
      frameType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "FrameType tidak boleh kosong",
          },
          notNull: {
            msg: "FrameType tidak boleh kosong",
          },
        },
      },
      desc: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description tidak boleh kosong",
          },
          notNull: {
            msg: "Description tidak boleh kosong",
          },
        },
      },
      atk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Attack tidak boleh kosong",
          },
          notNull: {
            msg: "Attack tidak boleh kosong",
          },
        },
      },
      def: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Defense tidak boleh kosong",
          },
          notNull: {
            msg: "Defense tidak boleh kosong",
          },
        },
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Level tidak boleh kosong",
          },
          notNull: {
            msg: "Level tidak boleh kosong",
          },
        },
      },
      race: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Race tidak boleh kosong",
          },
          notNull: {
            msg: "Race tidak boleh kosong",
          },
        },
      },
      attribute: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Attribute tidak boleh kosong",
          },
          notNull: {
            msg: "Attribute tidak boleh kosong",
          },
        },
      },
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Card",
    }
  );
  return Card;
};
