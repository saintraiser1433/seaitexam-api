"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("assign_deans_tbl", {
      deans_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "deans_tbl",
          key: "deans_id",
        },
      },
      course_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "course_tbl",
          key: "course_id",
        },
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
    await queryInterface.dropTable("assign_deans_tbl");
  },
};
