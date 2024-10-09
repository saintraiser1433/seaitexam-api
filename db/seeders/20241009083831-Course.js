const { faker } = require("@faker-js/faker");
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        description: faker.lorem.paragraph(1),
        score: faker.number.int(100),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Insert the data into the Users table
    await queryInterface.bulkInsert("course_tbl", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("course_tbl", null, {});
  },
};
