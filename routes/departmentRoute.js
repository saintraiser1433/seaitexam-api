const { Router } = require("express");
const {
  getAllDepartment,
  insertDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");
const route = Router();

route.get("/", getAllDepartment);
route.post("/", insertDepartment);
route.put("/:id", updateDepartment);
route.delete("/:id", deleteDepartment);

module.exports = route;
