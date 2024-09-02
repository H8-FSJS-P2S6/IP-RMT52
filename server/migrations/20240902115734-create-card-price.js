"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CardPrices", {
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
      cardmarket_price: {
        type: Sequelize.FLOAT,
      },
      tcgplayer_price: {
        type: Sequelize.FLOAT,
      },
      ebay_price: {
        type: Sequelize.FLOAT,
      },
      amazon_price: {
        type: Sequelize.FLOAT,
      },
      coolstuffinc_price: {
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
    await queryInterface.dropTable("CardPrices");
  },
};
