"use strict";
const bcryptjs = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Recruiter",
          email: "recruiter@example.com",
          password: bcryptjs.hashSync("123456", 10),
          role: "recruiter",
          uuid: "35cf1b89-56d3-433c-9f43-4198eb3725de",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        {
          name: "User",
          email: "user@example.com",
          password: bcryptjs.hashSync("123456", 10),
          role: "user",
          uuid: "35cf1b89-56d3-433c-9f43-4198eb3725df",
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
