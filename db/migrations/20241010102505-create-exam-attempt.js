"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("exam_attempt", {
      attempt_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      examinee_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "examinee_tbl",
          key: "examinee_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      exam_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "exam_tbl",
          key: "exam_id",
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
    await queryInterface.dropTable("exam_attempt");
  },
};
