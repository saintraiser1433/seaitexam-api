const { Router } = require("express");
const {
  getQuestionChoicesByExamId,
  insertQuestionChoices,
  updateQuestionChoices,
  deleteQuestionChoices,
} = require("../controllers/questionController");
const route = Router();

route.get("/:id", getQuestionChoicesByExamId);
route.post("/", insertQuestionChoices);
route.put("/:id", updateQuestionChoices);
route.delete("/:id", deleteQuestionChoices);

module.exports = route;
