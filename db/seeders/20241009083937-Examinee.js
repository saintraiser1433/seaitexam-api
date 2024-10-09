const { faker } = require("@faker-js/faker");
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.firstName(),
        username: faker.internet.userName(),
        password: faker.person.firstName(),
        createdAt: new Date(),
        updatedAt: new Date(),

        // Consider hashing in real-world apps
      });
    }

    // Insert the data into the Users table
    await queryInterface.bulkInsert("examinee_tbl", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("examinee_tbl", null, {});
  },
};
