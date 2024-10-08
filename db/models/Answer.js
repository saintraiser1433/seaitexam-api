"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Answer.belongsTo(models.Examinee, {
        foreignKey: {
          name: "examinee_id",
          allowNull: false,
        },
      });
      Answer.belongsTo(models.Choices, {
        foreignKey: {
          name: "choices_id",
          allowNull: false,
        },
      });
      Answer.belongsTo(models.Exam, {
        foreignKey: {
          name: "exam_id",
          allowNull: false,
        },
      });
      Answer.belongsTo(models.Question, {
        foreignKey: {
          name: "question_id",
          allowNull: false,
        },
      });
    }
  }
  Answer.init(
    {
      answer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Answer",
      tableName: "answer_tbl",
    }
  );
  return Answer;
};
