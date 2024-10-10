const { Router } = require("express");
const {
  getAllChoices,
  getAllChoicesById,
  insertChoices,
  updateChoice,
  deleteChoice,
  getChoicesByQuestionId,
} = require("../controllers/choiceController");
const route = Router();

route.get("/quest/:id", getChoicesByQuestionId);
route.get("/", getAllChoices);
route.get("/:id", getAllChoicesById);
route.post("/", insertChoices);
route.put("/:id", updateChoice);
route.delete("/:id", deleteChoice);

module.exports = route;
