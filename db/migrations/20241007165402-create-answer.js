"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("answer_tbl", {
      answer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      examinee_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "examinee_tbl",
          key: "examinee_id",
        },
      },
      exam_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "exam_tbl",
          key: "exam_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      question_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "question_tbl",
          key: "question_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      choices_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "choices_tbl",
          key: "choices_id",
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
    await queryInterface.dropTable("answer_tbl");
  },
};
