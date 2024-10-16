"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AssignDeansCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AssignDeansCourse.belongsTo(models.Deans, {
        foreignKey: "deans_id",
        allowNull: false,
      });

      AssignDeansCourse.belongsTo(models.Course, {
        as: "course",
        foreignKey: "course_id",
        allowNull: false,
      });
    }
  }
  AssignDeansCourse.init(
    {},
    {
      sequelize,
      modelName: "AssignDeansCourse",
      tableName: "assign_deans_tbl",
      freezeTableName: true,
    }
  );
  return AssignDeansCourse;
};
