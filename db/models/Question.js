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
      Question.belongsToMany(models.Answer, { through: "answer_tbl" });
      Question.belongsTo(models.Exam);
      Question.hasMany(models.Choices, {
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
