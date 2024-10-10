const model = require("../db/models");
const choiceUseCase = require("../use-cases/choice-use-case");
const getAllChoices = async (req, res) => {
  try {
    const result = await model.Choices.findAll({
      includes: [
        {
          model: model.Question,
        },
      ],
    });
    if (result.length === 0) {
      return res.status(404).json({
        error: "No Choices found",
      });
    }
    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getAllChoicesById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await model.Choices.findByPk(id);
    if (!result) {
      return res.status(404).json({
        error: "Choice not found",
      });
    }
    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      error: error.message,
    });
  }
};

const getChoicesByQuestionId = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await model.Question.findByPk(id, {
      include: [
        {
          model: model.Choices,
          attributes: ["choices_id", "description", "status"],
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

const insertChoices = async (req, res) => {
  try {
    const data = await choiceUseCase.insert(req.body);
    const result = await model.Choices.create(data);
    return res.status(201).json({
      status: "Success",
      message: "Insert choices successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateChoice = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await choiceUseCase.update(req.body, id);
    await model.Choices.update(data, {
      where: {
        choices_id: id,
      },
    });
    return res.status(201).json({
      status: "Success",
      message: "Update choices successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteChoice = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteRowCount = await model.Choices.destroy({
      where: {
        choices_id: id,
      },
    });
    if (deleteRowCount === 0) {
      return res
        .status(404)
        .json({ error: "Choice not found, no deletion has been made" });
    }
    return res.status(200).json({ message: "Choice deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllChoices,
  getAllChoicesById,
  insertChoices,
  updateChoice,
  deleteChoice,
  getChoicesByQuestionId,
};
