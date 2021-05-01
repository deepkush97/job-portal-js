"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate({ Job, User }) {
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
      this.belongsTo(Job, { foreignKey: "jobId", as: "job" });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        jobId: undefined,
        userId: undefined,
      };
    }
  }
  UserRole.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        validate: {
          notNull: { msg: "UserRole must have a userId" },
          notEmpty: { msg: "UserId must not be empty" },
        },
      },
      jobId: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        validate: {
          notNull: { msg: "UserRole must have a jobId" },
          notEmpty: { msg: "JobId must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "user_roles",
      modelName: "UserRole",
    }
  );
  return UserRole;
};
