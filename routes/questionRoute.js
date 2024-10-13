const { Router } = require("express");
const {
  getAllQuestions,
  getAllQuestionById,
  insertQuestionChoices,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");
const route = Router();

route.get("/", getAllQuestions);
route.get("/:id", getAllQuestionById);
route.post("/", insertQuestionChoices);
route.put("/:id", updateQuestion);
route.delete("/:id", deleteQuestion);

module.exports = route;
