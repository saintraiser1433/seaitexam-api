const { answerValidation } = require("../util/validation");
const model = require("../db/models");

const answerUseCase = {
  insert: async (data) => {
    const { error, value } = answerValidation.validate(data);

    if (error) {
      throw new Error(error.details[0].message);
    }
    const checkExaminee = await model.Examinee.findByPk(
      parseInt(value.examinee_id)
    );
    if (!checkExaminee) {
      throw new Error("Examinee is not found");
    }
    const checkExam = await model.Exam.findByPk(parseInt(value.exam_id));
    if (!checkExam) {
      throw new Error("Exam is not found");
    }
    const checkQuestion = await model.Question.findByPk(
      parseInt(value.question_id)
    );
    if (!checkQuestion) {
      throw new Error("Question is not found");
    }
    const checkChoices = await model.Choices.findByPk(
      parseInt(value.choices_id)
    );
    if (!checkChoices) {
      throw new Error("Choices is not found");
    }

    const checkAnswerIfExist = await model.Answer.findOne({
      where: {
        exam_id: value.exam_id,
        question_id: value.question_id,
        choices_id: value.choices_id,
      },
    });
    if (checkAnswerIfExist) {
      throw new Error("You already answer this question");
    }

    const checkAttemptIfExist = await model.ExamAttempt.findOne({
      where: {
        examinee_id: value.examinee_id,
        exam_id: value.exam_id,
      },
    });

    if (checkAttemptIfExist) {
      throw new Error("Opps you have already attempt to answer this exam");
    }

    return value;
  },
};

module.exports = answerUseCase;

// insert: async (data) => {
//   const { error, value } = answerValidation.validate(data);
//   if (error) throw new Error(error.details[0].message);

//   const { examinee_id, exam_id, question_id, choices_id } = value;

//   // Combine queries in parallel using Promise.all
//   const [checkExaminee, checkExam, checkQuestion, checkChoices] = await Promise.all([
//     model.Examinee.findByPk(examinee_id),
//     model.Exam.findByPk(exam_id),
//     model.Question.findByPk(question_id),
//     model.Choices.findByPk(choices_id)
//   ]);

//   if (!checkExaminee) throw new Error("Examinee not found");
//   if (!checkExam) throw new Error("Exam not found");
//   if (!checkQuestion) throw new Error("Question not found");
//   if (!checkChoices) throw new Error("Choices not found");

//   // Check if answer already exists
//   const checkAnswerIfExist = await model.Answer.findOne({
//     where: { exam_id, question_id, choices_id }
//   });
//   if (checkAnswerIfExist) throw new Error("You have already answered this question.");

//   // Check for existing exam attempt
//   const checkAttemptIfExist = await model.ExamAttempt.findOne({
//     where: { examinee_id, exam_id }
//   });
//   if (checkAttemptIfExist) throw new Error("You have already attempted this exam.");

//   return value;
// },
