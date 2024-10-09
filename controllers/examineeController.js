const models = require("../db/models");
const { examineeValidation } = require("../util/validation");
const { hashPassword } = require("../util/hash");
const { Op } = require("sequelize");

const getAllExaminee = async (req, res) => {
  try {
    const result = await models.Examinee.findAll();
    if (result.length === 0) {
      return res.status(404).json({
        message: "No result found",
      });
    }
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getExamineeById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await models.Examinee.findByPk(id);
    if (!result) {
      return res.status(404).json({
        message: "Examinee not found",
      });
    }
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const insertExaminee = async (req, res) => {
  try {
    const { error, value } = examineeValidation.insert(req.body);
    if (error) {
      return res.status(404).json({
        message: error.details[0].message,
      });
    }
    const { first_name, last_name, middle_name, username, password } = value;
    const hash = await hashPassword(password);

    const [examinee, created] = await models.Examinee.findOrCreate({
      where: {
        first_name: first_name,
        last_name: last_name,
        middle_name: middle_name,
      },
      defaults: {
        username,
        password: hash,
      },
    });

    if (created) {
      return res.status(201).json({
        message: "Successfully registered",
        data: examinee,
      });
    }
    res.status(409).json({
      message: "Examinee already exists",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateExaminee = async (req, res) => {
  const id = req.params.id;
  try {
    const { error, value } = examineeValidation.update(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const [updatedRowsCount] = await models.Examinee.update(value, {
      where: { examinee_id: id },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({
        message: "Examinee not found or no changes made",
      });
    }
    return res.status(200).json({
      message: "Examinee updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteExaminee = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteRowCount = await models.Examinee.destroy({
      where: {
        examinee_id: id,
      },
      paranoid: false,
    });
    if (deleteRowCount === 0) {
      return res.status(404).json({
        message: "Examinee not found or no changes made",
      });
    }
    res.status(200).json({
      message: "Successfully Delete",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  insertExaminee,
  getAllExaminee,
  getExamineeById,
  updateExaminee,
  deleteExaminee,
};
