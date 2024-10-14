"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.hasMany(models.Answer, {
        foreignKey: {
          name: "question_id",
          allowNull: false,
        },
      });
      Question.belongsTo(models.Exam, {
        foreignKey: {
          name: "exam_id",
          allowNull: false,
        },
      });
      Question.hasMany(models.Choices, {
        as: "choices",
        foreignKey: {
          name: "question_id",
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
    }
  }
  Question.init(
    {
      question_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      exam_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "exam_tbl",
          key: "exam_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Question",
      tableName: "question_tbl",
    }
  );
  return Question;
};
