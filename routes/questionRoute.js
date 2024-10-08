const { Router } = require("express");
const {
  getAllQuestions,
  getAllQuestionById,
  insertQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");
const route = Router();

route.get("/", getAllQuestions);
route.get("/:id", getAllQuestionById);
route.post("/", insertQuestion);
route.put("/:id", updateQuestion);
route.delete("/:id", deleteQuestion);

module.exports = route;
