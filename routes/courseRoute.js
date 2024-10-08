const { Router } = require("express");
const {
  getAllCourse,
  getCourseById,
  updateCourse,
  insertCourse,
  deleteCourse,
} = require("../controllers/courseController");
const route = Router();

route.get("/", getAllCourse);
route.get("/:id", getCourseById);
route.put("/:id", updateCourse);
route.post("/", insertCourse);
route.delete("/:id", deleteCourse);

module.exports = route;
