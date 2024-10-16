const model = require("../db/models");
const { departmentValidation } = require("../util/validation");
const getAllDepartment = async (req, res) => {
  try {
    const result = await model.Department.findAll();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const insertDepartment = async (req, res) => {
  try {
    const { error, value } = departmentValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const [department, created] = await model.Department.findOrCreate({
      where: { department_name: value.department_name },
      defaults: {
        status: value.status,
      },
    });
    if (created) {
      return res.status(201).json({
        message: "Department added successfully",
        data: department,
      });
    }
    res.status(409).json({
      error: "Department already exists",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

const updateDepartment = async (req, res) => {
  const id = req.params.id;
  try {
    const { error, value } = departmentValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const department = await model.Department.findByPk(id);
    if (!department) {
      return res.status(404).json({
        error: "Department not found",
      });
    }

    const [updatedRowsCount] = await model.Department.update(value, {
      where: { department_id: id },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({
        error: "Department not found no changes made",
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

const deleteDepartment = async (req, res) => {
  try {
    const id = req.params.id;
    const isDelete = await model.Department.destroy({
      where: {
        department_id: id,
      },
    });
    if (isDelete === 0) {
      return res.status(404).json({
        error: "Department is not found no deletion has been made",
      });
    }
    return res.status(200).json({
      message: "Department deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllDepartment,
  insertDepartment,
  updateDepartment,
  deleteDepartment,
};
