const { faker } = require("@faker-js/faker");
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const exam = [];
    for (let i = 0; i < 10; i++) {
      exam.push({
        exam_title: faker.word.noun() + " " + faker.word.adjective() + " Exam",
        description: faker.lorem.paragraph(1),
        time_limit: faker.number.int(100),
        question_limit: faker.number.int(100),
        status: faker.datatype.boolean(0.9),
        createdAt: new Date(),
        updatedAt: new Date(),

        // Consider hashing in real-world apps
      });
    }

    // Insert the data into the Users table
    await queryInterface.bulkInsert("exam_tbl", exam, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("exam_tbl", null, {});
  },
};
