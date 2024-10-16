const { Router } = require("express");
const {
  getAllDeans,
  insertDeans,
  updateDeans,
  deleteDeans,
} = require("../controllers/deansController");

const {
  getAssignDeansCourse,
} = require("../controllers/assignDeanCourseController");

const route = Router();

route.get("/assign/:id", getAssignDeansCourse);
route.get("/", getAllDeans);
route.post("/", insertDeans);
route.put("/:id", updateDeans);
route.delete("/:id", deleteDeans);

module.exports = route;
