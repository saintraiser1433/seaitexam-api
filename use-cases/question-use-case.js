const { questionValidation } = require("../util/validation");
const model = require("../db/models");

const questionUseCase = {
  insert: async (data) => {
    const { error, value } = questionValidation.checkValidate(data);
    const { exam_id } = value;
    if (error) throw new Error(error.details[0].message);

    const exam = await model.Exam.findByPk(parseInt(exam_id));
    if (!exam) throw new Error("Exam not found");

    return value;
  },

  update: async (data, id) => {
    const { error, value } = questionValidation.checkValidate(data);
    if (error) throw new Error(error.details[0].message);

    const exam = await model.Exam.findByPk(data.exam_id);
    if (!exam) throw new Error("Exam not found");

    const question = await model.Question.findByPk(id);
    if (!question) throw new Error("Question not found");
    return value;
  },
};

module.exports = questionUseCase;
