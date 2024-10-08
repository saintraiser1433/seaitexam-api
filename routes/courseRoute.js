const { Router } = require("express");
const course = require("../controllers/courseController");
const route = Router();

route.get("/", course.getAllCourse);
route.get("/:id", course.getCourseById);
route.put("/:id", course.updateCourse);
route.post("/", course.insertCourse);
route.delete("/:id", course.deleteCourse);

module.exports = route;
