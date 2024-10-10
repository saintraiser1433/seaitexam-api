const { choicesValidation } = require("../util/validation");
const model = require("../db/models");

const choiceUseCase = {
  insert: async (data) => {
    const { error, value } = choicesValidation.choiceValidate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const hasQuestion = await model.Question.findByPk(
      parseInt(value.question_id)
    );
    if (!hasQuestion) {
      throw new Error("Question not found");
    }
    return value;
  },

  update: async (data, id) => {
    const { error, value } = choicesValidation.choiceValidate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const choice = await model.Choices.findByPk(id);
    if (!choice) {
      throw new Error("Choice not found");
    }
    const question = await model.Question.findByPk(parseInt(value.question_id));
    if (!question) {
      throw new Error("Question not found");
    }
    return value;
  },
};

module.exports = choiceUseCase;
