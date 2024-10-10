const model = require("../db/models");
const answerUseCase = require("../use-cases/answer-use-case");

const insertAnswer = async (req, res) => {
  try {
    const data = await answerUseCase.insert(req.body);
    await model.Answer.create(data);
    return res.status(201).json({
      status: "Success",
      message: "Successfully insert answer",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  insertAnswer,
};
