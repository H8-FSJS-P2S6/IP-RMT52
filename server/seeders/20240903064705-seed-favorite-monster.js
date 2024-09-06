"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/user_monster_favorites.json").map((e) => {
      e.createdAt = e.updatedAt = new Date();
      return e;
    });
    await queryInterface.bulkInsert("UserFavorites", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserFavorites", null, {});
  },
};
