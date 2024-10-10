"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Examinee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Examinee.hasMany(models.Answer, {
        foreignKey: {
          name: "examinee_id",
          allowNull: false,
        },
      });
      Examinee.hasOne(models.ExamAttempt, {
        foreignKey: {
          name: "examinee_id",
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
    }
  }
  Examinee.init(
    {
      examinee_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      middle_name: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Examinee",
      tableName: "examinee_tbl",
      freezeTableName: true,
      paranoid: true,
    }
  );
  return Examinee;
};
