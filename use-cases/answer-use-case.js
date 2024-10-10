const { answerValidation } = require("../util/validation");
const model = require("../db/models");

const answerUseCase = {
  insert: async (data) => {
    const { error, value } = answerValidation.validate(data);
    const { examinee_id, exam_id, question_id, choices_id } = value;
    if (error) throw new Error(error.details[0].message);

    const [checkExaminee, checkExam, checkQuestion, checkChoices] =
      await Promise.all([
        model.Examinee.findByPk(examinee_id),
        model.Exam.findByPk(exam_id),
        model.Question.findByPk(question_id),
        model.Choices.findByPk(choices_id),
      ]);

    if (!checkExaminee) throw new Error("Examinee not found");
    if (!checkExam) throw new Error("Exam not found");
    if (!checkQuestion) throw new Error("Question not found");
    if (!checkChoices) throw new Error("Choices not found");

    const checkAnswerIfExist = await model.Answer.findOne({
      where: { examinee_id, exam_id, question_id, choices_id },
    });
    if (checkAnswerIfExist) throw new Error("You already answer this question");

    const checkAttemptIfExist = await model.ExamAttempt.findOne({
      where: {
        examinee_id,
        exam_id,
      },
    });

    if (checkAttemptIfExist)
      throw new Error("You have already attempted this exam.");

    return value;
  },
};

module.exports = answerUseCase;
