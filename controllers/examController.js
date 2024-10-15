const model = require("../db/models");
const { examValidation } = require("../util/validation");
const getExamAll = async (req, res) => {
  try {
    const result = await model.Exam.findAll({
      attributes: [
        "exam_id",
        "description",
        "exam_title",
        "question_limit",
        // "status",
        "time_limit",
      ],
      order: [["exam_id", "asc"]],
    });

    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getExamAllById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await model.Exam.findByPk(id);
    if (!result) {
      return res.status(404).json({
        error: "No exam found",
      });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const insertExam = async (req, res) => {
  try {
    const { error, value } = examValidation.insert(req.body);
    if (error) {
      return res.status(404).json({
        error: error.details[0].message,
      });
    }

    const [exam, created] = await model.Exam.findOrCreate({
      where: {
        exam_title: value.exam_title,
      },
      defaults: {
        description: value.description,
        time_limit: value.time_limit,
        question_limit: value.question_limit,
      },
    });
    if (created) {
      return res.status(201).json({
        message: "Successfully inserted exam",
        exam,
      });
    }
    res.status(409).json({
      error: "Exam Title already exists",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const updateExam = async (req, res) => {
  const id = req.params.id;
  try {
    const { error, value } = examValidation.update(req.body);
    if (error) {
      return res.status(404).json({
        error: error.details[0].message,
      });
    }
    const [updatedRowsCount] = await model.Exam.update(value, {
      where: { exam_id: id },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({
        error: "Exam not found no changes made",
      });
    }
    return res.status(200).json({
      message: "Exam updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deleteExam = async (req, res) => {
  const id = req.params.id;
  try {
    const isDelete = await model.Exam.destroy({
      where: {
        exam_id: id,
      },
    });
    if (isDelete === 0) {
      return res.status(404).json({
        error: "Exam is not found no deletion has been made",
      });
    }
    return res.status(200).json({
      message: "Exam deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getExamAll,
  getExamAllById,
  insertExam,
  updateExam,
  deleteExam,
};
