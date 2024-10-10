"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExamAttempt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ExamAttempt.belongsTo(models.Examinee, {
        foreignKey: {
          name: "examinee_id",
          allowNull: false,
        },
      });

      ExamAttempt.belongsTo(models.Exam, {
        foreignKey: {
          name: "exam_id",
          allowNull: false,
        },
      });
    }
  }
  ExamAttempt.init(
    {
      attempt_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "ExamAttempt",
      tableName: "exam_attempt",
      freezeTableName: true,
    }
  );
  return ExamAttempt;
};
