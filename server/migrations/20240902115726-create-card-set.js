"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CardSets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cardId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Cards",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      set_name: {
        type: Sequelize.STRING,
      },
      set_code: {
        type: Sequelize.STRING,
      },
      set_rarity: {
        type: Sequelize.STRING,
      },
      set_rarity_code: {
        type: Sequelize.STRING,
      },
      set_price: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("CardSets");
  },
};
