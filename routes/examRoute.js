const { Router } = require("express");
const {
  getExamAll,
  getExamAllById,
  insertExam,
  updateExam,
  deleteExam,
} = require("../controllers/examController");
const route = Router();

route.get("/", getExamAll);
route.get("/:id", getExamAllById);
route.post("/", insertExam);
route.put("/:id", updateExam);
route.delete("/:id", deleteExam);

module.exports = route;
