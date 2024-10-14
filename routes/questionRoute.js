const { Router } = require("express");
const {
  getAllQuestions,
  getAllQuestionById,
  insertQuestionChoices,
  updateQuestionChoices,
  deleteQuestion,
} = require("../controllers/questionController");
const route = Router();

route.get("/", getAllQuestions);
route.get("/:id", getAllQuestionById);
route.post("/", insertQuestionChoices);
route.put("/:id", updateQuestionChoices);
route.delete("/:id", deleteQuestion);

module.exports = route;
