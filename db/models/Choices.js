"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Choices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Choices.belongsToMany(models.Answer, { through: "answer_tbl" });

      Choices.belongsTo(models.Question, {
        foreignKey: {
          name: "question_id",
          allowNull: false,
        },
      });
    }
  }
  Choices.init(
    {
      choices_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Choices",
      tableName: "choices_tbl",
    }
  );
  return Choices;
};
