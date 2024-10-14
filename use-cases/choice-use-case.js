const { choicesValidation } = require("../util/validation");
const model = require("../db/models");

const choiceUseCase = {
  insert: async (data) => {
    const { error, value } = choicesValidation.insert(data);
    if (error) throw new Error(error.details[0].message);

    return value;
  },

  update: async (data) => {
    const { error, value } = choicesValidation.update(data);
    if (error) throw new Error(error.details[0].message);
    return value;
  },
};

module.exports = choiceUseCase;
