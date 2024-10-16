const model = require("../db/models");
const { assignDeansCourseValidation } = require("../util/validation");
const getAssignDeansCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await model.AssignDeansCourse.findAll({
      attributes: ["deans_id", "course_id"],
      where: {
        deans_id: id,
      },
      include: [
        {
          model: model.Course,
          as: "course",
          attributes: ["description"],
        },
      ],
    });
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const insertAssignDeansCourse = async (req, res) => {
  try {
    const { error, value } = assignDeansCourseValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    const created = await model.AssignDeansCourse.create({
      deans_id: value.deans_id,
      course_id: value.course_id,
    });
    const assignDeans = await model.AssignDeansCourse.findOne({
      attributes: ["deans_id", "course_id"],
      where: {
        deans_id: value.deans_id,
        course_id: value.course_id,
      },
      include: [
        {
          model: model.Course,
          as: "course",
          attributes: ["description"],
        },
      ],
    });

    if (created) {
      return res.status(201).json({
        message: "Assigned successfully",
        assignDeans,
      });
    }
    return res.status(400).json({
      error: "Course already assigned to this Dean",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const deleteAssignDeansCourse = async (req, res) => {
  try {
    const deansId = req.params.deansId;
    const courseId = req.params.courseId;

    const deletedRows = await model.AssignDeansCourse.destroy({
      where: {
        deans_id: deansId,
        course_id: courseId,
      },
    });

    if (deletedRows > 0) {
      return res.status(200).json({
        message: "Course unassigned successfully",
      });
    }
    return res.status(404).json({
      error: "Course not found for this Dean",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  getAssignDeansCourse,
  insertAssignDeansCourse,
  deleteAssignDeansCourse,
};
