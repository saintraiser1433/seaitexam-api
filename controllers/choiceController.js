const model = require("../db/models");

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
        message: "No Choices found",
      });
    }
    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllChoicesById = async () => {};

module.exports = {
  getAllChoices,
  getAllChoicesById,
};
