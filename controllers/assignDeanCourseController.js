const model = require("../db/models");

const getAssignDeansCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await model.AssignDeansCourse.findAll({
      where: {
        deans_id: id,
      },
      includes: [
        {
          model: model.Course,
          as: "course",
          attributes: ["course_id", "description"],
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

module.exports = {
  getAssignDeansCourse,
};
