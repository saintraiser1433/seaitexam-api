const { Router } = require("express");
const { insertAnswer } = require("../controllers/answerController");
const route = Router();

route.post("/", insertAnswer);

module.exports = route;
