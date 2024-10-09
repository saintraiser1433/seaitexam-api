const model = require("../db/models");
const questionUseCase = require("../use-cases/question-use-case");
const getAllQuestions = async (req, res) => {
  try {
    const result = await model.Question.findAll({
      include: [
        {
          model: model.Exam,
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
    const result = await model.Question.findByPk(id, {
      include: [
        {
          model: model.Exam,
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

const insertQuestion = async (req, res) => {
  try {
    const data = await questionUseCase.insert(req.body);
    const result = await model.Question.create(data);
    res.status(201).json({ data: result });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const data = await questionUseCase.update(req.body);
    const [updatedRowsCount] = await model.Question.update(data, {
      where: {
        question_id: req.params.id,
      },
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({
        message: "Question not found or no changes made",
      });
    }
    res.status(200).json({ message: "Question updated successfully" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const deleteQuestion = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteRowCount = await model.Question.destroy({
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
  insertQuestion,
  updateQuestion,
  deleteQuestion,
};
