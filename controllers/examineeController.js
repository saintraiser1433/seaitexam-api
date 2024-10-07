const models = require("../db/models");

const { hashPassword } = require("../util/hash");
const getAllExaminee = async (req, res) => {
  try {
    const result = await models.examinee.findAll();
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
    const result = await examinee.findByPk(id, { paranoid: false });
    if (!result) {
      return res.status(404).json({
        message: "No examinee found",
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
  const { first_name, last_name, middle_name, username, password } = req.body;
  try {
    const hash = await hashPassword(password);
    const newExaminee = await examinee.create({
      first_name,
      last_name,
      middle_name,
      username,
      password: hash,
    });
    res.status(201).json({
      message: "Successfully registered",
      data: newExaminee,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateExaminee = async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, middleName } = req.body;
  try {
    const result = await examinee.findByPk(id);
    if (!result) {
      return res.status(404).json({
        message: "Examinee not found",
      });
    }
    (result.firstName = firstName),
      (result.lastName = lastName),
      (result.middleName = middleName);

    await result.save();
    res.status(200).json({
      message: "Successfully Update",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteExaminee = async (req, res) => {
  const id = req.params.id;
  try {
    const delExaminee = await examinee.findByPk(id);
    if (!delExaminee) {
      return res.status(404).json({
        message: "Examinee not found",
      });
    }
    await examinee.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
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
