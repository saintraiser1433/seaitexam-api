const { Router } = require("express");
const {
  getAllExaminee,
  getExamineeById,
  insertExaminee,
  updateExaminee,
  deleteExaminee,
} = require("../controllers/examineeController");
const route = Router();

route.get("/", getAllExaminee);
route.get("/:id", getExamineeById);
route.post("/", insertExaminee);
route.put("/:id", updateExaminee);
route.delete("/:id", deleteExaminee);

module.exports = route;
