"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Monsters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // id: {
      //   type: Sequelize.INTEGER,
      // },
      type: {
        type: Sequelize.STRING(500),
      },
      species: {
        type: Sequelize.STRING(500),
      },
      name: {
        type: Sequelize.STRING(500),
      },
      description: {
        type: Sequelize.STRING(500),
      },
      imgUrl: {
        type: Sequelize.STRING(500),
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
    await queryInterface.dropTable("Monsters");
  },
};
