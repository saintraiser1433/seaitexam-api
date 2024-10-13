const { Router } = require("express");
const {
  getAllChoices,
  getAllChoicesById,
  insertChoices,
  updateChoice,
  deleteChoice,
  getChoicesByQuestionId,
  getChoicesByExamId,
} = require("../controllers/choiceController");
const route = Router();

route.get("/quest/:questionId", getChoicesByQuestionId);
route.get("/exam/:examId", getChoicesByExamId);
route.get("/", getAllChoices);
route.get("/:choicesId", getAllChoicesById);
route.put("/:choicesId", updateChoice);
route.delete("/:choicesId", deleteChoice);

module.exports = route;
