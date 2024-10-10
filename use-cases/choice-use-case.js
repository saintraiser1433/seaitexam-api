const { choicesValidation } = require("../util/validation");
const model = require("../db/models");

const choiceUseCase = {
  insert: async (data) => {
    const { error, value } = choicesValidation.choiceValidate(data);
    const { question_id } = value;
    if (error) throw new Error(error.details[0].message);
    const hasQuestion = await model.Question.findByPk(parseInt(question_id));
    if (!hasQuestion) throw new Error("Question not found");
    return value;
  },

  update: async (data, id) => {
    const { error, value } = choicesValidation.choiceValidate(data);
    const { question_id } = value;
    if (error) throw new Error(error.details[0].message);

    const [validateChoices, validateQuestion] = await Promise.all([
      model.Choices.findByPk(id),
      model.Question.findByPk(parseInt(question_id)),
    ]);
    if (!validateChoices) throw new Error("Choice not found");
    if (!validateQuestion) throw new Error("Question not found");

    return value;
  },
};

module.exports = choiceUseCase;
