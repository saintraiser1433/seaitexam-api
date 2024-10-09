"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exam.hasMany(models.Answer, {
        foreignKey: {
          name: "exam_id",
          allowNull: false,
        },
      });
      Exam.hasMany(models.Question, {
        foreignKey: {
          name: "exam_id",
          allowNull: false,
        },
      });
    }
  }
  Exam.init(
    {
      exam_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      exam_title: {
        type: DataTypes.STRING,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      time_limit: {
        type: DataTypes.INTEGER,
      },
      question_limit: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Exam",
      freezeTableName: true,
      tableName: "exam_tbl",
      paranoid: true,
    }
  );
  return Exam;
};
