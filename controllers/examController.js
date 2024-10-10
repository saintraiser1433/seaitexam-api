const model = require("../db/models");
const { examValidation } = require("../util/validation");
const getExamAll = async (req, res) => {
  try {
    const result = await model.Exam.findAll({
      order: [["exam_id", "asc"]],
    });
    if (result.length === 0) {
      return res.status(404).json({
        message: "No exam found",
      });
    }
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getExamAllById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await model.Exam.findByPk(id);
    if (!result) {
      return res.status(404).json({
        message: "No exam found",
      });
    }
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const insertExam = async (req, res) => {
  try {
    const { error, value } = examValidation.insert(req.body);
    if (error) {
      return res.status(404).json({
        message: error.details[0].message,
      });
    }

    const [data, created] = await model.Exam.findOrCreate({
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
        data: data,
      });
    }
    res.status(409).json({
      message: "Exam Title already exists",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateExam = async (req, res) => {
  const id = req.params.id;
  try {
    const { error, value } = examValidation.update(req.body);
    if (error) {
      return res.status(404).json({
        message: error.details[0].message,
      });
    }
    const [updatedRowsCount] = await model.Exam.update(value, {
      where: { exam_id: id },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({
        message: "Exam not found no changes made",
      });
    }
    return res.status(200).json({
      message: "Exam updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
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
        message: "Exam is not found no deletion has been made",
      });
    }
    return res.status(200).json({
      message: "Exam deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
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
