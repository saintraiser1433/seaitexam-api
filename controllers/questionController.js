const { sequelize, Question, Choices, Exam } = require("../db/models");
const questionUseCase = require("../use-cases/question-use-case");
const choiceUseCase = require("../use-cases/choice-use-case");
const getAllQuestions = async (req, res) => {
  try {
    const result = await Question.findAll({
      include: [
        {
          model: Exam,
          attributes: ["exam_title"],
        },
      ],
    });
    if (result.length === 0) {
      return res.status(404).json({ message: "No questions found" });
    }
    res.status(200).json({ data: result });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const getAllQuestionById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Question.findByPk(id, {
      include: [
        {
          model: Exam,
          attributes: ["exam_title"],
        },
      ],
    });
    if (!result) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ data: result });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const insertQuestionChoices = async (req, res) => {
  try {
    await sequelize.transaction(async (t) => {
      const { question, exam_id, choices } = req.body;
      const questBody = {
        question: question,
        exam_id: exam_id,
      };

      const questData = await questionUseCase.insert(questBody);

      const questionRecord = await Question.create(questData, {
        transaction: t,
      });
      const choiceData = choices.map((choice) => ({
        description: choice.description,
        question_id: questionRecord.question_id,
        status: choice.status,
      }));

      const validatedChoices = await choiceUseCase.insert(choiceData);

      const choiceRecord = await Choices.bulkCreate(validatedChoices, {
        transaction: t,
      });
      return res.status(201).json({
        status: "Success",
        message: "Succesfully inserted",
        data: {
          question: questionRecord,
          choices: choiceRecord,
        },
      });
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const updateQuestion = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await questionUseCase.update(req.body, id);
    await Question.update(data, {
      where: {
        question_id: id,
      },
    });
    res.status(200).json({ message: "Question updated successfully" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const deleteQuestion = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteRowCount = await Question.destroy({
      where: {
        question_id: id,
      },
    });
    if (deleteRowCount === 0) {
      return res
        .status(404)
        .json({ message: "Question not found, no deletion has been made" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllQuestions,
  getAllQuestionById,
  insertQuestionChoices,
  updateQuestion,
  deleteQuestion,
};
