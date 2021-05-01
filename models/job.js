"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "createdBy", as: "user" });
    }
    toJSON() {
      return { ...this.get(), id: undefined, createdBy: undefined };
    }
  }
  Job.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Job must have a title" },
          notEmpty: { msg: "Title must not be empty" },
        },
      },
      description: {
        type: DataTypes.STRING(8000),
        allowNull: false,
        validate: {
          notNull: { msg: "Job must have a description" },
          notEmpty: { msg: "Description must not be empty" },
        },
      },
      createdBy: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        validate: {
          notNull: { msg: "Job must have a createdBy" },
          notEmpty: { msg: "CreatedBy must not be empty" },
        },
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      tableName: "jobs",
      modelName: "Job",
    }
  );
  return Job;
};
