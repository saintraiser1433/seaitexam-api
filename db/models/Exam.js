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
      Exam.belongsToMany(models.Answer, { through: "answer_tbl" });
      Exam.hasMany(models.Question, {
        foreignKey: {
          name: "exam_id",
          allowNull: false,
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time_limit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      question_limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: DataTypes.BOOLEAN,
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
