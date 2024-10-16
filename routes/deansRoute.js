const { Router } = require("express");
const {
  getAllDeans,
  insertDeans,
  updateDeans,
  deleteDeans,
} = require("../controllers/deansController");

const {
  getAssignDeansCourse,
  insertAssignDeansCourse,
  deleteAssignDeansCourse,
} = require("../controllers/assignDeanCourseController");

const route = Router();

route.get("/assign/:id", getAssignDeansCourse);
route.post("/assign", insertAssignDeansCourse);
route.delete("/assign/:deansId/:courseId", deleteAssignDeansCourse);
route.get("/", getAllDeans);
route.post("/", insertDeans);
route.put("/:id", updateDeans);
route.delete("/:id", deleteDeans);

module.exports = route;
