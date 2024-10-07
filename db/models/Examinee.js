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
      Examinee.belongsToMany(models.Answer, { through: "answer_tbl" });
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
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middle_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
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
