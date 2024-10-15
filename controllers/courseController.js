const models = require("../db/models");
const { courseValidation } = require("../util/validation");

const getAllCourse = async (req, res) => {
  try {
    const result = await models.Course.findAll({
      attributes: ["course_id", "description", "score"],
    });
    if (result.length === 0) {
      return res.status(404).json({
        error: "No result found",
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getCourseById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await models.Course.findByPk(id);
    if (!result) {
      return res.status(404).json({
        error: "Course not found",
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const insertCourse = async (req, res) => {
  try {
    const { error, value } = courseValidation.insert(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    const [course, created] = await models.Course.findOrCreate({
      attributes: ["course_id", "description", "score"],
      where: {
        description: value.description,
      },
      defaults: {
        score: value.score,
      },
    });
    if (created) {
      return res.status(201).json({
        message: "Successfully registered course",
        course,
      });
    }
    res.status(409).json({
      error: "Course already exists",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const { error, value } = courseValidation.update(req.body);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const [updatedRowsCount] = await models.Course.update(value, {
      where: { course_id: id },
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({
        error: "Course not found or no changes made",
      });
    }
    res.status(200).json({
      message: "Course updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deleteCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteRowCount = await models.Course.destroy({
      where: {
        course_id: id,
      },
    });
    if (deleteRowCount === 0) {
      return res.status(404).json({
        error: "Course not found or no changes made",
      });
    }
    res.status(200).json({
      message: "Successfully Delete",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllCourse,
  getCourseById,
  updateCourse,
  insertCourse,
  deleteCourse,
};
