const model = require("../db/models");
const { deansValidation } = require("../util/validation");
const getAllDeans = async (req, res) => {
  try {
    const result = await model.Deans.findAll({
      include: [
        {
          model: model.Department,
          as: "department",
          attributes: ["department_name"],
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

const insertDeans = async (req, res) => {
  try {
    const { error, value } = deansValidation.insert(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    const [deans, created] = await model.Deans.findOrCreate({
      where: {
        first_name: value.first_name,
        last_name: value.last_name,
        middle_name: value.middle_name,
      },
      defaults: {
        username: value.username,
        password: value.password,
        status: value.status,
        department_id: value.department_id,
      },
    });

    if (created) {
      return res.status(201).json({
        message: "Successfully created",
        deans,
      });
    }
    res.status(409).json({
      error: "Dean already exist",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const updateDeans = async (req, res) => {
  const id = req.params.id;
  try {
    const { error, value } = deansValidation.update(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const [updatedRowsCount] = await model.Deans.update(value, {
      where: { deans_id: id },
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({
        error: "Deans not found no changes made",
      });
    }
    return res.status(200).json({
      message: "Dean updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const deleteDeans = async (req, res) => {
  const id = req.params.id;
  try {
    const isDelete = await model.Deans.destroy({
      where: {
        deans_id: id,
      },
    });
    if (isDelete === 0) {
      return res.status(404).json({
        error: "Dean is not foud no deletion has been made",
      });
    }
    return res.status(200).json({
      message: "Dean deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllDeans,
  insertDeans,
  updateDeans,
  deleteDeans,
};
